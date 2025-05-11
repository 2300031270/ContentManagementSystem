import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './customer.css';

const ViewAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${config.url}/post/viewallposts`);
      setPosts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch posts. ' + err.message);
    }
  };

  return (
    <div className="post-table-container">
      <h3 className="post-heading"></h3>

      {error && (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>
          {error}
        </p>
      )}

      <div className="table-responsive">
        <table className="post-table" style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>URL</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  {post.url && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      Visit
                    </a>
                  )}
                  {!post.url && <span style={{ color: 'grey' }}>No URL</span>}
                </td>
                <td>
                  {post.id && (
                    <img
                      src={`${config.url}/post/displaypostimage?id=${post.id}`}
                      alt={post.title}
                      className="table-image"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  )}
                  {!post.id && <span style={{ color: 'grey' }}>No Image</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllPosts;