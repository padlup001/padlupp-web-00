import express from 'express';
import Waitlist from '../models/Waitlist.js';
const router = express.Router();
router.post('/join', async (req, res) => {
    try {
        const { name, age, sex, email, country } = req.body;
        if (!name || !email || !country || typeof age === 'undefined' || !sex) {
            return res.status(400).json({ error: 'All fields (name, age, sex, email, country) are required' });
        }
        const parsedAge = Number(age);
        if (Number.isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
            return res.status(400).json({ error: 'Age must be a valid number between 0 and 120' });
        }
        const sexValue = String(sex).toLowerCase();
        const allowedSex = ['male', 'female', 'other', 'prefer_not_to_say'];
        if (!allowedSex.includes(sexValue)) {
            return res.status(400).json({ error: `Sex must be one of: ${allowedSex.join(', ')}` });
        }
        // Check if email already exists
        const existingEntry = await Waitlist.findOne({ email });
        if (existingEntry) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        // Create new waitlist entry
        const waitlistEntry = new Waitlist({ name, age: parsedAge, sex: sexValue, email, country });
        await waitlistEntry.save();
        res.status(201).json({
            message: 'Successfully joined the waitlist',
            data: {
                name: waitlistEntry.name,
                age: waitlistEntry.age,
                sex: waitlistEntry.sex,
                email: waitlistEntry.email,
                country: waitlistEntry.country,
                createdAt: waitlistEntry.createdAt
            }
        });
    }
    catch (error) {
        console.error('Waitlist join error:', error);
        res.status(500).json({
            error: 'Failed to join waitlist',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
router.get('/count', async (req, res) => {
    try {
        const count = await Waitlist.countDocuments();
        res.json({ count });
    }
    catch (error) {
        console.error('Waitlist count error:', error);
        res.status(500).json({
            error: 'Failed to get waitlist count',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
router.get('/csv', async (req, res) => {
    try {
        // Get all waitlist entries with selected fields
        const waitlistEntries = await Waitlist.find({}, 'name age sex email country createdAt').sort({ createdAt: 1 });
        // Create CSV content
        const csvHeader = 'Name,Age,Sex,Email,Country,Date Created\n';
        const csvRows = waitlistEntries.map(entry => {
            const date = new Date(entry.createdAt).toISOString().split('T')[0];
            return `"${entry.name}","${entry.age}","${entry.sex}","${entry.email}","${entry.country}","${date}"`;
        }).join('\n');
        const csvContent = csvHeader + csvRows;
        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="waitlist-users.csv"');
        res.setHeader('Content-Length', Buffer.byteLength(csvContent, 'utf8'));
        res.send(csvContent);
    }
    catch (error) {
        console.error('CSV download error:', error);
        res.status(500).json({
            error: 'Failed to generate CSV',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
export default router;
