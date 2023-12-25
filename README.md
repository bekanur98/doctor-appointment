# Node.js Backend for making an appointment with a doctor

This project is a simple Node.js backend for organizing doctor appointments with a reminder function.

## Main functions
- API for booking users appointments with doctors.
- Managing lists of users and doctors.
- Automatic reminder 1 day and 2 hours before your appointment.

## Technologies
- Node.js and Express for the server side.
- MySQL for the database.
- Knex.js for managing migrations and seed files.
- node-cron for scheduling notifications.

---
# Getting start
Follow these steps to get started with your project.

## 1. Setup
### 1.1 Clone the repository
```bash 
git clone git@github.com:bekanur98/doctor-appointment.git
``` 

### 1.2 Install dependencies
```bash
npm install
```

## 2. Configuration
### 2.1 Set up environment
Set up environment variables in the .env file with your database connection settings.


## 3. Launch
### 3.1 Run migrations to configure the database
```bash
npm run migrate:latest
```
### 3.2 Fill the database with initial data
```bash
npm run prefill
```
## 4. Start the server:
```bash
npm run start
```
---
## API Endpoints
- GET /api/schedules - Get list of schedules.
- POST /api/schedule - Add an appointment with a doctor.
- GET /api/doctors - Get list of doctors.
- POST /api/doctors - Add a doctor.
- GET /api/users - Get list of users.