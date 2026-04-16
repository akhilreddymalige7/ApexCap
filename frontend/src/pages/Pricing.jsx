import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic Alerts",
      price: "₹999",
      period: "/month",
      features: [
        "Daily Market Highlights",
        "2 Swing Trade Ideas/Week",
        "Basic Support",
        "Access to Education Materials"
      ],
      recommended: false
    },
    {
      name: "Pro Trader",
      price: "₹2,499",
      period: "/month",
      features: [
        "Real-Time Intraday Signals",
        "Unlimited Swing/Long-Term Ideas",
        "Position Sizing Calculator",
        "Priority Support",
        "Weekly Market Webinars"
      ],
      recommended: true
    },
    {
      name: "Premium Portfolio",
      price: "₹9,999",
      period: "/year",
      features: [
        "Full Platform Access",
        "1-on-1 Personalized Advisory",
        "Custom Portfolio Rebalancing",
        "Direct Analyst Call Access",
        "All Pro Features Included"
      ],
      recommended: false
    }
  ];

  const handleCheckout = (e) => {
    e.preventDefault();
    alert("Mock Payment Gateway Initiated (Razorpay/Stripe Simulation)");
  }

  return (
    <div className="page-container container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Subscription <span className="gradient-text">Plans</span></h2>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Choose the tier that fits your investment style.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {plans.map((plan, idx) => (
          <div key={idx} className="glass-panel animate-fade-in" style={{ position: 'relative', border: plan.recommended ? '2px solid var(--primary)' : '' }}>
            {plan.recommended && (
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#fff', padding: '4px 16px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                MOST POPULAR
              </div>
            )}
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{plan.name}</h3>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{plan.price}</span>
              <span className="text-muted">{plan.period}</span>
            </div>
            <ul style={{ listStyle: 'none', marginBottom: '32px' }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--text-main)' }}>
                  <Check size={18} color="var(--success)" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={handleCheckout} className={plan.recommended ? "btn btn-primary" : "btn btn-outline"} style={{ width: '100%' }}>
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
