import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './config/database.js';
import userRoutes from './routes/userRouters.js';

dotenv.config();

const app = express();

// Fix: Ensure PORT is a number
const PORT = parseInt(process.env.PORT || '3000', 10);

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:5173', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`🌐 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: PORT
  });
});

// API root endpoint with all available routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Registration API - Complete CRUD',
    version: '2.0.0',
    endpoints: {
      'POST /api/register': 'Register a new user',
      'GET /api/users': 'Get all users',
      'GET /api/users/:id': 'Get user by ID',
      'PUT /api/users/:id': 'Update user by ID',
      'DELETE /api/users/:id': 'Delete user by ID'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('💥 Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler - should be last
app.use('*', (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Start server - Fixed: PORT is now a number
const startServer = async (): Promise<void> => {
  try {
    await initDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Local: http://localhost:${PORT}`);
      console.log(`🌐 Network: http://0.0.0.0:${PORT}`);
      console.log(`❤️  Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api`);
      console.log(`\n📋 AVAILABLE ENDPOINTS:`);
      console.log(`   POST   /api/register     - Register new user`);
      console.log(`   GET    /api/users        - Get all users`);
      console.log(`   GET    /api/users/:id    - Get user by ID`);
      console.log(`   PUT    /api/users/:id    - Update user by ID`);
      console.log(`   DELETE /api/users/:id    - Delete user by ID`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();