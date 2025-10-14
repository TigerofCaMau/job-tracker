import styles from './styles.module.css';
import SearchBar from '../../components/SearchBar'
import JobCard from '../JobCard';

const JobList = ({ jobs, onDelete, onEdit, onQuickNote, searchTerm, setSearchTerm }) => {
    const searchtCount = searchTerm.trim().length > 0;
    return (
        <div className={styles.jobList}>
            <h2 className={styles.sectionTitle}>Tracked Jobs</h2>
            
            <div className={styles.searchWrapper}x>
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
            </div>

            {/* Result Count */}
            {searchtCount && (
                <p className={styles.resultCount}>
                    {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
                </p>
            )}

            {/* No results message */}
            {jobs.length === 0 ? (
                <p className={styles.noResults}>
                    {searchTerm.trim()
                        ? `No jobs found matching ${searchTerm}`
                        : "You haven't added any jobs yet."}
                </p>
            ) : (
                jobs.map((job, index) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onDelete={() => onDelete(index)}
                        onEdit={() => onEdit(job, index)}
                        onQuickNote={onQuickNote}
                        searchTerm={searchTerm}
                    />
                ))
            )}
        </div>
    );
};

export default JobList;