import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      const response = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'user' }) // force user role
      });
      const data = await response.json();
      
      if (response.ok) {
        login(data.user, data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Cannot connect to server');
    }
  };

  return (
    <div className="page-container container flex justify-center items-center" style={{ minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>Create Account</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '24px' }}>Join ApexCap to build your portfolio.</p>
        
        {error && <div className="text-danger" style={{ marginBottom: '16px', background: 'rgba(255, 71, 87, 0.1)', padding: '12px', borderRadius: '8px' }}>{error}</div>}

        <div style={{ marginBottom: '20px' }}>
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
        </div>
        
        <div style={{ marginBottom: '32px' }}>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a strong password" />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
          Sign Up
        </button>
        
        <p className="text-muted" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Log in here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
