import { useEffect, useState, useMemo } from 'react';
import { SORT_OPTIONS, sortJobs } from './utils/MultiLevelSort';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './App.css';

// --- LocalStorage helpers ---
const loadJobs = () => {
  try {
    if (!window?.localStorage) return [];
    const saved = localStorage.getItem('jobs');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn('localStorage unavailable, using memory only:', e);
    return [];
  }
};

const saveJobs = (jobs) => {
  try {
    if (typeof window === 'undefined') return [];
    localStorage.setItem('jobs', JSON.stringify(jobs));
  } catch (e) {
    console.warn('Failed to save jobs to localStorage:', e);
  }
};

function App() {
  const [jobs, setJobs] = useState(() => loadJobs());
  const [jobToEditIndex, setJobToEditIndex] = useState(null);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(() => {
    try {
      return localStorage.getItem('sortOption') || 'dateDesc';
    } catch {
      return 'dateDesc';
    }
  });
  const [clearedJobsBackup, setClearedJobsBackup] = useState([]);
  const [showUndo, setShowUndo] = useState(false);

  // --- Persist sort option and jobs ---
  useEffect(() => {
    try {
      localStorage.setItem('sortOption', sortOption);
    } catch (e) {
      console.warn('Could not save sort option:', e);
    }
  }, [sortOption]);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    let timer;

    if (showUndo) {
      // Start the 5-second timer
      timer = setTimeout(() => {
        setShowUndo(false);
      }, 5000)
    }

    // Cleanup: cancel timer if undo is clicked early or component re-renders
    return () => clearTimeout(timer);
  }, [showUndo]);

  // --- Derived data ---
  const jobsWithParsedDates = useMemo(() => {
    return jobs.map((j) => {
      const parsed = j.applicationDate ? Date.parse(j.applicationDate) : null;
      return { ...j, __parsedDate: Number.isNaN(parsed) ? null : parsed };
    });
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobsWithParsedDates;

    const terms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

    return jobsWithParsedDates.filter((job) => {
      const haystack = [
        job.jobTitle,
        job.company,
        job.status,
        job.applicationDate,
        job.notes,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    });
  }, [jobsWithParsedDates, searchTerm]);

  const sortedJobs = useMemo(
    () => sortJobs(filteredJobs, sortOption),
    [filteredJobs, sortOption]
  );

  // --- Handlers ---
    const handleClearAllJobs = () => {
      const isConfirmed = confirm("Are you sure you want to delete all jobs?");

      if (isConfirmed) {
        setClearedJobsBackup(jobs);
        setJobs([]);
        saveJobs([]);
        setShowUndo(true);
      }
    };

    const handleUndoClearJobs = () => {
      if (clearedJobsBackup.length > 0) {
        setJobs(clearedJobsBackup);
        setClearedJobsBackup([]);
        setShowUndo(false);
        saveJobs(clearedJobsBackup);
      }
    };

  const handleAddJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: Date.now().toString(),
      notes: newJob.notes || '',
    };
    setJobs((prev) => [...prev, jobWithId]);
  };

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setJobToEditIndex(jobs.findIndex((j) => j.id === job.id));
  };

  const handleUpdateJob = (updatedJob) => {
    if (jobToEditIndex === null) return;
    setJobs((prev) => {
      const updated = [...prev];
      updated[jobToEditIndex] = {
        ...updatedJob,
        id: updated[jobToEditIndex].id,
        notes: updatedJob.notes || '',
      };
      return updated;
    });
    setJobToEdit(null);
    setJobToEditIndex(null);
  };

  const handleQuickNote = (job, newNotes) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, notes: newNotes } : j))
    );
  };

  const handleCancelEdit = () => {
    setJobToEdit(null);
    setJobToEditIndex(null);
  };

  const handleDeleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  // --- Render ---
  return (
    <div className="appContainer">
      <h1 className="title">Job Tracker</h1>

      <JobForm
        onAddJob={handleAddJob}
        jobToEdit={jobToEdit}
        onUpdateJob={handleUpdateJob}
        onCancelEdit={handleCancelEdit}
      />

      <JobList
        jobs={sortedJobs}
        onDelete={handleDeleteJob}
        onEdit={handleEditJob}
        onQuickNote={handleQuickNote}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        showUndo={showUndo}
        handleClearAllJobs={handleClearAllJobs}
        handleUndoClearJobs={handleUndoClearJobs}
      />
    </div>
  );
}

export default App;