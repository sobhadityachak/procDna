import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import '../styles/components/Footer.css';

const Footer = forwardRef((props, ref) => {
  const [stats, setStats] = useState({
    totalTrials: 0,
    plannedTrials: 0,
    ongoingTrials: 0,
    completedTrials: 0,
    recentTrials: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/trials/stats');
      setStats(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch stats');
      console.error('Error fetching stats:', error);
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    refreshStats: fetchStats
  }));

  if (loading) {
    return (
      <footer className="app-footer">
        <div className="footer-content">
          <div className="stats-loading">Loading stats...</div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="app-footer">
        <div className="footer-content">
          <div className="stats-error">Unable to load statistics</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Trial Statistics</h4>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">{stats.totalTrials}</span>
              <span className="stat-label">Total Trials</span>
            </div>
            <div className="stat-item planned">
              <span className="stat-number">{stats.plannedTrials}</span>
              <span className="stat-label">Planned</span>
            </div>
            <div className="stat-item ongoing">
              <span className="stat-number">{stats.ongoingTrials}</span>
              <span className="stat-label">Ongoing</span>
            </div>
            <div className="stat-item completed">
              <span className="stat-number">{stats.completedTrials}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4>Recent Activity</h4>
          <div className="recent-trials">
            {stats.recentTrials.length > 0 ? (
              stats.recentTrials.slice(0, 2).map((trial) => (
                <div key={trial._id} className="recent-trial-item">
                  <span className="trial-name">{trial.trialName}</span>
                  <span className={`trial-status ${trial.status.toLowerCase()}`}>
                    {trial.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-recent-trials">No recent trials</div>
            )}
          </div>
        </div>

        <div className="footer-section">
          <h4>Clinical Trial Management</h4>
          <p className="footer-description">
            Manage your pharmaceutical clinical trials efficiently and effectively.
          </p>
          <div className="footer-meta">
            © 2025 ProcDNA Clinical Trials
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;