const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: '欢迎来到中国微星俱乐部API',
        version: '1.0.0',
        endpoints: {
            activities: '/api/activities',
            members: '/api/members',
            contact: '/api/contact'
        }
    });
});

router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
