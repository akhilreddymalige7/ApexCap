import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="page-container container">
      <div className="flex flex-col items-center justify-center animate-fade-in" style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '4rem', lineHeight: '1.2', marginBottom: '24px' }}>
          Smart Investing <br/>
          <span className="gradient-text">Starts Here</span>
        </h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }}>
          Discover high-probability stock recommendations, elite portfolio management, and comprehensive investor education tools all in one seamless platform.
        </p>
        
        <div className="flex items-center gap-4">
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Explore Dashboard
              <ArrowRight size={20} />
            </button>
          </Link>
          <Link to="/consultancy" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Get Consultancy
            </button>
          </Link>
        </div>
      </div>

      <div className="grid-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '60px' }}>
        <div className="glass-panel animate-fade-in delay-100">
          <Activity size={36} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Real-time Analytics</h3>
          <p className="text-muted">Stay ahead with lightning-fast market insights and intelligent tracking algorithms based on AWT principles.</p>
        </div>
        
        <div className="glass-panel animate-fade-in delay-200">
          <ShieldCheck size={36} color="var(--success)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Expert Strategies</h3>
          <p className="text-muted">Receive tailored buy/sell/hold recommendations from our seasoned market analysts backed by robust data.</p>
        </div>
        
        <div className="glass-panel animate-fade-in delay-300">
          <Zap size={36} color="var(--warning)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Execution Edge</h3>
          <p className="text-muted">Capitalize on market opportunities with actionable rationale, precise stop-loss limits and targets.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
