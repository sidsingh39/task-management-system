# Task Management System 

A full-stack Task Management System with authentication, CRUD operations, and a clean, elegant UI.  
Built to demonstrate real-world backend + frontend integration using modern web technologies.


## Features

- User Authentication (Register / Login)
- JWT-based Authorization
- Create, Read, Update, Delete Tasks
- Toggle task completion
- Secure environment variables
- Bronze themed modern UI
- Responsive design


## Tech Stack

### Frontend
- HTML
- CSS (Custom styling, Bronze theme)
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (or your DB)
- JWT Authentication
- bcrypt


## Project Structure

Task-Management-System/
│
├── backend/
│ ├── prisma/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── .env (ignored)
│ └── server.js
│
├── frontend/
│ ├── css/
│ ├── js/
│ ├── index.html
│ ├── login.html
│ └── register.html

## ⚙️ Setup Instructions

1. Clone the repository  
git clone https://github.com/sidsingh39/task-management-system.git

2. Backend setup

cd backend
npm install


Create .env file:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret


Run backend:

npm run dev

3. Frontend setup
Open index.html using Live Server or directly in browser.


## API Endpoints
| Method | Route | Description |
|------|------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |
| GET | /tasks | Get all tasks |
| POST | /tasks | Create task |
| PATCH | /tasks/:id/toggle | Toggle task |
| DELETE | /tasks/:id | Delete task |


## Status
Project is complete and fully functional.  
Frontend and backend are integrated, secured, and styled with a bronze UI theme.


## Author
Siddharth Singh  
B.Tech CSE (Final Year)  
IET Lucknow  
GitHub: https://github.com/sidsingh39