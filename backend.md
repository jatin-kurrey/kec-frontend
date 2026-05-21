# Backend Architecture Plan & Admin Panel: Krishna Engineering College (KEC)

This document outlines the proposed backend architecture using **Go (Golang)** and **PostgreSQL** to serve the KEC React (Vite) frontend application, alongside a comprehensive **Admin Panel Data Strategy** for full institutional control.

## 1. Technology Stack
* **Language:** Go (Golang) 1.21+ (For high concurrency and performance)
* **Framework:** Gin (Lightweight, extremely fast HTTP web framework)
* **Database:** PostgreSQL (Relational integrity for handling applications and structural data)
* **ORM:** GORM (Go Object-Relational Mapper)
* **Authentication:** JWT (JSON Web Tokens) for Admin dashboard access.
* **Storage:** AWS S3 (or local mapping) for handling Admin panel image/PDF uploads (Notices, Gallery).

## 2. Project Directory Structure (Standard Go Layout)
```text
kec-backend/
├── cmd/
│   └── api/
│       └── main.go           # Application entry point
├── internal/
│   ├── config/               # Environment variables & DB config setup (Viper/godotenv)
│   ├── handlers/             # Gin HTTP handlers (Controllers)
│   ├── middleware/           # CORS, Auth, and Role-Based Access Control (RBAC)
│   ├── models/               # GORM Structs (DB Schema equivalents)
│   └── repository/           # Database interaction logic (queries)
├── pkg/
│   └── utils/                # Shared utilities (JWT parsing, CSV Exporters, Image Uploads)
├── go.mod
└── go.sum
```

## 3. Core Database Schema (Models)

### `Application` (Handles Super40, Apply Now, Advanced Coding, etc.)
* `id` (UUID, Primary Key)
* `form_type` (Enum: 'SUPER_40', 'CODING_COURSE', 'GENERAL_ADMISSION', 'EV', 'DRONE')
* `full_name`, `email`, `phone` (Strings)
* `school_or_dept` (String)
* `semester` (Integer, Nullable)
* `status` (Enum: 'PENDING', 'REVIEWED', 'APPROVED', 'REJECTED')
* `notes` (Text - For Admin tracking)
* `created_at` / `updated_at`

### `Announcement` (Feeds `NoticeBoard.jsx` & `EventComponent.jsx`)
* `id` (UUID, Primary Key)
* `type` (Enum: 'NOTICE', 'EVENT', 'PRESS_RELEASE')
* `title` (String)
* `description` (Text)
* `event_date` (Date)
* `image_url` (String)
* `is_featured` / `is_active` (Booleans)

### `DepartmentConfig` (Feeds `DepartmentsPage.jsx`)
* `id` (String - Ex: 'cse', 'civil')
* `name`, `description`, `vision` (Texts)
* `total_students`, `total_faculty` (Integers)
* `placement_rate` (String - Ex: '95%')
* `is_active` (Boolean)

### `AdminUser` (For Administrative Access)
* `id` (UUID)
* `username` / `email` (String, Unique)
* `password_hash` (String)
* `role` (Enum: 'SUPER_ADMIN', 'DEPT_HEAD', 'EDITOR')
* `last_login` (Timestamp)

---

## 4. Admin Panel Features & Controls (React Interface mapping to Go API)
The Admin Panel will serve as the Command Center for KEC, allowing authorized personnel to modify the website dynamically without touching code.

### 📊 **1. Command Dashboard Overview**
* **Metrics Board:** Real-time counters showing Total Applications (Today/Weekly), Active Notices, and System Health.
* **Quick Actions:** Shortcuts to "Post New Update" or "Export CSV".

### 📋 **2. Application Management Hub**
* **Central List:** A Data Grid (table) to view all form submissions (Super 40, Drone, EV, general admission).
* **Controls:** 
  * Filter by `form_type` or `status` (Pending, Reviewed).
  * Bulk Select to update Status (e.g., Approve multiple students).
  * Add internal `notes` regarding a student's call/interview.
  * **Export to CSV/Excel** functionality (Crucial for admission processing).

### 📢 **3. Content & News Management (CMS)**
* **Full CRUD Control:** Create, Read, Update, and Delete for *Notices*, *Press Releases*, and *Events*.
* **Media Uploader:** Secure image upload controls with preview to replace local `/events/event3.jpeg` paths.
* **Visibility Toggles:** A quick switch to mark an announcement as `is_active` (visible live) or `is_featured` (pinned to top).

### 🏢 **4. Department / Dynamic Site Configuration**
* Instead of hardcoding `departments.js`, the admin panel will contain an editor.
* **Controls:** Update Placement Rates (e.g., bump Mechanical placement from 92% to 95% post-season), modify Total Student counts, and update HOD contact details dynamically.

### 🔐 **5. Role-Based Access Management (RBAC)**
* **Super Admin controls:** Ability to register new Admin accounts.
* Restrict views (e.g. an 'Editor' can only post Notices, while 'Super Admin' can view Student Admission Data).

---

## 5. API Endpoints for Full Controls

### Public API (Accessed by standard React visitors)
* `POST /api/v1/applications` (Public form submissions)
* `GET /api/v1/content/announcements` 
* `GET /api/v1/content/departments` 

### Protected API Architecture (Admin Panel)
*Authentication required for all endpoints under `/api/v1/admin/*`*

**Auth & Users**
* `POST /api/v1/auth/login` (Admin login to receive JWT)
* `GET /api/v1/admin/users` (List authorized admins - SUPER_ADMIN only)
* `POST /api/v1/admin/users/create` (Create new editor)

**Application Controls**
* `GET /api/v1/admin/applications` (List all, accepts query params `?type=SUPER_40&status=PENDING`)
* `GET /api/v1/admin/applications/export` (Returns generated CSV file of filtered applicants)
* `PUT /api/v1/admin/applications/:id/status` (Update Pending -> Approved)
* `PUT /api/v1/admin/applications/:id/notes` (Attach interview notes)

**Content Controls (Notices/Gallery/Departments)**
* `POST /api/v1/admin/upload` (Handles multipart/form-data for image uploads -> saves to local disk/S3 and returns URL)
* `POST /api/v1/admin/announcements` (Create complete with new image URL)
* `PUT /api/v1/admin/announcements/:id` (Update/Toggle visibility)
* `DELETE /api/v1/admin/announcements/:id` (Archiving)
* `PUT /api/v1/admin/departments/:id` (Update dynamic text and placement statistics live)

---

## 6. Implementation Best Practices (Go + GORM)
1. **Consistent JSON Arrays:** Ensure handlers explicitly define `[]models.Announcement{}` to prevent Go from serializing empty slices as `null`, which crushes React `.map()` iteration grids.
2. **Preload Safety:** Use GORM's `.Preload()` functionality gracefully when mapping multi-table relations (Should you attach specific Users to specific Notes). Always check `db.Error`.
3. **CORS Configuration:** The frontend runs on Vite (e.g., `localhost:5173`). Configure Gin's CORS middleware to securely whitelist your exact Admin panel deployment domain and whitelist Authorization headers.
4. **Data Sanitization & JWT:** Gin binding (`c.ShouldBindJSON`) must implement strict struct validation. JWT tokens should have a brief strict expiry timeframe mapping to an HttpOnly cookie standard if possible to prevent Admin session hijacking.
