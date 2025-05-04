# 📝 Task Management REST API

A simple task management REST API built with **Node.js** and **Express.js**, using a local JSON file (`task.json`) as a data store. It supports full CRUD operations along with filtering, sorting, and task prioritization.

---

## 📁 Project Structure

task-managerapi- ..../
├── task.json # Inmemory task lists.
├── router/
│ └── tasks.js # Route handlers for /api/v1/tasks
├── .env # Environment variables (e.g., PORT)
├── app.js # Application entry point
├── package.json # NPM scripts and dependencies
└── README.md # Project documentation

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-api.git
cd task-api

### 2. Install Dependency
npm install

### 3. Create a .env file in the root directory and define the port number:
PORT=3000

### 4. Start the Server
Start the Server


#### API Testing Guide...........
Base URL: http://localhost:3000/api/v1

#### GET /tasks
Fetch all tasks.

...>> Optional Query Parameters:
completed=true or completed=false — Filter by completion status
sortBy=createdAt — Sort tasks by creation date

example:- GET /api/v1/tasks?completed=false&sortBy=createdAt


#### GET /tasks/:id
example:- GET /api/v1/tasks/5

#### GET /tasks/priority/:level
example:- GET /api/v1/tasks/priority/high


#### POST /tasks
Create a new task.

Required JSON Body Below:
{
  "title": "New Task",
  "description": "Details of the task",
  "completed": false,
  "priority": "medium"
}

...>>Validation Rules:

title and description must be non-empty strings
completed must be a boolean
priority must be one of: low, medium, high

#### ✏️ PUT /tasks/:id
Update a task by ID.
example:- PUT /api/v1/tasks/3

{
  "title": "Updated Task Title",
  "description": "Updated Description",
  "completed": true,
  "priority": "high"
}

Error if task ID is invalid:
{ "error": "Task not found" }

Validation errors follow same format as POST.

#### ❌ DELETE /tasks/:id
example:- DELETE /api/v1/tasks/10

Error if not found:
example:- Error if not found:
