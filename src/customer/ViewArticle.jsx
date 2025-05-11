import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './customer.css';

const ViewArticle = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${config.url}/post/articles`);
        setArticles(response.data);
        setError('');
      } catch (error) {
        console.log(error.message);
        
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>View Articles</h3>
      {error && (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bolder' }}>{error}</p>
      )}
      <div className="row">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div className="col-md-4 mb-3" key={article.id}>
              <div className="card p-3 shadow-sm">
                <h5>{article.title}</h5>
                <p>{article.story}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>The expression “just have faith, it will work out” is used by people to encourage and comfort someone facing serious problems or stressful situations. But just what is faith as described in the Bible, and does it really work?

 In the New Testament the English word faith is used to translate the Greek word pistis. The New Strong’s Expanded Dictionary of Bible Words says, “Pistis is used of belief with the predominate idea of trust (or confidence) whether in God or in Christ, springing from faith in the same. ‘Faith’ means trust, confidence, assurance, and belief” (p. 1315).

The Bible also defines pistis in Hebrews 11:1, “Now faith is the substance of things hoped for, the evidence of things not seen.”

Faith is the substance or assurance of things we hope for, but have not yet received. Faith (confidence, belief, trust) is also our evidence of that which is not seen—the invisible spiritual things. Faith comes before a prayer is answered or before an individual has received what he or she has requested from God. If we have received what we asked for, then faith is not needed.</p>
        )}
      </div>
    </div>
  );
};

export default ViewArticle;
