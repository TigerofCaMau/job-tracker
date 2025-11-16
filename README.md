📌 Job Tracker App

A simple, clean, and efficient web application for managing and tracking your job applications.
Built with React + Vite, featuring filtering, sorting, searching, and full CRUD functionality.

🚀 Features

🔹 Job Management
- Add new job applications
- Edit existing applications
- Delete jobs
- Undo the most recent deletion
- Clear all jobs at once

🔹 Status Filters
- Filter jobs by application status:
- Applied
- Interview
- Offer
- Rejected
- Reset to view all

🔹 Search & Sorting
- Full-text search by company, title, or notes
- Sort by Company, Job Title, or Date Applied

🔹 UI & UX
- Fully responsive design
- Clean and consistent component structure
- Highlighted active filter button
- Smooth button interactions and accessible layout

🛠️ Tech Stack

Frontend
- React (with Hooks)
- Vite
- CSS Modules
- TypeScript (utility types)

Tooling
- ESLint

📂 Project Structure

```
src/
  components/
    Buttons/
      StatusButtons/
      AddButton/
      CancelButton/
      DeleteButton/
      EditButton/
    JobCard/
    JobForm/
    JobList/
    SearchBar/
  data/
  utils/
  App.jsx
  App.css
  main.jsx
  index.css
  ```