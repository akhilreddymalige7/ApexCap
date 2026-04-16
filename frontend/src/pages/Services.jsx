import React from 'react';
import { Shield, BookOpen, Clock, Activity, Briefcase, Book, TrendingUp, PieChart, Info, CreditCard } from 'lucide-react';

const Services = () => {
  const features = [
    {
      icon: <Briefcase size={32} color="var(--primary)" />,
      title: "1. Investment Advice & Recommendations",
      desc: "Provide actionable buy/sell/hold calls. We specialize in segments like intraday, swing trading, and long-term portfolio investing."
    },
    {
      icon: <Activity size={32} color="var(--success)" />,
      title: "2. Research & Analysis",
      desc: "Robust fundamental analysis covering financials, and technical charts utilizing indicators like RSI and MACD for confident trading."
    },
    {
      icon: <PieChart size={32} color="var(--warning)" />,
      title: "3. Portfolio Management Guidance",
      desc: "Build and diversify an unshakeable portfolio with dynamic asset allocation across equities, gold, and MFs with regular rebalancing."
    },
    {
      icon: <Shield size={32} color="var(--danger)" />,
      title: "4. Risk Management",
      desc: "Strict capital protection! Get precise stop-loss recommendations and position sizing (available in your personalized dashboard toolkit)."
    },
    {
      icon: <Clock size={32} color="var(--primary)" />,
      title: "5. Real-Time Alerts & Updates",
      desc: "Never miss an entry. Get instant SMS/Telegram alerts and live market news right inside your dashboard."
    },
    {
      icon: <BookOpen size={32} color="var(--secondary)" />,
      title: "6. Education & Training",
      desc: "Curated learning paths. Access our exclusive webinars, trading strategy tutorials, and mentorship for beginners."
    },
    {
      icon: <Info size={32} color="var(--success)" />,
      title: "7. Personalized Advisory",
      desc: "Advice tailored to your unique capital constraints, specific risk tolerance, and shifting financial goals."
    },
    {
      icon: <TrendingUp size={32} color="var(--primary)" />,
      title: "8. Performance Tracking",
      desc: "Total transparency. Track the success rate and historical returns of our advised trades directly inside the Admin portal."
    },
    {
      icon: <Book size={32} color="var(--warning)" />,
      title: "9. Compliance & Registration",
      desc: "We adhere strictly to legal guidelines and ethical practices (SEBI registered standards)."
    },
    {
      icon: <CreditCard size={32} color="var(--danger)" />,
      title: "10. Subscription-Based Services",
      desc: "Flexible pricing. Choose from Basic alerts to Premium active portfolio management plans available monthly or yearly."
    }
  ];

  return (
    <div className="page-container container">
      <div style={{ textAlign: 'center', marginBottom: '60px', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Comprehensive <span className="gradient-text">Consultancy Features</span></h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Explore our suite of end-to-end stock market consultancy tools designed to protect and compound your wealth.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {features.map((f, i) => (
          <div key={i} className="glass-panel animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.05)', display: 'inline-block', padding: '12px', borderRadius: '12px' }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', lineHeight: '1.4' }}>{f.title}</h3>
            <p className="text-muted" style={{ lineHeight: '1.6' }}>{f.desc}</p>
          </div>
        ))}
      </div>
      
      {/* SEBI Compliance Footer Module */}
      <div className="glass-panel" style={{ marginTop: '60px', padding: '32px', textAlign: 'center', background: 'rgba(13, 240, 127, 0.05)', border: '1px solid var(--success)' }}>
        <Shield size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ marginBottom: '12px' }}>SEBI Registered & Compliant</h3>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>All advisory and portfolio management services adhere to standard regulatory and ethical practices. Registration number: INA00000XXXX.</p>
      </div>
    </div>
  );
};

export default Services;
