# Problem 5: Crude Server

A basic backend server built with **ExpressJS** and **TypeScript**, providing a CRUD interface for managing resources.

## Features
- Create a resource.
- List resources with basic filters (name, category, status).
- Get details of a single resource.
- Update resource details.
- Delete a resource.
- Persistent data storage using **SQLite3** and **Knex**.

## Configuration

1. Create/Update a `.env` file in the root of `src/problem5`:
   ```bash
   DB_CLIENT=sqlite3 # or mysql2
   ```

2. If using MySQL:
   - Ensure the database exists.
   - Fill in `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in `.env`.

## Database Migrations & Seeds

This project uses **Knex** for database management.

- **Run Migrations:**
  ```bash
  npx knex migrate:latest --knexfile src/knexfile.ts
  ```
- **Run Seeds:**
  ```bash
  npx knex seed:run --knexfile src/knexfile.ts
  ```

## Running the Application

### Development Mode (with hot-reload)
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### Production Mode
1. Build the TypeScript files:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description | Query Params (Filter) |
| :--- | :--- | :--- | :--- |
| `POST` | `/resources` | Create a new resource | N/A |
| `GET` | `/resources` | List all resources | `name`, `category`, `status` |
| `GET` | `/resources/:id` | Get details of a resource | N/A |
| `PUT` | `/resources/:id` | Update resource details | N/A |
| `DELETE` | `/resources/:id` | Delete a resource | N/A |

### Example Create Request Body
```json
{
  "name": "Project Alpha",
  "description": "A secret project",
  "category": "High-Priority",
  "status": 1
}
```
