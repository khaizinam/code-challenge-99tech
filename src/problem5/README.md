# Problem 5: Crude Server

A basic backend server built with **ExpressJS** and **TypeScript**, providing a CRUD interface for managing resources.

## Features
- Create a resource.
- List resources with basic filters (name, category, status).
- Get details of a single resource.
- Update resource details.
- Delete a resource.
- Persistent data storage using **SQLite3** and **Knex**.

## Prerequisites
- Node.js (v16+)
- npm or yarn

## Installation

1. Navigate to the project directory:
   ```bash
   cd src/problem5
   ```

2. Install dependencies:
   ```bash
   npm install
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
