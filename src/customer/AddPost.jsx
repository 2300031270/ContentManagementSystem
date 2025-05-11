import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const AddPost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    url: ''
  });
  const [postImage, setPostImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('postimage', postImage);
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('url', post.url);

    try {
      const response = await axios.post(`${config.url}/post/addpost`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data);
      setError('');

      // Clear form fields
      setPost({
        title: '',
        content: '',
        url: ''
      });
      setPostImage(null);
    } catch (error) {
      console.log(error.message);
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add Blog</h3>
      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      }
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Title:</label>
          <input type="text" className="form-control" name="title" value={post.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Content:</label>
          <textarea className="form-control" name="content" rows="4" value={post.content} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>URL (optional):</label>
          <input type="text" className="form-control" name="url" value={post.url} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Post Image:</label>
          <input type="file" className="form-control" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Blog</button>
      </form>
    </div>
  );
};

export default AddPost;
