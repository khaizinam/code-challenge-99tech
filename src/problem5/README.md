# Problem 5: Crude Server

A production-ready basic backend server built with **ExpressJS** and **TypeScript**. This service provides a robust CRUD interface for resource management with persistent data storage.

## 🚀 Features
- **Full CRUD**: Create, Read, Update, and Delete resources.
- **Search & Filter**: List resources with advanced filtering (name, category, status).
- **Database Agnostic**: Configured to support both **SQLite3** and **MySQL** via Knex.
- **Data Integrity**: migration-based schema management.
- **Developer Friendly**: TypeScript with hot-reloading and clear structure.

---

## 🛠️ Setup Instructions

### 1. Installation
Navigate to the project directory and install dependencies using `yarn` (or `npm`):
```bash
cd src/problem5
yarn install
```

### 2. Configuration (`.env`)
Create a `.env` file in `src/problem5/` (mirroring `.env.example` if available). 
Default configuration uses SQLite for zero-config startup:

```env
PORT=3000
DB_CLIENT=sqlite3 # Set to 'mysql2' for MySQL
```

**For MySQL setup:**
1. Create a database in your MySQL server.
2. Uncomment and fill the following in `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_db_name
   ```

### 3. Database Initialization
Run migrations and seeds to prepare your database:

```bash
# Run migrations (create tables)
npx knex migrate:latest --knexfile src/knexfile.ts

# Run seeds (optional - insert sample data)
npx knex seed:run --knexfile src/knexfile.ts
```

---

## 🏃 Running the Application

### Development Mode
Runs the server with `nodemon` for automatic restarts:
```bash
yarn dev
```
Server URL: `http://localhost:3000`

### Production Mode
Builds the project to Javascript and runs the production server:
```bash
yarn build
yarn start
```

---

## 📡 API Documentation

### Base URL: `http://localhost:3000/resources`

| Method | Endpoint | Description | Filters |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Create a new resource | - |
| `GET` | `/` | List resources | `name`, `category`, `status` |
| `GET` | `/:id` | Get resource details | - |
| `PUT` | `/:id` | Update resource | - |
| `DELETE` | `/:id` | Delete resource | - |

### Example Request Payloads

#### **Create Resource** (`POST /resources`)
```json
{
  "name": "Task Management System",
  "description": "API for managing internal tasks",
  "category": "Backend",
  "status": 1
}
```

#### **Filter Resources** (`GET /resources?category=Backend&status=1`)
Returns a list of active backend resources.

#### **Update Resource** (`PUT /resources/1`)
```json
{
  "name": "Updated Task System",
  "status": 0
}
```

### 📮 Postman Collection
A sample Postman collection is included in the root of this problem: `postman_collection.json`. 
You can import this file into Postman to quickly test all endpoints. It includes a `base_url` variable set to `http://localhost:3000`.

---

## 💎 Standardized Response Pattern

All API responses follow a consistent JSON structure to ensure predictable integration for frontend or third-party consumers:

### Success Response (Single Object)
```json
{
  "error": false,
  "message": "Resource fetched successfully",
  "data": { "id": 1, "name": "Sample", ... }
}
```

### Success Response (List with Pagination)
```json
{
  "error": false,
  "message": "Resources listed successfully",
  "data": [
    { "id": 1, "name": "Sample", ... },
    { "id": 2, "name": "Example", ... }
  ],
  "meta": {
    "page": 1,
    "total_item": 50,
    "total_page": 5
  }
}
```

### Error Response
```json
{
  "error": true,
  "message": "Resource not found",
  "data": null
}
```

---

## 🛡️ Error Handling

The application implements a multi-layer error handling strategy to maintain stability and security:

1.  **Global Error Middleware**: A centralized middleware captures all unhandled exceptions (e.g., database connection issues, code crashes) and returns a clean 500 Internal Server Error response.
2.  **Controller-Level Try-Catch**: Each controller method is wrapped in `try-catch` blocks to handle specific runtime errors and provide meaningful debug logs.
3.  **404 Handler**: Unknown API routes are automatically intercepted and returned as a standardized JSON error instead of default HTML pages.

---

## 🏗️ Project Structure
```text
src/
├── config/          # Database connection
├── controllers/     # Request handlers (CRUD logic)
├── db/              # Migrations and Seeds
├── routes/          # API Route definitions
├── index.ts         # App entry point
└── knexfile.ts      # Knex configuration
```
