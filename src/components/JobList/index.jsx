import styles from './styles.module.css';
import JobCard from '../JobCard';

const JobList = ({ jobs, onDelete, onEdit }) => {
    return (
        <div className={styles.jobList}>
            <h2 className={styles.sectionTitle}>Tracked Jobs</h2>
            {jobs.map((job, index) => (
                <JobCard
                    key={job.id}
                    job={job}
                    onDelete={() => onDelete(index)}
                    onEdit={() => onEdit(job, index)}
                />
            ))}
        </div>
    );
};

export default JobList;