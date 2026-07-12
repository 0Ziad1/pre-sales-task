# Pre-Sales Requirements

## Project Description

Pre-Sales Requirements is a RESTful API built to manage pre-sales opportunities and their related requirements.

The system allows users to:

- Create, update, retrieve, and delete opportunities.
- Add or update requirements text for an opportunity.
- Upload and manage requirement files.
- Enforce business rules before an opportunity can be marked as ready for analysis.
- Automatically remove related requirements and files when deleting an opportunity.

---

## Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MongoDB

### Validation
- Zod

### File Upload
- Multer

### Development Tools
- Nodemon
- ts-node
- dotenv

---

## Project Structure

```bash
src/
│
├── config/
├── model/
├── module/
│   ├── Opportunity/
│   ├── Requirements/
│   └── RequirementFile/
│
├── utils/
│   ├── middleware/
│   ├── interfaces/
│   └── enum/
│
├── app.controller.ts
└── index.ts
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd pre-sales-requirements
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Example:

```env
PORT=3000
DB_URL=mongodb://127.0.0.1:27017/pre-sales-requirements
```

Adjust the MongoDB connection string according to your environment.

---

## How To Run The Project

Development mode:

```bash
npm run start:dev
```

The server will start on:

```bash
http://localhost:3000
```

---

## Main Features

### Opportunities
- Create Opportunity
- Get All Opportunities
- Get Opportunity By ID
- Update Opportunity
- Delete Opportunity

### Requirements
- Add / Update Requirements Text
- Get Requirements
- Delete Requirements

### Requirement Files
- Upload Requirement Files
- Get Files For Opportunity
- Delete File

---

## Business Rules Implemented

### 1. Opportunity Status Validation

An opportunity cannot be marked as:

```text
ready-for-analysis
```

unless it contains at least one of the following:

- Requirements text
- Uploaded requirement file

Otherwise the API returns:

```json
{
  "message": "Opportunity cannot be marked as ready for analysis before adding requirements text or uploading files"
}
```

---

### 2. File Upload Restrictions

Allowed file types:

- pdf
- docx
- txt

Maximum file size:

```text
5 MB
```

Errors returned:

```json
{
  "message": "File type is not allowed"
}
```

```json
{
  "message": "File size must not exceed 5 MB"
}
```

---

### 3. Cascading Deletes

When deleting an opportunity:

- Related requirements text is deleted.
- Related uploaded file records are deleted.
- Physical files inside the `uploads` folder are also removed.

---

## Validation

Request validation is implemented using **Zod**.

The API validates:

- Request body
- Route parameters
- Query parameters
- Uploaded file metadata

Validation errors are returned in the following format:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title must be at least 3 characters"
    }
  ]
}
```

---

## Important Notes

- The `uploads` folder is automatically created if it does not exist.
- MongoDB ObjectIds are validated before database operations.
- File cleanup is handled to avoid orphan files.
- Mongoose validators are executed on updates using:

```ts
runValidators: true
```

- Unknown fields are rejected using Zod `.strict()` schemas where applicable.

---

## Author

Developed as part of the **Pre-Sales Requirements Task**.