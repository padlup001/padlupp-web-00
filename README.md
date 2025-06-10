# Full-Stack Application

This is a full-stack application with a React.js frontend and Express.js backend.

## Project Structure

```
.
├── client/          # React.js frontend
├── server/          # Express.js backend
└── package.json     # Root package.json for managing workspaces
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (v4.4 or higher)

## Environment Setup

1. Create environment files in the server directory:

```bash
# server/.env.development
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/your_dev_database
JWT_SECRET=dev-secret-key
CLIENT_URL=http://localhost:5173

# server/.env.production
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your_prod_database
JWT_SECRET=your-production-secret
CLIENT_URL=https://your-production-url
```

## Installation

1. Install root dependencies:
```bash
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
```

3. Install server dependencies:
```bash
cd server
npm install
```

## Development

To run both client and server in development mode:

```bash
npm run dev
```

This will start:
- Client at http://localhost:5173
- Server at http://localhost:3000

Make sure MongoDB is running locally for development mode.

## Production Build

To create a production build:

```bash
npm run build
```

## Starting in Production

To start the application in production mode:

```bash
npm start
```

## MongoDB Setup

### Development
1. Install MongoDB locally
2. Start MongoDB service
3. The application will connect to `mongodb://localhost:27017/your_dev_database`

### Production
1. Create a MongoDB Atlas account (or use any other MongoDB provider)
2. Create a new cluster
3. Get your connection string
4. Replace the MONGODB_URI in `.env.production` with your connection string

## Technologies Used

- Frontend:
  - React.js with TypeScript
  - Vite
  - Tailwind CSS
- Backend:
  - Express.js with TypeScript
  - Node.js
  - MongoDB with Mongoose
- Development:
  - Concurrently for running multiple commands
  - Environment-specific configurations
