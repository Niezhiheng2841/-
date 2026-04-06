const express = require('express');
const router = express.Router();

let messages = [];

router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: '请填写完整的联系信息'
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: '请输入有效的邮箱地址'
        });
    }
    
    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        subject,
        message,
        status: 'unread',
        createdAt: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    console.log('收到新的联系消息:', newMessage);
    
    res.status(201).json({
        success: true,
        message: '消息发送成功！我们会尽快回复您。',
        data: {
            id: newMessage.id,
            createdAt: newMessage.createdAt
        }
    });
});

router.get('/', (req, res) => {
    res.json({
        success: true,
        data: messages,
        total: messages.length
    });
});

router.get('/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    const message = messages.find(m => m.id === messageId);
    
    if (!message) {
        return res.status(404).json({
            success: false,
            message: '消息不存在'
        });
    }
    
    res.json({
        success: true,
        data: message
    });
});

router.put('/:id/read', (req, res) => {
    const messageId = parseInt(req.params.id);
    const message = messages.find(m => m.id === messageId);
    
    if (!message) {
        return res.status(404).json({
            success: false,
            message: '消息不存在'
        });
    }
    
    message.status = 'read';
    message.readAt = new Date().toISOString();
    
    res.json({
        success: true,
        message: '消息已标记为已读',
        data: message
    });
});

router.delete('/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    const messageIndex = messages.findIndex(m => m.id === messageId);
    
    if (messageIndex === -1) {
        return res.status(404).json({
            success: false,
            message: '消息不存在'
        });
    }
    
    messages.splice(messageIndex, 1);
    
    res.json({
        success: true,
        message: '消息删除成功'
    });
});

module.exports = router;
