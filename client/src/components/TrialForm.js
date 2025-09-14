import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import '../styles/components/TrialForm.css';

const TrialForm = ({ trial, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    trialName: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Planned'
  });
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (trial) {
      setFormData({
        trialName: trial.trialName || '',
        description: trial.description || '',
        startDate: trial.startDate ? trial.startDate.split('T')[0] : '',
        endDate: trial.endDate ? trial.endDate.split('T')[0] : '',
        status: trial.status || 'Planned'
      });
      setHasChanges(false);
    }
  }, [trial]);

  const checkForChanges = (newFormData) => {
    if (!trial) {
      const hasAnyData = 
        (newFormData.trialName && newFormData.trialName.trim() !== '') ||
        (newFormData.description && newFormData.description.trim() !== '') ||
        (newFormData.startDate && newFormData.startDate !== '') ||
        (newFormData.endDate && newFormData.endDate !== '') ||
        (newFormData.status !== 'Planned');
      
      setHasChanges(hasAnyData);
    } else {
      const originalData = {
        trialName: trial.trialName || '',
        description: trial.description || '',
        startDate: trial.startDate ? trial.startDate.split('T')[0] : '',
        endDate: trial.endDate ? trial.endDate.split('T')[0] : '',
        status: trial.status || 'Planned'
      };
      
      const hasChanges = Object.keys(originalData).some(key => 
        originalData[key] !== newFormData[key]
      );
      setHasChanges(hasChanges);
    }
  };

  const validateDates = (startDate, endDate) => {
    if (!startDate) {
      setDateError('Start date is required');
      return false;
    }
    
    if (!endDate) {
      setDateError('End date is required');
      return false;
    }
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end < start) {
        setDateError('End date cannot be before start date');
        return false;
      }
    }
    
    setDateError('');
    return true;
  };

  const getStartDateClass = () => {
    if (!dateError) return '';
    if (!formData.startDate || 
        (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate))) {
      return 'error';
    }
    return '';
  };

  const getEndDateClass = () => {
    if (!dateError) return '';
    if (!formData.endDate || 
        (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate))) {
      return 'error';
    }
    return '';
  };

  const isFormValid = () => {
    return formData.trialName.trim() !== '' && 
           formData.startDate !== '' && 
           formData.endDate !== '' && 
           formData.status !== '' && 
           !dateError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);
    
    checkForChanges(newFormData);
    
    if (name === 'startDate' || name === 'endDate') {
      validateDates(
        name === 'startDate' ? value : newFormData.startDate,
        name === 'endDate' ? value : newFormData.endDate
      );
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      setShowCancelModal(true);
    } else {
      onCancel();
    }
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    onCancel();
  };

  const cancelModalClose = () => {
    setShowCancelModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateDates(formData.startDate, formData.endDate)) {
      return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit(formData);
      if (!trial) {
        setFormData({
          trialName: '',
          description: '',
          startDate: '',
          endDate: '',
          status: 'Planned'
        });
        setDateError('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{trial ? 'Edit Clinical Trial' : 'Create New Clinical Trial'}</h3>
          <button onClick={handleCancel} className="close-btn">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="trial-form">
          <div className="form-group">
            <label htmlFor="trialName">Trial Name *</label>
            <input
              type="text"
              id="trialName"
              name="trialName"
              value={formData.trialName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={getStartDateClass()}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={getEndDateClass()}
                required
              />
            </div>
          </div>

          {dateError && <div className="error-message">{dateError}</div>}

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Planned">Planned</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading || !isFormValid()} className="btn-primary">
              {loading ? 'Saving...' : (trial ? 'Update Trial' : 'Create Trial')}
            </button>
          </div>
        </form>

        <ConfirmModal
          isOpen={showCancelModal}
          onClose={cancelModalClose}
          onConfirm={confirmCancel}
          title="Discard Changes"
          message={`Are you sure you want to cancel ${trial ? 'editing' : 'creating'} this clinical trial? Any unsaved changes will be lost.`}
          confirmText="Discard"
          cancelText="Keep Editing"
          type="warning"
        />
      </div>
    </div>
  );
};

export default TrialForm;
