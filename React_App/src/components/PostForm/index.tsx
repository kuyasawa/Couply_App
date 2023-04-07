import React from "react";
import { InputValues } from '../../pages/Home';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEdit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => void
  inputValues: InputValues,
}

const PostForm: React.FC<Props> = ({
  handleSubmit,
  handleEdit,
  handleInputChange,
  inputValues,
}) => {

  return (
    <form className='new-post' onSubmit={inputValues.id ? handleEdit : handleSubmit}>
      <input
        className='form-item'
        type='text'
        name='name'
        placeholder='名前'
        value={inputValues.name}
        onChange={handleInputChange}
      />
      <textarea
        className='form-item'
        name='content'
        placeholder='どんな気分？'
        value={inputValues.content}
        onChange={handleInputChange}
      />
      <input type='submit' value={inputValues.id ? '保存' : '投稿'} className='form-item post_button'/>
    </form>
  );
}

export default PostForm;
