import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const getLinkStyle = (path) => {
    return `flex items-center gap-2 ${location.pathname === path ? 'text-primary' : ''}`;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4" style={{ textDecoration: 'none' }}>
          <h1 className="gradient-text" style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ApexCap
          </h1>
        </Link>
        <div className="nav-links flex items-center" style={{ gap: '28px', fontSize: '0.95rem' }}>
          <Link to="/" className={getLinkStyle('/')}>Home</Link>
          <Link to="/services" className={getLinkStyle('/services')}>Services</Link>
          <Link to="/consultancy" className={getLinkStyle('/consultancy')}>Consultancy</Link>
          <Link to="/education" className={getLinkStyle('/education')}>Education</Link>
          <Link to="/performance" className={getLinkStyle('/performance')}>Performance</Link>
          <Link to="/dashboard" className={getLinkStyle('/dashboard')}>Dashboard</Link>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className={getLinkStyle('/admin')}>Admin</Link>
              )}
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '8px 20px' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary" style={{ padding: '8px 20px' }}>Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
