// Body.jsx
import React from 'react';
import { Link } from 'react-router'; // 👈 Import Link
import './Body.css';

const Body = () => {
  return (
    <main className="landing-viewport">
      <div className="hero-bg-layer">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600" 
          alt="Streetwear Inspiration" 
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <span className="crosshair crosshair-top-left">+</span>
      <span className="crosshair crosshair-top-right">+</span>
      <span className="crosshair crosshair-mid-right">+</span>
      <span className="crosshair crosshair-bottom-left">+</span>

      <div className="hero-description">
        <p>
          FIND THE LATEST FITS, EXCLUSIVE RELEASES, AND INFLUENCER-CURATED OUTFITS ALL IN ONE SPOT
        </p>
      </div>

      <div className="hero-content">
        <h1 className="hero-headline">
          UPGRADE<br />
          YOUR STYLE<br />
          WITH EASE
        </h1>

        <Link to="/shop" className="pill-cta-btn">
          <span>Shop now</span>
          <span className="arrow">↗</span>
        </Link>
      </div>
    </main>
  );
};

export default Body;