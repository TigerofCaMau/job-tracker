import { useEffect, useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobToEditIndex, setJobToEditIndex] = useState(null);
  const [jobToEdit, setJobToEdit] = useState(null);

  // Load jobs from local storage on mount
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(savedJobs);
  }, []);

  // Save jobs to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.toString(jobs));
  }, [jobs]);

  // Add a job
  const handleAddJob = (newJob) => {
    const jobWithId = { ...newJob, id: Date.now().toString() };
    setJobs([...jobs, jobWithId]);
  };

  // Start editing a job
  const handleEditJob = (job, index) => {
    // Put the job into state so JobForm can load it
    setJobToEdit(job);

    // Remember which job we are editing
    setJobToEditIndex(index);
  };

  // Update the job after editing
  const handleUpdateJob = (updatedJob) => {
    // Copy the jobs array (never mutate directly)
    const updatedJobs = [...jobs];

    // Replace the job at the stored index with the new one
    // Keep the original id so it doesn't change
    updatedJobs[jobToEditIndex] = { 
      ...updatedJob, 
      id: updatedJobs[jobToEditIndex].id 
    };

    // Save the updated array
    setJobs(updatedJobs);

    // Reset state to exit edit mode
    setJobToEdit(null);
    setJobToEditIndex(null);
  };

// Cancel editing
const handleCancelEdit = () => {
  // Just reset edit state without changing jobs
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
      />
    </div>
  );
}

export default App;