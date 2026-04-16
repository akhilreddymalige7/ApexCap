import React from 'react';

const Research = () => {
  return (
    <div className="page-container container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Research & <span className="gradient-text">Analysis</span></h2>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Technical charts and fundamental overviews.</p>
      </div>

      <div className="glass-panel" style={{ height: '600px', padding: '0', overflow: 'hidden' }}>
        <iframe 
          title="TradingView Chart"
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=BSE%3AINFY&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FKolkata&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en`}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allowFullScreen>
        </iframe>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '40px' }}>
        <div className="glass-panel">
          <h3 style={{ marginBottom: '16px' }}>Fundamental Scans</h3>
          <p className="text-muted" style={{ marginBottom: '16px' }}>Our algorithmic screeners have identified undervaluation signals across the auto sector this week based on historically low P/E spreads.</p>
          <ul style={{ listStyle: 'none', color: 'var(--success)', lineHeight: '2' }}>
            <li>↬ TATAMOTORS P/E drop below 15x</li>
            <li>↬ MARUTI Earnings yield &gt; 6%</li>
          </ul>
        </div>
        <div className="glass-panel">
          <h3 style={{ marginBottom: '16px' }}>Technical Scans</h3>
          <p className="text-muted" style={{ marginBottom: '16px' }}>NIFTY 50 is forming an ascending triangle pattern on the daily timeframe, a breakout above 22,600 confirms a long-term bullish continuation.</p>
          <ul style={{ listStyle: 'none', color: 'var(--primary)', lineHeight: '2' }}>
            <li>↬ RSI at 58 (Neutral/Bullish)</li>
            <li>↬ MACD crossing signal line on Weekly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Research;
