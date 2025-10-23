import express from 'express';
import Waitlist from '../models/Waitlist.js';

const router = express.Router();

router.post('/join', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email already exists
    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create new waitlist entry
    const waitlistEntry = new Waitlist({ email });
    await waitlistEntry.save();

    res.status(201).json({
      message: 'Successfully joined the waitlist',
      data: {
        email: waitlistEntry.email,
        createdAt: waitlistEntry.createdAt
      }
    });
  } catch (error) {
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
  } catch (error) {
    console.error('Waitlist count error:', error);
    res.status(500).json({ 
      error: 'Failed to get waitlist count',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/csv', async (req, res) => {
  try {
    // Get all waitlist entries with email and createdAt
    const waitlistEntries = await Waitlist.find({}, 'email createdAt').sort({ createdAt: 1 });
    
    // Create CSV content
    const csvHeader = 'Email,Date Created\n';
    const csvRows = waitlistEntries.map(entry => {
      const date = new Date(entry.createdAt).toISOString().split('T')[0]; // Format as YYYY-MM-DD
      return `"${entry.email}","${date}"`;
    }).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="waitlist-users.csv"');
    res.setHeader('Content-Length', Buffer.byteLength(csvContent, 'utf8'));
    
    res.send(csvContent);
  } catch (error) {
    console.error('CSV download error:', error);
    res.status(500).json({ 
      error: 'Failed to generate CSV',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 