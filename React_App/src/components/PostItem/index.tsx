import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRHeart } from '@fortawesome/free-regular-svg-icons';
import { Post } from '../../pages/Home';


interface Props {
  post: Post,
  handleClickLikeButton: (id: number) => void;
  handleClickEditButton: (post: Post) => void;
  handleDelete: (id: number) => void;
}

const PostItem: React.FC<Props> = ({
  post,
  handleClickLikeButton,
  handleClickEditButton,
  handleDelete,
}) => {
  return (
    <li className='post'>
      <p className='name'>{ post.name }</p>
      <p className='content'>{ post.content }</p>
      <p className='date'>{ post.date }</p>
      <button
        className='like-button'
        onClick={() => handleClickLikeButton(post.id)}
      >
      <FontAwesomeIcon icon={post.liked ? faHeart : faRHeart} style={{color: "#ff66c7",}} />
      </button>
      <button
        className='edit-button'
        onClick={() => handleClickEditButton(post)}
      >
      <FontAwesomeIcon icon={faPen} style={{color: "#e6f064",}} />
      </button>
      <button
        className='delete-button'
        onClick={() => handleDelete(post.id)}
      >
        <FontAwesomeIcon icon={faTrashCan} style={{color: "#37e637",}} />
      </button>
    </li>
  )
}

export default PostItem;

