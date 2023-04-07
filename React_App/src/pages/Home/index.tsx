import '../../style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from '../../components/PostForm';
import PostItem from '../../components/PostItem';
import { Link } from "react-router-dom";

export type Post = {
  id: number,
  name: string,
  content: string,
  date: string,
  liked: boolean,
};

export type InputValues = {
  id: number | null,
  name: string,
  content: string,
};

const Home: React.FC = () => {
  
  const [posts, setPosts] = useState<Post[]>([
    // {
    //   id: 2,
    //   name: 'Kuya',
    //   content: 'お腹すいたなー',
    //   date: '2023-03-20 11:57',
    //   liked: true,
    // },
    // {
    //   id: 1,
    //   name: 'Kuya',
    //   content: '眠たいなー',
    //   date: '2023-03-15 14:34',
    //   liked: false,
    // },
  ]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')
    .then(res => {
      setPosts(res.data);
    });
  })
  
  
  const [inputValues, setInputValues] = useState<InputValues>({
    id: null,
    name: '',
    content: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/posts/store', {
      user: inputValues.name,
      content: inputValues.content,
    }).then(res => {
      console.log(res);
      setPosts(res.data);
    })
  }

// API不使用時の投稿
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const nextId = posts.length > 0
  //     ? posts[0].id + 1
  //     : 1;
  //   const now = new Date();
  //   const YYYY = now.getFullYear();
  //   const month = now.getMonth()+1;
  //   const MM = month.toString().padStart(2, '0');
  //   const DD = now.getDate();
  //   const hh = now.getHours();
  //   const mm = now.getMinutes().toString().padStart(2, '0');
  //   const postedAt = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm;
  //   setPosts([{
  //     id: nextId,
  //     name: inputValues.name,
  //     content: inputValues.content,
  //     date: postedAt,
  //     liked: false,
  //   }, ...posts]);
  //   setInputValues({
  //     id: null,
  //     name: '',
  //     content: '',
  //   });
  // };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.patch(`http://localhost:8080/api/posts/update/${inputValues.id}`, {
      user: inputValues.name,
      content: inputValues.content,
    }).then(res => {
      const updatePosts = posts.map((post) => {
        if (post.id === res.data.id) {
          post.name = res.data.user;
          post.content = res.data.content;
        }
        return post;
      });
      setPosts(updatePosts);
      setInputValues({
        id: null,
        name: '',
        content: '',
      });
  
    });
  };

  // API不使用時の編集機能
  // const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const updatePosts = posts.map((post) => {
  //     if (post.id === inputValues.id) {
  //       post.name = inputValues.name;
  //       post.content = inputValues.content;
  //     }
  //     return post;
  //   });
  //   setPosts(updatePosts);
  //   setInputValues({
  //     id: null,
  //     name: '',
  //     content: '',
  //   });
  // };

  const handleClickLikeButton = (id: number) => {
    const updatePosts = posts.map((post) => {
      if (post.id === id) {
        post.liked = !post.liked;
      }
      return post;
    });
    setPosts(updatePosts);
  };


  const handleDelete = (id: number) => {
    axios.patch(`http://localhost:8080/api/posts/${id}`)
    .then(res => {
      const updatePosts = posts.filter((post) => {return post.id !== res.data.id});
      setPosts(updatePosts);
    });
  };

// API不使用時のDELETE
//   const handleDelete = (id: number) => {
//     const updatePosts = posts.filter((post) => {return post.id !== id});
//     setPosts(updatePosts);
//   };

  const handleClickEditButton = (post: Post) => {
    setInputValues({
      id: post.id,
      name: post.name,
      content: post.content,
    });
  };

  return (
    <div>
      <PostForm
        handleSubmit={handleSubmit}
        handleEdit={handleEdit}
        handleInputChange={handleInputChange}
        inputValues={inputValues}
      />
      <Link to={'/liked/'}>いいね！一覧</Link>
      <ul className='timeline'>
        {posts.map((post) => {
          return (
            <PostItem
              key={ post.id }
              post={ post }
              handleClickLikeButton={handleClickLikeButton}
              handleClickEditButton={handleClickEditButton}
              handleDelete={handleDelete}
            />
          )
        })}
      </ul>
    </div>
  );
}

export default Home;
