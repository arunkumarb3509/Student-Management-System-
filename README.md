# 🎓 Student Management System

A full-stack **Student Management System** built with:

- 🔧 **Frontend:** React.js  
- 🚀 **Backend:** Node.js + Express  
- 🗄️ **Database:** PostgreSQL

This system helps schools or institutions manage students effectively with role-based access for **Admin** and **Teacher**.

---

## ✨ Features

### 🧑‍🏫 Roles

- **Admin:**
  - Add new students
  - Edit student details
  - Delete student records
  - View full student list with search, filter, and pagination

- **Teacher:**
  - View only the list of students with search, filter, and pagination
  - No access to edit/delete features

---

## 🖥️ Frontend (React.js)

- Built using functional components and React Hooks
- Responsive UI with Bootstrap 5
- Pages:
  - `Login / Register`
  - `Dashboard` with class/gender charts
  - `Upload Student`
  - `Student List (View, Edit, Delete)`
- Role-based rendering for Admin/Teacher
- Client-side routing with `react-router-dom`
- JWT-based auth

---

## 🌐 Backend (Node.js + Express)

- RESTful API for all CRUD operations
- Secure authentication using JWT tokens
- Role validation middleware
- File upload support (student photo)
- Routes:
  - `/api/register`
  - `/api/login`
  - `/api/upload`
  - `/api/getAllStudents`
  - `/api/students/:id`

---

## 🛢️ Database (PostgreSQL)

- Tables:
  - `users` (with role: ADMIN/TEACHER)
  - `students` (name, email, class, gender, photo)
- Secure relational mapping
- Auto-generated student ID
- Photo stored as filename, uploaded to `/uploads/`

---

## 🔐 Authentication

- JWT stored in `localStorage`
- Decoded in frontend to determine role access
- Protected routes for `/dashboard`, `/upload`, etc.

---

## 📷 Screenshots

| Login | Dashboard |
|-------|-----------|
| ![Login](screenshots/login.png) | ![Dashboard](screenshots/dashboard.png) |

| Student List | Upload |
|--------------|--------|
| ![List](screenshots/student-table.png) | ![Upload](screenshots/upload-form.png) |

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
