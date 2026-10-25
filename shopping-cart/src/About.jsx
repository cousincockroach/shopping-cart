// About.jsx
import React from 'react';
import { Link } from 'react-router';
import './About.css';

const About = () => {
  return (
    <section className="about-container">
      <div className="about-hero">
        <span className="about-tag">PROJECT OVERVIEW</span>
        <h1 className="about-title">DESIGNED FOR CREATIVE COMMERCE & CODE MASTERY.</h1>
        <p className="about-lead">
          This is a mock website for The Odin Project. It is built as a hands-on exercise in modern front-end architecture, routing, asynchronous API data fetching, and state management using React and pure Vanilla CSS.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>THE ARCHITECTURE</h3>
          <p>
            Constructed entirely from scratch using modular React components and scoped Vanilla CSS stylesheets. No utility frameworks were used, focusing purely on mastering layout systems like Flexbox, Grid, and responsive design.
          </p>
        </div>

        <div className="about-card">
          <h3>DATA & CURRENCY</h3>
          <p>
            Products are dynamically fetched from the FakeStoreAPI, complete with real-time category filtering, search functionality, and live USD-to-ZAR currency conversion tailored for South African users.
          </p>
        </div>

        <div className="about-card">
          <h3>ROUTING & STATE</h3>
          <p>
            Seamless client-side routing is handled via React Router, allowing instant transitions between the cinematic landing hero and the full product catalogue with a fully interactive cart drawer.
          </p>
        </div>
      </div>

      <div className="about-footer-cta">
        <Link to="/shop" className="about-cta-btn">
          EXPLORE CATALOGUE ↗
        </Link>
      </div>
    </section>
  );
};

export default About;