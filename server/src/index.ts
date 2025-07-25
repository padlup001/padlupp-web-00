import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import connectDB from './config/database.js';
import mongoose from 'mongoose';
import waitlistRoutes from './routes/waitlist.js';

// Load environment variables based on NODE_ENV
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({
  path: path.resolve(__dirname, `../env.${process.env.NODE_ENV || 'development'}`)
});

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/waitlist', waitlistRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
}); 