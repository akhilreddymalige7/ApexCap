import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Dashboard = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketRes, suggestionsRes] = await Promise.all([
          fetch('http://localhost:5000/api/market'),
          fetch('http://localhost:5000/api/suggestions')
        ]);
        
        if (marketRes.ok) setMarketData(await marketRes.json());
        if (suggestionsRes.ok) setSuggestions(await suggestionsRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getActionBadge = (action) => {
    switch (action) {
      case 'BUY':
        return <span style={{ background: 'rgba(13, 240, 127, 0.15)', color: 'var(--success)', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>BUY</span>;
      case 'SELL':
        return <span style={{ background: 'rgba(255, 71, 87, 0.15)', color: 'var(--danger)', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>SELL</span>;
      default:
        return <span style={{ background: 'rgba(255, 165, 2, 0.15)', color: 'var(--warning)', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>HOLD</span>;
    }
  };

  const getActionIcon = (action) => {
    if (action === 'BUY') return <TrendingUp size={20} color="var(--success)" />;
    if (action === 'SELL') return <TrendingDown size={20} color="var(--danger)" />;
    return <Minus size={20} color="var(--warning)" />;
  };

  return (
    <div className="page-container container">
      <div className="flex justify-between items-center mb-8" style={{ marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Market Dashboard</h2>
          <p className="text-muted">Live insights, news & recommendations.</p>
        </div>
      </div>

      {marketData && (
        <div className="grid-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {Object.entries(marketData).map(([key, data]) => (
            <div key={key} className="glass-panel" style={{ padding: '20px' }}>
              <p className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{key}</p>
              <h3 style={{ fontSize: '1.8rem', margin: '8px 0' }}>{data.value}</h3>
              <p className="text-success" style={{ fontWeight: '600' }}>{data.change}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(0, 1fr)', gap: '32px' }}>
        
        {/* Left section: Recommendations */}
        <div className="glass-panel animate-fade-in delay-200">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Latest Consultations</h3>
          
          {loading ? (
            <p>Loading market data...</p>
          ) : (
            <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
              <table style={{ width: '100%' }}>
                <thead style={{ position: 'sticky', top: 0, background: 'var(--panel-bg)', backdropFilter: 'blur(10px)' }}>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Category</th>
                  <th>Action</th>
                  <th>Target (₹)</th>
                  <th>Stop Loss (₹)</th>
                  <th>Analysis</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((item) => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: 'bold', color: '#fff' }}>
                      <div className="flex items-center gap-2">
                        {getActionIcon(item.action)}
                        {item.symbol}
                      </div>
                    </td>
                    <td className="text-muted">{item.name}</td>
                    <td style={{ fontSize: '0.85rem' }}><span style={{ border: '1px solid var(--panel-border)', padding: '2px 8px', borderRadius: '12px', color: 'var(--text-main)' }}>{item.category || 'Swing'}</span></td>
                    <td>{getActionBadge(item.action)}</td>
                    <td style={{ color: 'var(--success)' }}>{item.targetPrice}</td>
                    <td style={{ color: 'var(--danger)' }}>{item.stopLoss}</td>
                    <td className="text-muted" style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.rationale}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
              {suggestions.length === 0 && (
                <p className="text-muted" style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0' }}>No recommendations found. Try submitting one via Consultancy.</p>
              )}
            </div>
          )}
        </div>

        {/* Right section: Market News */}
        <div className="glass-panel animate-fade-in delay-300">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Market News</h3>
          <div className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>MARKET UPDATE</p>
              <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>FIIs turn net buyers after 5 days</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Foreign institutional investors bought ₹2,400cr in equities yesterday, driving NIFTY higher.</p>
            </div>

            <div style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 'bold' }}>TECH SECTOR</p>
              <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>IT Stocks rally mixed sentiment</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Major IT companies report cautious Q1 guidance due to macroeconomic pressures in the US.</p>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 'bold' }}>IPO ALERT</p>
              <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>Apex Energy set to launch IPO</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Market buzzing as new green tech firm aims for a ₹5,000 crore listing next month.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
