import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';

const JobCard = ({ job, onDelete, onEdit, onQuickNote }) => {
  const [showQuickNotes, setShowQuickNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(job.notes || '');
  const MAX_NOTES_LENGTH = 500;

  // Sync when job.notes updates
  useEffect(() => {
    if (!showQuickNotes) {
      setTempNotes(job.notes || '');
    }
  }, [job.notes, showQuickNotes]);  

  const handleSaveNotes = () => {
    const cleaned = tempNotes.trim(); 
    if (cleaned.length > MAX_NOTES_LENGTH) {
      alert(`Notes cannot exceed ${MAX_NOTES_LENGTH} characters.`);
      return;
    }
    onQuickNote(job, cleaned);
    setShowQuickNotes(false);
  };

  const handleResize = e => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.title}>{job.jobTitle}</h3>
        <p className={styles.detail}><strong>Company:</strong>{job.company}</p>
        <p className={styles.detail}><strong>Applied on:</strong>{job.applicationDate}</p>
        <p className={styles.detail}><strong>Status:</strong>{job.status}</p>
        
        {job.notes?.trim() && !showQuickNotes && (
          <p className={`${styles.detail} ${styles.notesText}`}>
            <strong>Notes:</strong> {job.notes}
          </p>
        )}

        {showQuickNotes && (
          <div className={styles.quickNotes}>
            <textarea
              aria-label="Quick note"
              value={tempNotes}
              onChange={(e) => {
                if (e.target.value.length <= MAX_NOTES_LENGTH) {
                  setTempNotes(e.target.value);
                  handleResize(e);
                }
              }}
              onInput={handleResize}
              onBlur={handleSaveNotes}
              placeholder='Add quick notes'
              className={styles.textarea}
            />
            <p className={`${styles.charCount} ${tempNotes.length > MAX_NOTES_LENGTH * 0.9 ? styles.charCountWarning : ''}`}>
              {tempNotes.length} / {MAX_NOTES_LENGTH} characters
            </p>
            <button
              onClick={handleSaveNotes}
              aria-label="Save quick note"
              className={styles.saveBtn}
            >
              Save
            </button>
          </div>
        )}
      </div>
      
      <div className={styles.buttons}>
        <button
          onClick={() => setShowQuickNotes((prev) => !prev)}  
          className={`${styles.notesBtn} ${showQuickNotes ? styles.active : ''}`}
        >
          Notes{showQuickNotes && '*'}
        </button>

        <EditButton label="Edit Job" onClick={onEdit} />
        <DeleteButton label="Delete Job" onClick={onDelete} />
      </div>
    </div>
  );
};

export default JobCard;