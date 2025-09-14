import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import TrialForm from './TrialForm';
import ConfirmModal from './ConfirmModal';
import '../styles/components/Dashboard.css';
import '../styles/components/TrialCard.css';

const Dashboard = ({ footerRef }) => {
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTrial, setEditingTrial] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trialToDelete, setTrialToDelete] = useState(null);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      const response = await axios.get('/trials');
      setTrials(response.data);
    } catch (error) {
      setError('Failed to fetch clinical trials');
      console.error('Error fetching trials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrial = async (trialData) => {
    try {
      const response = await axios.post('/trials', trialData);
      setTrials([...trials, response.data]);
      setShowForm(false);
      if (footerRef?.current?.refreshStats) {
        footerRef.current.refreshStats();
      }
    } catch (error) {
      setError('Failed to create clinical trial');
      console.error('Error creating trial:', error);
    }
  };

  const handleUpdateTrial = async (trialData) => {
    try {
      const response = await axios.put(`/trials/${editingTrial._id}`, trialData);
      setTrials(trials.map(trial => 
        trial._id === editingTrial._id ? response.data : trial
      ));
      setEditingTrial(null);
      setShowForm(false);
      if (footerRef?.current?.refreshStats) {
        footerRef.current.refreshStats();
      }
    } catch (error) {
      setError('Failed to update clinical trial');
      console.error('Error updating trial:', error);
    }
  };

  const handleDeleteTrial = async (trialId) => {
    setTrialToDelete(trialId);
    setShowDeleteModal(true);
  };

  const confirmDeleteTrial = async () => {
    try {
      await axios.delete(`/trials/${trialToDelete}`);
      setTrials(trials.filter(trial => trial._id !== trialToDelete));
      setShowDeleteModal(false);
      setTrialToDelete(null);
      if (footerRef?.current?.refreshStats) {
        footerRef.current.refreshStats();
      }
    } catch (error) {
      setError('Failed to delete clinical trial');
      console.error('Error deleting trial:', error);
      setShowDeleteModal(false);
      setTrialToDelete(null);
    }
  };

  const cancelDeleteTrial = () => {
    setShowDeleteModal(false);
    setTrialToDelete(null);
  };

  const handleEdit = (trial) => {
    setEditingTrial(trial);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTrial(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Clinical Trial Management</h1>
        <div className="user-info">
          <span>Welcome, {user?.fullName}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <div className="trials-header">
          <h2>Clinical Trials</h2>
          <button 
            onClick={() => setShowForm(true)} 
            className="btn-primary"
          >
            Add New Trial
          </button>
        </div>

        {showForm && (
          <TrialForm
            trial={editingTrial}
            onSubmit={editingTrial ? handleUpdateTrial : handleCreateTrial}
            onCancel={handleCloseForm}
          />
        )}

        <div className="trials-grid">
          {trials.length === 0 ? (
            <div className="no-trials">
              <p>No clinical trials found. Create your first trial!</p>
            </div>
          ) : (
            trials.map(trial => (
              <div key={trial._id} className="trial-card">
                <div className="trial-header">
                  <h3>{trial.trialName}</h3>
                  <span className={`status ${trial.status.toLowerCase()}`}>
                    {trial.status}
                  </span>
                </div>
                <div className="trial-body">
                  <p><strong>Description:</strong> {trial.description || 'No description'}</p>
                  <p><strong>Start Date:</strong> {formatDate(trial.startDate)}</p>
                  <p><strong>End Date:</strong> {formatDate(trial.endDate)}</p>
                  <p><strong>Created by:</strong> {trial.createdBy?.fullName}</p>
                </div>
                <div className="trial-actions">
                  <button 
                    disabled ={trial.status === 'Completed'}
                    onClick={() => handleEdit(trial)}
                    className="btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTrial(trial._id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDeleteTrial}
        onConfirm={confirmDeleteTrial}
        title="Delete Clinical Trial"
        message="Are you sure you want to delete this clinical trial? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Dashboard;
