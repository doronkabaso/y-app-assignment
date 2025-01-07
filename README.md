# Y-Project

A full-stack application combining a modern React-based client-side interface with a robust Node.js backend. This project is designed to deliver seamless performance and user-friendly interactions.

## Features

### Client-Side Features
- **React & TypeScript:** Combines the best of React's declarative UI and TypeScript's type safety.
- **Modern Tooling:** Configured with Webpack for bundling and efficient development workflows.
- **UI Enhancements:** Styled using Material UI components and Emotion for dynamic styling.
- **Notifications:** Real-time updates via React Toastify.
- **Data Fetching:** Uses Axios for streamlined REST API interactions.

### Backend Features
- **REST API:** Provides a structured way to interact with client applications.
- **Database Integration:** Uses MongoDB with Mongoose for data modeling and management.
- **File Uploads:** Handles file uploads efficiently using Multer.
- **Task Scheduling:** Supports scheduled tasks using Node-Cron.
- **Modular Structure:** Follows a clear and maintainable architecture with TypeScript.

## Tech Stack

**Client:** React, TypeScript, Material UI, Emotion  
**Server:** Node.js, Express, TypeScript  
**Database:** MongoDB with Mongoose  
**Utilities:** Axios, React Toastify, Multer, Node-Cron  
**Build Tools:** Webpack, Babel, ts-loader  
**Testing:** Jest, ts-jest  

## Project Structure

### Client
- **`src/`**: Contains the main application code for the frontend.  
- **`dist/`**: Output directory for the bundled application.  
- **`tsconfig.json`**: TypeScript configuration for strict and modular code.  
- **`webpack.config.js`**: Webpack configuration for development and production builds.

### Backend
- **`src/`**: Contains the TypeScript source code for the backend.  
- **`dist/`**: Compiled JavaScript files ready for production.  
- **`jest.config.ts`**: Configuration file for running tests using Jest.  
- **`tsconfig.json`**: TypeScript configuration file for type safety and modular code.

## Development Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- MongoDB (local or hosted instance)

### Steps to Run Locally

1. Clone the repositories:

   ```bash
   git clone https://github.com/your-username/y-client.git](https://github.com/doronkabaso/y-app-assignment.git
   ```

2. Install dependencies for both client and backend:

   ```bash
   # For client
   cd y-client
   npm install

   # For backend
   cd ../y-backend
   npm install
   ```

3. Start the development servers:

   ```bash
   # For client
   cd y-client
   npm start

   # For backend
   cd ../y-backend
   npm run dev
   ```

   Access the client application at `http://localhost:3000` and ensure the backend is running.

4. Build for production:

   ```bash
   # For client
   cd y-client
   npm run build

   # For backend
   cd ../y-backend
   npm run build
   ```

5. Start the production servers:

   ```bash
   # For backend
   cd y-backend
   npm start
   ```

6. Run tests for the backend:

   ```bash
   npm test
   ```

## Deployment

To deploy this project, ensure the compiled frontend files in `y-client/dist/` are served using a static file server. Deploy the backend from `y-backend/dist/` to a Node.js-compatible hosting service with a configured MongoDB connection.

## Feedback

For suggestions or feedback, please reach out at `doronkabaso@gmail.com`.

## Lessons Learned

This project demonstrated the power of combining modern frontend technologies with a robust backend architecture. Key takeaways include:
- Efficient type safety and error handling with TypeScript.
- Modular and scalable design for both frontend and backend.
- Seamless integration of REST APIs and database management.
- Enhanced workflows with task scheduling and file management.

