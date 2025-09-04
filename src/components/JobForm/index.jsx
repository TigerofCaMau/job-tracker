import React from 'react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AddButton from '../Buttons/AddButton';
import CancelButton from '../Buttons/CancelButton';

const JobForm = ({ onAddJob, jobToEdit, onUpdateJob, onCancelEdit }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState('Applied');

  // Load job into form fields when editing
  useEffect(() => {
    if(jobToEdit) {
      setJobTitle(jobToEdit.jobTitle);
      setCompany(jobToEdit.company);
      setApplicationDate(jobToEdit.applicationDate);
      setStatus(jobToEdit.status);
    } else {
      // Clear form when not editing
      setJobTitle('');
      setCompany('');
      setApplicationDate('');
      setStatus('Applied');
    }
  }, [jobToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = { jobTitle, company, applicationDate, status };

    if (jobToEdit) {
      // If we're editing, update the job
      onUpdateJob(jobData);
    } else {
      // Otherwise, add a new job
      onAddJob(jobData);
    }

    // Reset form back to blank (useEffect will also do this when jobToEdit is null)
    setJobTitle('');
    setCompany('');
    setApplicationDate('');
    setStatus('Applied');
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      {/* Job title field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Job Title:
            <input
              type="text"
              value={jobTitle}
              placeholder="e.g., Software Engineer"
              onChange={(e) => setJobTitle(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>

        {/* Company field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Company:
            <input
              type="text"
              value={company}
              placeholder="e.g., Google"
              onChange={(e) => setCompany(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>

        {/* Date field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Application Date:
            <input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>

        {/* Status field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.select}
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </label>
        </div>
        
        {/* Show cancel only in edit mode */}
        {jobToEdit && (
          <CancelButton onClick={onCancelEdit} />
        )}

        <AddButton label={jobToEdit ? 'Confirm Edit' : 'Add Job'} />
      </form>
  );
};

export default JobForm;