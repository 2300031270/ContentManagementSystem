import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const DisplayPost = () => 
{
  const [posts, setPosts] = useState([]);  // Renamed from products to posts
  const [selectedId, setSelectedId] = useState('');
  const [postDetails, setPostDetails] = useState(null);  // Renamed from productDetails to postDetails
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllPosts();  // Renamed from fetchAllProducts to fetchAllPosts
  }, []);

  const fetchAllPosts = async () => {  // Renamed from fetchAllProducts to fetchAllPosts
    try {
      const response = await axios.get(`${config.url}/post/viewallposts`);  // Updated URL endpoint to reflect "post"
      setPosts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch posts: ' + err.message);  // Updated error message to reflect "post"
    }
  };

  const fetchPostById = async (id) => {  // Renamed from fetchProductById to fetchPostById
    try {
      const response = await axios.post(`${config.url}/post/displaypostbyid?pid=${id}`);  // Updated URL endpoint to reflect "post"
      setPostDetails(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching post: ' + err.message);  // Updated error message to reflect "post"
    }
  };

  const handleSelection = (e) => 
  {
    const id = e.target.value;
    setSelectedId(id);
    if (id) 
    {
      fetchPostById(id);  // Renamed from fetchProductById to fetchPostById
    } 
    else 
    {
      setPostDetails(null);  // Renamed from setProductDetails to setPostDetails
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Display Post Details</h3>  {/* Updated title */}

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="form-group mb-3">
        <label><strong>Select a Post:</strong></label>  {/* Updated label */}
        <select className="form-control" value={selectedId} onChange={handleSelection}>
          <option value="">-- Select Post --</option>  {/* Updated option text */}
          {posts.map(post => (  // Renamed from products to posts
            <option key={post.id} value={post.id}>
              {post.name}  {/* Renamed from product.name to post.name */}
            </option>
          ))}
        </select>
      </div>

      {postDetails && (  // Renamed from productDetails to postDetails
        <div className="card mt-3">
          <img
            src={`${config.url}/post/displaypostimage?id=${postDetails.id}`}  // Updated URL endpoint to reflect "post"
            className="card-img-top"
            alt="Post"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{postDetails.name}</h5>  {/* Renamed from productDetails.name to postDetails.name */}
            <p className="card-text">
              <strong>Category:</strong> {postDetails.category}<br />
              <strong>Description:</strong> {postDetails.description}<br />
              <strong>Cost:</strong> ₹{postDetails.cost}<br />
              <strong>URL:</strong> <a href={postDetails.url} target="_blank" rel="noopener noreferrer">Visit</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPost;
