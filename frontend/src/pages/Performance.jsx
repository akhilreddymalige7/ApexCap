import React from 'react';
import { Target, TrendingUp, ShieldCheck } from 'lucide-react';

const Performance = () => {
  return (
    <div className="page-container container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Performance <span className="gradient-text">Transparency</span></h2>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>We believe in showing the math. Historical accuracy and returns of our calls.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <Target size={40} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '2.5rem', margin: '0' }}>82%</h3>
          <p className="text-muted">Target Hit Accuracy</p>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <TrendingUp size={40} color="var(--success)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '2.5rem', margin: '0' }}>+34.5%</h3>
          <p className="text-muted">Average Annual Return</p>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <ShieldCheck size={40} color="var(--warning)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '2.5rem', margin: '0' }}>1.8</h3>
          <p className="text-muted">Avg Risk/Reward Ratio</p>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: '60px' }}>
        <h3 style={{ marginBottom: '24px' }}>Simulated Equity Curve (Mock)</h3>
        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', height: '300px', display: 'flex', alignItems: 'flex-end', gap: '4px', overflow: 'hidden' }}>
          {Array.from({length: 40}).map((_, i) => (
            <div key={i} style={{ flex: 1, background: `linear-gradient(to top, var(--secondary), var(--primary))`, height: `${(Math.sin(i / 3) * 30 + 50) + (i * 1.2)}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
          ))}
        </div>
        <p className="text-muted" style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.9rem' }}>Illustrative growth of a ₹1,00,000 portfolio over 36 months.</p>
      </div>
    </div>
  );
};

export default Performance;
