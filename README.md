# Padlupp Landing Page

This is the frontend application for the Padlupp waitlist landing page, built with React.js and Vite.

## Project Structure

```
.
├── client/          # React.js frontend
└── package.json     # Root configuration
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

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

## Development

To run the client in development mode:

```bash
npm run dev:client
```
Or navigate to the client folder and run:
```bash
cd client
npm run dev
```

The application will be available at http://localhost:5173

## Production Build

To create a production build of the frontend:

```bash
npm run build
```

The built files will be located in `client/dist`.

## Technologies Used

- **Frontend Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
