import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const AddArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    story: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/article/addarticle`, article);
      setMessage(response.data);
      setError('');

      // Clear form fields
      setArticle({
        title: '',
        story: '',
      });
    } catch (error) {
      console.log(error.message);
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>
        Add Article
      </h3>
      {message ? (
        <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bolder' }}>
          {message}
        </p>
      ) : (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={article.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Story:</label>
          <textarea
            className="form-control"
            name="story"
            rows="4"
            value={article.story}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Article</button>
      </form>
    </div>
  );
};

export default AddArticle;
