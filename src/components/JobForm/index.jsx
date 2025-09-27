import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AddButton from '../Buttons/AddButton';
import CancelButton from '../Buttons/CancelButton';

const JobForm = ({ onAddJob, jobToEdit, onUpdateJob, onCancelEdit }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if(jobToEdit) {
      setJobTitle(jobToEdit.jobTitle);
      setCompany(jobToEdit.company);
      setApplicationDate(jobToEdit.applicationDate);
      setStatus(jobToEdit.status);
      setNotes(jobToEdit.notes || '');
    } else {
      setJobTitle('');
      setCompany('');
      setApplicationDate('');
      setStatus('Applied');
      setNotes('');
      setShowNotes(false);
    }
  }, [jobToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = { jobTitle, company, applicationDate, status, notes };

    if (jobToEdit) {
      onUpdateJob(jobData);
    } else {
      onAddJob(jobData);
    }

    setJobTitle('');
    setCompany('');
    setApplicationDate('');
    setStatus('Applied');
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
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

      <div className={styles.formGroup}>
        <label
          className={styles.label}
          onClick={() => setShowNotes((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {showNotes ? "Notes (click to hide):" : "Add Notes (optional)"}
        </label>

        {showNotes && (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this job..."
            className={styles.textarea}
          />
        )}
      </div>
      
      {jobToEdit && (
        <CancelButton onClick={onCancelEdit} />
      )}

      <AddButton label={jobToEdit ? 'Confirm Edit' : 'Add Job'} />
    </form>
  );
};

export default JobForm;