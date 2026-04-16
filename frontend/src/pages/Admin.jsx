import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const API = import.meta.env.VITE_API_URL || 'https://apexcap.onrender.com';
        const response = await fetch(`${API}/api/auth/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.filter(u => u.role !== 'admin')); // Don't show admin portfolios
        }
      } catch (err) {
        console.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="page-container container">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Admin Dashboard</h2>
      <p className="text-muted" style={{ marginBottom: '40px' }}>Overview of all registered users and their portfolios.</p>

      {loading ? <p>Loading users...</p> : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {users.map(u => (
            <div key={u._id} className="glass-panel">
              <h3 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px', marginBottom: '16px' }}>{u.name} ({u.email})</h3>
              
              {u.portfolio && u.portfolio.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Quantity</th>
                      <th>Average Price (₹)</th>
                      <th>Total Value (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {u.portfolio.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 'bold' }}>{item.symbol}</td>
                        <td>{item.quantity}</td>
                        <td>{item.avgPrice}</td>
                        <td style={{ color: 'var(--success)' }}>{(item.quantity * item.avgPrice).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">No portfolio items added yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
