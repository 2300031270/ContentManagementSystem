import { Routes, Route, Link } from 'react-router-dom';
import './customer.css';
import CustomerHome from './CustomerHome';
import CustomerLogin from './CustomerLogin';
import { useAuth } from '../contextapi/AuthContext';
import UpdateProfile from './UpdateProfile';
import AddPost from '../customer/AddPost';
import AddArticle from '../customer/AddArticle';
import ViewPost from '../customer/ViewPost';
import ViewArticle from '../customer/ViewArticle';


export default function CustomerNavBar() 
{
  const { setIsCustomerLoggedIn } = useAuth(); 

  const handleLogout = () => 
 {
    setIsCustomerLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Customer</div>
        <ul className="nav-links">
          <li><Link to="/customerhome">Home</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/addpost">Add Post</Link></li>
          <li><Link to="/addarticle">Add Article</Link></li>
          <li><Link to="/viewpost">ViewPost</Link></li>
          <li><Link to="/viewarticle">ViewArticle</Link></li>
          <li><Link to="/customerlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/addpost" element={<AddPost />} exact />
        <Route path="/addarticle" element={<AddArticle />} exact />
        <Route path="/customerhome" element={<CustomerHome />} exact />
        <Route path="/viewpost" element={<ViewPost />} exact />
        <Route path="/viewarticle" element={<ViewArticle />} exact />
        <Route path="/updateprofile" element={<UpdateProfile/>} exact />
        <Route path="/customerlogin" element={<CustomerLogin />} exact />
      </Routes>
    </div>
  );
}