
# Amazon Dataset Analysis

This project is a full-stack web application designed to analyze and visualize insights from an Amazon appliance dataset. Utilizing modern technologies including Node.js with TypeScript for the backend, and React with TypeScript using Vite, Redux, Axios, and Tailwind CSS for the frontend, it offers a dynamic and responsive user interface for data exploration. The backend is containerized with Docker, facilitating easy setup and scalability, and uses MySQL for data storage with Prisma for ORM, and phpMyAdmin for database management.

## Features

- Comprehensive analysis and visualization of Amazon appliance data.
- Interactive frontend developed with React, Redux, and Tailwind CSS.
- RESTful API services powered by Node.js and TypeScript.
- Containerized backend services for easy deployment and management.
- Integrated MySQL database with Prisma ORM for efficient data handling.
- phpMyAdmin for convenient database monitoring.
- Usage for middleware using JWT for user authentication

## Prerequisites

Before you get started, make sure you have the following installed:
- Node.js version 20
- Docker and Docker Compose
- Node Version Manager (NVM)

## Setup Instructions

### Frontend

To set up and run the frontend application:

1. Switch to the correct Node.js version:
   ```bash
   nvm use 20

2. Install the necessary packages:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

### Backend

To setup the backend application: 

1. start the docker containers:
   ```bash
   docker compose up

2. After the containers are running, exec into the Node.js backend container:
     ```bash
      docker exec -it <node_backend_container_id> bash

3. Apply database migrations with Prisma:
   ```bash
   npx prisma migrate dev --name init

4. Seed the database:
   ```bash
   npx prisma db seed

### Accessing the Application

- The frontend application is accessible at http://localhost:5173 (or another port if configured differently).
- phpMyAdmin can be accessed at http://localhost:8080 for database management.
- Backend is configured at http://localhost:3000

### API Documentation

For detailed API documentation and testing, refer to the included Postman collection. Import it into Postman to explore the available endpoints and their functionalities.




