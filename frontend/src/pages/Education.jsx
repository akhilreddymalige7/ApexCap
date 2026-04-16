import React from 'react';
import { PlayCircle, BookOpen } from 'lucide-react';

const Education = () => {
  return (
    <div className="page-container container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Investor <span className="gradient-text">Education</span></h2>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Learn market fundamentals, technical analysis, and build your confidence.</p>
      </div>

      <h3 style={{ fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <PlayCircle color="var(--primary)" /> Video Tutorials
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        {[
          { title: "Introduction to Candlestick Patterns", time: "15 mins" },
          { title: "Risk Management & Sizing Strategies", time: "22 mins" },
          { title: "How to use Advanced Screeners", time: "18 mins" }
        ].map((vid, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ background: '#111', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PlayCircle size={48} color="var(--muted)" style={{ opacity: 0.5 }} />
            </div>
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{vid.title}</h4>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Duration: {vid.time}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <BookOpen color="var(--success)" /> Quick Guides & Articles
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { title: "What is Support and Resistance?", desc: "Learn how to spot price floors and ceilings to optimize your entries." },
          { title: "Understanding P/E Ratios in 2026", desc: "A beginner's guide to deciphering valuation metrics in fundamental analysis." },
          { title: "Psychology of Trading", desc: "Master your emotions and avoid common pitfalls like over-trading and revenge buying." }
        ].map((art, idx) => (
          <div key={idx} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{art.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{art.desc}</p>
            </div>
            <button className="btn btn-outline" style={{ padding: '8px 16px' }}>Read Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
