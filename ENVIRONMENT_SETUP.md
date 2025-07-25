# Environment Configuration

This project uses environment-specific configuration files for both client and server.

## Environment Files

### Server Environment Files
- `server/env.development` - Development environment (PORT: 3000)
- `server/env.production` - Production environment (PORT: 4173)

### Client Environment Files  
- `client/env.development` - Development environment
- `client/env.production` - Production environment

## Development Setup

1. **Start Development Environment:**
   ```bash
   # Windows
   start-dev.bat
   
   # Manual
   cd server && npm run dev
   cd client && npm run dev
   ```

2. **Development Ports:**
   - Server: http://localhost:3000
   - Client: http://localhost:5173

## Production Setup

1. **Start Production Environment:**
   ```bash
   # Windows
   start-prod.bat
   
   # Manual
   npm run build --workspace=client
   npm run build --workspace=server
   cd server && npm start
   cd client && npm run preview
   ```

2. **Production Ports:**
   - Server: http://localhost:4173
   - Client: http://localhost:4173

## Environment Variables

### Server Variables
- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (3000 for dev, 4173 for prod)
- `CLIENT_URL` - Client URL for CORS
- `MONGODB_URI` - MongoDB connection string

### Client Variables
- `VITE_API_URL` - API server URL
- `VITE_NODE_ENV` - Environment mode

## Notes

- The server automatically loads the correct environment file based on `NODE_ENV`
- The client uses Vite's environment loading system
- Production builds are optimized and served from the built files
- Development mode includes hot reloading and debugging features 