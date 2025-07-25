@echo off
REM Windows batch script to start both server and client in production mode

REM Set production environment
set NODE_ENV=production

REM Build both client and server
call npm run build --workspace=client
call npm run build --workspace=server

REM Start server on port 4173
start "server" cmd /k "cd server && npm start"

REM Wait a moment for server to start
timeout /t 3 /nobreak > nul

REM Serve client build (using vite preview)
start "client" cmd /k "cd client && npm run preview"

echo Production environment started!
echo Server running on port 4173
echo Client preview available at http://localhost:4173
