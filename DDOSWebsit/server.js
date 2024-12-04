const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const port = 3000;  // You can change this to any available port

// Default rate limit settings (30 requests per minute for demonstration)
let limiter = rateLimit({
    windowMs: 10 * 1000,  // 10 seconds window for demonstration
    max: 30,  // limit each IP to 30 requests per window
    handler: (req, res) => {
        rejectedRequests++; 
        console.log(`Request blocked. Total rejections: ${rejectedRequests}`);

        // Notify connected frontend
        io.emit('update', { rejectedRequests });

        res.status(429).json({
            message: 'Too many requests, please try again later.',
            rejectedRequests,
        });
    },
});


// Serve static files from the current directory
app.use(express.static(path.join(__dirname, 'HTML')));
console.log('Serving static files from the "HTML" directory');

// Middleware to handle rate limiting
let rateLimitingEnabled = false;
let rejectedRequests = 0;  // Track rejected requests

// Endpoint to toggle rate limiting on or off
app.post('/toggle-rate-limit', (req, res) => {
    rateLimitingEnabled = !rateLimitingEnabled;
    console.log(`Rate Limiting is now ${rateLimitingEnabled ? 'enabled' : 'disabled'}`);
    res.send({ rateLimitingEnabled });
});

// Endpoint to toggle the attack
let isAttacking = false;
app.post('/toggle-attack', (req, res) => {
    isAttacking = !isAttacking;  // Toggle the attack state
    console.log('Attack state:', isAttacking ? 'ON' : 'OFF');
    res.json({ attackInProgress: isAttacking });
});


// Apply rate limiting if enabled
app.use((req, res, next) => {
    if (rateLimitingEnabled) {
        return limiter(req, res, next);
    }
    next();
});

// Example route to simulate packet count
app.get('/packet_count', (req, res) => {
    console.log('Packet count request received');
    if (!isAttacking) {
        return res.json({ count: 0, rejected: false });
    }

    const packetCount = Math.floor(Math.random() * 100);
    const rejected = rateLimitingEnabled && packetCount > 30;
    console.log(`Simulating attack. Packet count: ${packetCount}, Rejected: ${rejected}`);
    res.json({ count: packetCount, rejected });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});