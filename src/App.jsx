import { useEffect, useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobToEditIndex, setJobToEditIndex] = useState(null);
  const [jobToEdit, setJobToEdit] = useState(null);

  // Load jobs from localStorage when the app starts
  useEffect(() => {
    try {
      const savedJobs = localStorage.getItem('jobs');
      if (savedJobs) {
        setJobs(JSON.parse(savedJobs));
      }
    } catch (e) {
      console.error("Failed to load jobs:", e);
      setJobs([]);
    }
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Add a new job
  const handleAddJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: Date.now().toString(),
      notes: newJob.notes || ''  // always keep notes
    };
    setJobs([...jobs, jobWithId]);
  };

  // Start editing a job
  const handleEditJob = (job, index) => {
    setJobToEdit(job);
    setJobToEditIndex(index);
  };

  // Update a job after editing
  const handleUpdateJob = (updatedJob) => {
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

  // Quick note editing 
  const handleQuickNote = (job, newNotes) => {
    const updatedJobs = jobs.map(j =>
      j.id === job.id ? { ...j, notes: newNotes } : j
    );
    setJobs(updatedJobs);
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setJobToEdit(null);
    setJobToEditIndex(null);
  };

  // Delete a job
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
        jobs={jobs}
        onDelete={handleDeleteJob}
        onEdit={handleEditJob}
        onQuickNote={handleQuickNote}
      />
    </div>
  );
}

export default App;