@echo off
REM Windows batch script to start both server and client in development mode

REM Set development environment
set NODE_ENV=development

REM Start server in development mode
start "server-dev" cmd /k "cd server && npm run dev"

REM Wait a moment for server to start
timeout /t 3 /nobreak > nul

REM Start client in development mode
start "client-dev" cmd /k "cd client && npm run dev"

echo Development environment started!
echo Server running on port 3000
echo Client available at http://localhost:5173 