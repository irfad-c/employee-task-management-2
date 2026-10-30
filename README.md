# Employee Task Management API

A backend application for managing employees and their tasks, built using Node.js, Express.js, and MySQL. It uses basic token-based authentication to protect selected API endpoints.

## Features
- Create employees and tasks
- Update task status
- Generate task summaries by employee

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** Token-based authentication

## How to Run

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the structure provided in `.env.example`.
4. Start the development server:
   ```bash
   npm run dev
   ```
## API documentation

POST requests

/api/employees (To create new employee) 

/api/tasks (To create new task)

GET requests

/api/tasks/summary (To get task summary)

/api/employees/1/workload (To get workload)

PATCH request

/api/tasks/1/status (To update the status)

Example inputs

Create employee

{
    "salary":"880000",
    "department":"IT",
    "name":"Google",
    "email":"Google@gmail.com"
}

Create task

{
    "title":"Trying",
    "status":"IN_PROGRESS",
    "priority":"HIGH",
    "due_date":"2026-11-19",
    "employee_id":"1"
}
