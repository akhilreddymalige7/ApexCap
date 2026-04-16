import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_URL || 'https://apexcap.onrender.com';
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        login(data.user, data.token);
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server');
    }
  };

  return (
    <div className="page-container container flex justify-center items-center" style={{ minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px', textAlign: 'center' }}>Welcome Back</h2>
        
        {error && <div className="text-danger" style={{ marginBottom: '16px', background: 'rgba(255, 71, 87, 0.1)', padding: '12px', borderRadius: '8px' }}>{error}</div>}

        <div style={{ marginBottom: '20px' }}>
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
        </div>
        
        <div style={{ marginBottom: '32px' }}>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
          Sign In
        </button>
        <p className="text-muted" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
