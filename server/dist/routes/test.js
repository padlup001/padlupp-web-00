import express from 'express';
import User from '../models/User.js';
const router = express.Router();
router.post('/test-db', async (req, res) => {
    try {
        const testUser = new User({
            username: `test_user_${Date.now()}`,
            email: `test${Date.now()}@example.com`,
        });
        await testUser.save();
        res.json({
            message: 'Test user created successfully',
            user: testUser
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Database test failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
export default router;
