🛠️ Task Management System – Backend

A Node.js + Express + MongoDB backend for a role-based task management system, supporting Admin and Employee users with secure authentication and authorization.

📌 Features
🔐 Authentication & Authorization
JWT-based authentication
Password hashing using bcrypt
Role-based access control (Admin / Employee)
Protected routes with middleware

👤 User Management
Admin & Employee role
Secure user registration & login
Password encryption
Duplicate email validation

✅ Task Management
Create, read, update, delete tasks
Assign tasks to employees
Update task status (Pending / In Progress / Completed)
Centralized task state

🛡️ Security
JWT token validation
Password excluded from API responses
Protected API routes
Role authorization middleware

🧱 Tech Stack
Technology Purpose
Node.js Runtime environment
Express.js Backend framework
MongoDB Database
Mongoose ODM
JWT Authentication
bcryptjs Password hashing
dotenv Environment variables

📁 Folder Structure

backend/
│
├── controllers/
│ ├── authController.js
│ └── taskController.js
└── userControllers.js
│
├── models/
│ ├── User.js
│ └── Task.js
│
├── routes/
│ ├── authRoutes.js
│ └── taskRoutes.js
│ └──userRoutes.js
├── middleware/
│ ├── authMiddleware.js
│ └── errorMiddleware.js
│ └──
├── config/
│ └── db.js
│
├── utils/
│ └── generateToken.js
│
├── .env
├── server.js
└── package.json

🔐 Authentication Flow
User logs in using email & password
Password compared using bcrypt
JWT token generated
Token sent to client
Client sends token in Authorization header
Protected routes verify token & role

🔑 Environment Variables (.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

🚀 API Endpoints
🔐 Auth Routes
Method Endpoint Access
POST /api/auth/register Public
POST /api/auth/login Public

📋 Task Routes
Method Endpoint Access
GET /api/tasks Admin
POST /api/tasks Admin
PUT /api/tasks/:id Admin
DELETE /api/tasks/:id Admin
PUT /api/tasks/:id/status Employee

🛡️ Middleware Used
authProtect – verifies JWT token
authorizeRoles – role-based access
errorHandler – centralized error handling

🧪 Sample Authorization Header
Authorization: Bearer <JWT_TOKEN>

🧠 Best Practices Followed
MVC architecture
Secure password handling
Clean folder structure
Separation of concerns
Scalable middleware usage
Production-ready error handling

▶️ Run Locally
# Install dependencies
npm install
# Start server
npm run dev

📌 Future Improvements
Refresh tokens
Pagination & search
Task analytics
Admin user management
Logging & monitoring

👨‍💻 Author
Abhinav KV
MERN Stack Developer
