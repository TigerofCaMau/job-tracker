import styles from './styles.module.css';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';

const JobCard = ({ job, onDelete, onEdit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.title}>{job.jobTitle}</h3>
        <p className={styles.detail}><strong>Company:</strong>{job.company}</p>
        <p className={styles.detail}><strong>Applied on:</strong>{job.applicationDate}</p>
        <p className={styles.detail}><strong>Status:</strong>{job.status}</p>
      </div>
      
      <div className={styles.buttons}>
        <EditButton label="Edit Job" onClick={onEdit} />
        <DeleteButton label="Delete Job" onClick={onDelete} />
      </div>
    </div>
  );
};

export default JobCard;