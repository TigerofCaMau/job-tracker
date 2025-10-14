import { useEffect, useState, useMemo } from 'react';
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
}

const saveJobs = (jobs) => {
  try {
    if (!window?.localStorage) return;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  } catch (e) {
    console.warn('Failed to save jobs to localStorage:', e);  
  }
};

function App() {
  // Load jobs from localStorage on mount
  const [jobs, setJobs] = useState(() => loadJobs());
  const [jobToEditIndex, setJobToEditIndex] = useState(null);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Momoize the filtered list - recompute only when jobs or searchTerm change
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobs; // no filter

    const terms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

    return jobs.filter(job => {
      // Combine the fields we want searchable
      const haystack = [
        job.jobTitle,
        job.company,
        job.status,
        job.applicationDate,
        job.notes,
      ]
        .filter(Boolean) // drop undefined/null
        .join(' ')
        .toLowerCase();
      
      // Every search word must appear somewhere
      return terms.every(term => haystack.includes(term));
    });
  }, [jobs, searchTerm]);

  // Save jobs whenever they change
  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  // --- Handlers ---
  const handleAddJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: Date.now().toString(),
      notes: newJob.notes || ''
    };
    setJobs([...jobs, jobWithId]);
  };

  const handleEditJob = (job, index) => {
    setJobToEdit(job);
    setJobToEditIndex(index);
  };

  const handleUpdateJob = (updatedJob) => {
    if (jobToEditIndex === null) return; // safety check

    const updatedJobs = [...jobs];
    updatedJobs[jobToEditIndex] = {
      ...updatedJob,
      id: updatedJobs[jobToEditIndex].id,
      notes: updatedJob.notes || ''
    };

    setJobs(updatedJobs);
    setJobToEdit(null);
    setJobToEditIndex(null);
  };

  const handleQuickNote = (job, newNotes) => {
    const updatedJobs = jobs.map((j) =>
      j.id === job.id ? { ...j, notes: newNotes } : j
    );
    setJobs(updatedJobs);
  };

  const handleCancelEdit = () => {
    setJobToEdit(null);
    setJobToEditIndex(null);
  };

  const handleDeleteJob = (indexToRemove) => {
    const updatedJobs = jobs.filter((_, index) => index !== indexToRemove);
    setJobs(updatedJobs);
  };

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
        jobs={filteredJobs}
        onDelete={handleDeleteJob}
        onEdit={handleEditJob}
        onQuickNote={handleQuickNote}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;