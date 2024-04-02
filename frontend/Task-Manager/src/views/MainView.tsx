import React from 'react';
import { Link } from 'react-router-dom';
import './MainView.css'; 

const MainView: React.FC = () => {
  return (
    <div className="main-view">
      <header className="main-header">
        <h1 className="main-title">Task Tracker Pro</h1>
        <p className="main-tagline">Organize your life, enhance your productivity</p>
      </header>
      <nav className="main-nav">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
        <Link to="/activities" className="nav-link">Activities</Link>
        <Link to="/statistics" className="nav-link">Statistics</Link>
      </nav>
      <section className="main-content">
        <div className="feature-card">
          <Link to="/dashboard" className="feature-link">
            <h2 className="feature-title">Dashboard</h2>
            <p className="feature-description">
              Get a personalized overview of your tasks and achievements.
            </p>
          </Link>
        </div>
        <div className="feature-card">
          <Link to="/tasks" className="feature-link">
            <h2 className="feature-title">Tasks</h2>
            <p className="feature-description">
              Manage your to-dos with our intuitive task manager.
            </p>
          </Link>
        </div>
        <div className="feature-card">
          <Link to="/activities" className="feature-link">
            <h2 className="feature-title">Activities</h2>
            <p className="feature-description">
              Track your activities and discover productivity patterns.
            </p>
          </Link>
        </div>
        <div className="feature-card">
          <Link to="/statistics" className="feature-link">
            <h2 className="feature-title">Statistics</h2>
            <p className="feature-description">
              Visualize your progress with dynamic charts and graphs.
            </p>
          </Link>
        </div>
      </section>
      <footer className="main-footer">
        <p>© 2024 Task Tracker Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainView;
