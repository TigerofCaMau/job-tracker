import SearchBar from '../../components/SearchBar'
import JobCard from '../JobCard';
import AppliedButton from '../Buttons/StatusButtons/AppliedButton';
import InterviewButton from '../Buttons/StatusButtons/InterviewButton';
import OfferButton from '../Buttons/StatusButtons/OfferButton';
import RejectedButton from '../Buttons/StatusButtons/RejectedButton';
import styles from './styles.module.css';

const JobList = ({
    jobs,
    onDelete,
    onEdit,
    onQuickNote,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    showUndo,
    handleClearAllJobs,
    handleUndoClearJobs,
    activeStatusFilter,
    setActiveStatusFilter
}) => {
    const searchCount = searchTerm.trim().length > 0;
    
    return (
        <div className={styles.jobList}>
            <h2 className={styles.sectionTitle}>Tracked Jobs</h2>
            
            {/* Clear and undo buttons */}
            <div className={styles.buttonContainer}>
                {jobs.length > 0 && (
                    <button
                        aria-label="Remove all tracked jobs"
                        onClick={handleClearAllJobs}
                        className={styles.clearButton}
                        disabled={showUndo}
                    >
                        Clear All Jobs
                    </button>
                )}

                {showUndo ? (
                    <button
                        aria-label="Undo removing tracked jobs"
                        onClick={handleUndoClearJobs}
                        className={styles.undoButton}
                    >
                        Undo
                    </button>
                ) : null}
            </div>

            {/* Search & sorting */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrapper}>
                    <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    />
                </div>

                <div className={styles.sortWrapper}>
                    <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
                    <select
                    id="sort"
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                    className={styles.sortSelect}
                    >
                    <option value="dateDesc">Date (newest first)</option>
                    <option value="dateAsc">Date (oldest first)</option>
                    <option value="companyAsc">Company (A–Z)</option>
                    <option value="companyDesc">Company (Z–A)</option>
                    <option value="statusAsc">Status (A–Z)</option>
                    <option value="statusDesc">Status (Z–A)</option>
                    </select>
                </div>
            </div>

            {/* Status buttons */}
            <div className={styles.statusButtons}>
                <AppliedButton
                    onClick={() =>
                    setActiveStatusFilter(activeStatusFilter === 'Applied' ? null : 'Applied')
                    }
                    isActive={activeStatusFilter === 'Applied'}
                />
                <InterviewButton
                    onClick={() =>
                    setActiveStatusFilter(
                        activeStatusFilter === 'Interview' ? null : 'Interview'
                    )
                    }
                    isActive={activeStatusFilter === 'Interview'}
                />
                <OfferButton
                    onClick={() =>
                    setActiveStatusFilter(activeStatusFilter === 'Offer' ? null : 'Offer')
                    }
                    isActive={activeStatusFilter === 'Offer'}
                />
                <RejectedButton
                    onClick={() =>
                    setActiveStatusFilter(
                        activeStatusFilter === 'Rejected' ? null : 'Rejected'
                    )
                    }
                    isActive={activeStatusFilter === 'Rejected'}
                />
                </div>

            {/* Toggler filter off */}

            {/* Result Count */}
            {searchCount && (
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
                        onDelete={() => onDelete(job.id)}
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