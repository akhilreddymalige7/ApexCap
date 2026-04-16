import React, { useState, useContext, useEffect } from 'react';
import { Send, CheckCircle, Plus, Calculator, AlertTriangle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'https://apexcap.onrender.com';

const Consultancy = () => {
  const { user, login } = useContext(AuthContext);
  
  // Admin & Data state
  const [adminForm, setAdminForm] = useState({ symbol: '', name: '', category: 'Swing', action: 'BUY', targetPrice: '', stopLoss: '', rationale: '' });
  const [availableStocks, setAvailableStocks] = useState([]);
  
  // User state
  const [userForm, setUserForm] = useState({ symbol: '', quantity: 1, avgPrice: 0 });
  const [riskData, setRiskData] = useState({ capital: 100000, riskPerTrade: 2, entry: 0, stopLoss: 0 });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`${API}/api/suggestions`)
      .then(res => res.json())
      .then(data => setAvailableStocks(data))
      .catch(console.error);
  }, []);

  if (!user) return <Navigate to="/login" />;

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API}/api/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminForm)
      });
      if (res.ok) {
        setStatus('admin_success');
        setAdminForm({ symbol: '', name: '', category: 'Swing', action: 'BUY', targetPrice: '', stopLoss: '', rationale: '' });
        const fresh = await fetch(`${API}/api/suggestions`).then(r => r.json());
        setAvailableStocks(fresh);
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) { setStatus('error'); }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/api/auth/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(userForm)
      });
      if (res.ok) {
        const newPortfolio = await res.json();
        login({ ...user, portfolio: newPortfolio }, token);
        setStatus('user_success');
        setUserForm({ symbol: '', quantity: 1, avgPrice: 0 });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) { setStatus('error'); }
  };

  const handleSymbolChange = (e) => {
    const sym = e.target.value;
    const matched = availableStocks.find(s => s.symbol === sym);
    // Setting avg price to either matched target price or 0 if not found
    const price = matched ? matched.targetPrice : 0;
    setUserForm({ ...userForm, symbol: sym, avgPrice: price });
  };

  // Calculate Risk Sizing
  const potentialLossPerShare = riskData.entry - riskData.stopLoss;
  const totalRiskAmount = (riskData.capital * riskData.riskPerTrade) / 100;
  const recommendedQuantity = potentialLossPerShare > 0 ? Math.floor(totalRiskAmount / potentialLossPerShare) : 0;

  return (
    <div className="page-container container">
      {user.role === 'admin' ? (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', textAlign: 'center' }}>Submit Analysis (Admin)</h2>
          <p className="text-muted" style={{ textAlign: 'center', marginBottom: '32px' }}>Publish a new actionable recommendation to our clients.</p>
          <form onSubmit={handleAdminSubmit} className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
            {status === 'admin_success' && <div className="text-success" style={{ marginBottom: '20px' }}><CheckCircle size={20} /> published successfully!</div>}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div><label>Stock Symbol</label><input type="text" value={adminForm.symbol} onChange={(e)=>setAdminForm({...adminForm, symbol: e.target.value})} required /></div>
              <div><label>Company Name</label><input type="text" value={adminForm.name} onChange={(e)=>setAdminForm({...adminForm, name: e.target.value})} required /></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label>Category</label>
                <select value={adminForm.category} onChange={(e)=>setAdminForm({...adminForm, category: e.target.value})}>
                  <option>Intraday</option><option>Swing</option><option>Long-term</option>
                </select>
              </div>
              <div>
                <label>Action</label>
                <select value={adminForm.action} onChange={(e)=>setAdminForm({...adminForm, action: e.target.value})}>
                  <option>BUY</option><option>SELL</option><option>HOLD</option>
                </select>
              </div>
              <div><label>Target (₹)</label><input type="number" value={adminForm.targetPrice} onChange={(e)=>setAdminForm({...adminForm, targetPrice: e.target.value})} required /></div>
              <div><label>Stop Loss (₹)</label><input type="number" value={adminForm.stopLoss} onChange={(e)=>setAdminForm({...adminForm, stopLoss: e.target.value})} required /></div>
            </div>
            
            <div style={{ marginBottom: '32px' }}><label>Rationale</label><textarea required rows="4" value={adminForm.rationale} onChange={(e)=>setAdminForm({...adminForm, rationale: e.target.value})} /></div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Publish <Send size={18} /></button>
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Personal Portfolio Manager</h2>
            <p className="text-muted">Buy stocks, track your assets, and receive personalized risk strategies.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '32px' }}>
            {/* Buy / Portfolio Box */}
            <div>
              <form onSubmit={handleUserSubmit} className="glass-panel animate-fade-in" style={{ padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Execute Virtual Trade</h3>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label>Select Stock</label>
                    <select required value={userForm.symbol} onChange={handleSymbolChange}>
                      <option value="">-- Choose --</option>
                      {availableStocks.map((s, i) => (
                        <option key={i} value={s.symbol}>{s.symbol} - {s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: '0.5' }}>
                    <label>Quantity</label>
                    <input type="number" min="1" required value={userForm.quantity} onChange={(e)=>setUserForm({...userForm, quantity: Number(e.target.value)})} />
                  </div>
                  <div style={{ flex: '0.5' }}>
                    <label>Current Price (₹)</label>
                    <input type="number" disabled value={userForm.avgPrice} />
                  </div>
                </div>
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="text-muted">Total Capital Required: </span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>₹{(userForm.quantity * userForm.avgPrice).toLocaleString('en-IN')}</strong>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }} disabled={!userForm.symbol || userForm.avgPrice === 0}>
                    Execute Buy <Plus size={18} />
                  </button>
                </div>
                {status === 'user_success' && <div className="text-success" style={{ marginTop: '16px' }}>Trade executed! Added to your holdings.</div>}
              </form>

              <div className="glass-panel">
                <h3 style={{ marginBottom: '20px' }}>Your Holdings</h3>
                {user.portfolio && user.portfolio.length > 0 ? (
                  <table>
                    <thead><tr><th>Symbol</th><th>Quantity</th><th>Avg Price</th><th>Investment</th></tr></thead>
                    <tbody>
                      {user.portfolio.map((item, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 'bold' }}>{item.symbol}</td><td>{item.quantity}</td><td>₹{item.avgPrice}</td>
                          <td style={{ color: 'var(--success)' }}>₹{(item.quantity * item.avgPrice).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : <p className="text-muted">You haven't executed any trades yet.</p>}
              </div>
            </div>

            {/* Risk Management / Position Sizing Calculator */}
            <div className="glass-panel" style={{ height: 'fit-content' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Calculator size={24} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem' }}>Risk Management Toolkit</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '20px' }}>Position Sizing Calculator: Determine how many shares to buy to protect your capital.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label>Total Account Capital (₹)</label>
                  <input type="number" value={riskData.capital} onChange={(e) => setRiskData({...riskData, capital: Number(e.target.value)})} />
                </div>
                <div>
                  <label>Risk Per Trade (%)</label>
                  <input type="number" step="0.1" value={riskData.riskPerTrade} onChange={(e) => setRiskData({...riskData, riskPerTrade: Number(e.target.value)})} />
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label>Entry Price (₹)</label>
                    <input type="number" value={riskData.entry} onChange={(e) => setRiskData({...riskData, entry: Number(e.target.value)})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Stop Loss (₹)</label>
                    <input type="number" value={riskData.stopLoss} onChange={(e) => setRiskData({...riskData, stopLoss: Number(e.target.value)})} />
                  </div>
                </div>

                <div style={{ marginTop: '16px', background: 'rgba(255, 165, 2, 0.1)', border: '1px solid var(--warning)', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--warning)' }}>
                    <AlertTriangle size={18} />
                    <strong>Recommended Strategy</strong>
                  </div>
                  <ul style={{ paddingLeft: '24px', color: '#fff', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li>Max Risk Amount: <strong style={{ color: 'var(--danger)' }}>₹{totalRiskAmount.toLocaleString()}</strong></li>
                    <li>Safe Quantity to Buy: <strong style={{ color: 'var(--success)' }}>{recommendedQuantity > 0 ? recommendedQuantity : 0} Shares</strong></li>
                    <li>Total Trade Size: <strong>₹{(recommendedQuantity * riskData.entry).toLocaleString()}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Consultancy;
