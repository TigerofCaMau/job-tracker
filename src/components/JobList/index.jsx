import styles from './styles.module.css';
import JobCard from '../JobCard';

const JobList = ({ jobs, onDelete, onEdit, onQuickNote }) => {
    return (
        <div className={styles.jobList}>
            <h2 className={styles.sectionTitle}>Tracked Jobs</h2>
            {jobs.map((job, index) => (
                <JobCard
                    key={job.id}
                    job={job}
                    onDelete={() => onDelete(index)}
                    onEdit={() => onEdit(job, index)}
                    onQuickNote={onQuickNote}
                />
            ))}
        </div>
    );
};

export default JobList;