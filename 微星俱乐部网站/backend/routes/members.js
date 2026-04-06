const express = require('express');
const router = express.Router();

let members = [
    {
        id: 1,
        username: 'zhangsan',
        email: 'zhangsan@example.com',
        phone: '13800138001',
        level: 'gold',
        points: 6800,
        activitiesCount: 28,
        joinDate: '2024-01-15',
        avatar: 'images/member-1.jpg'
    },
    {
        id: 2,
        username: 'lisi',
        email: 'lisi@example.com',
        phone: '13800138002',
        level: 'diamond',
        points: 12500,
        activitiesCount: 45,
        joinDate: '2023-06-20',
        avatar: 'images/member-2.jpg'
    },
    {
        id: 3,
        username: 'wangwu',
        email: 'wangwu@example.com',
        phone: '13800138003',
        level: 'silver',
        points: 3200,
        activitiesCount: 15,
        joinDate: '2025-02-10',
        avatar: 'images/member-3.jpg'
    }
];

let gifts = [
    { id: 1, name: '微星定制鼠标垫', points: 500, stock: 100 },
    { id: 2, name: '微星定制T恤', points: 1000, stock: 50 },
    { id: 3, name: '微星游戏键盘', points: 3000, stock: 20 },
    { id: 4, name: '微星游戏鼠标', points: 2500, stock: 30 }
];

router.post('/register', (req, res) => {
    const { username, email, password, phone } = req.body;
    
    if (!username || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: '请填写完整的注册信息'
        });
    }
    
    const existingMember = members.find(m => m.email === email || m.username === username);
    if (existingMember) {
        return res.status(400).json({
            success: false,
            message: '用户名或邮箱已被注册'
        });
    }
    
    const newMember = {
        id: members.length + 1,
        username,
        email,
        phone,
        level: 'bronze',
        points: 100,
        activitiesCount: 0,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: 'images/default-avatar.jpg'
    };
    
    members.push(newMember);
    
    res.status(201).json({
        success: true,
        message: '注册成功',
        token: 'mock-jwt-token-' + newMember.id,
        user: {
            id: newMember.id,
            username: newMember.username,
            email: newMember.email,
            level: newMember.level,
            points: newMember.points
        }
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    const member = members.find(m => m.email === email);
    
    if (!member) {
        return res.status(401).json({
            success: false,
            message: '邮箱或密码错误'
        });
    }
    
    res.json({
        success: true,
        message: '登录成功',
        token: 'mock-jwt-token-' + member.id,
        user: {
            id: member.id,
            username: member.username,
            email: member.email,
            level: member.level,
            points: member.points
        }
    });
});

router.get('/profile', (req, res) => {
    const userId = 1;
    const member = members.find(m => m.id === userId);
    
    if (!member) {
        return res.status(404).json({
            success: false,
            message: '用户不存在'
        });
    }
    
    res.json({
        success: true,
        data: member
    });
});

router.get('/points', (req, res) => {
    res.json({
        success: true,
        data: {
            ways: [
                { action: '注册会员', points: 100 },
                { action: '完善资料', points: 50 },
                { action: '参与活动', points: '50-200' },
                { action: '发表帖子', points: 10 },
                { action: '获得点赞', points: 2 },
                { action: '购买产品', points: '消费金额的1%' }
            ]
        }
    });
});

router.get('/gifts', (req, res) => {
    res.json({
        success: true,
        data: gifts
    });
});

router.post('/exchange/:giftId', (req, res) => {
    const giftId = parseInt(req.params.giftId);
    const gift = gifts.find(g => g.id === giftId);
    
    if (!gift) {
        return res.status(404).json({
            success: false,
            message: '礼品不存在'
        });
    }
    
    if (gift.stock <= 0) {
        return res.status(400).json({
            success: false,
            message: '该礼品库存不足'
        });
    }
    
    const userId = 1;
    const member = members.find(m => m.id === userId);
    
    if (member.points < gift.points) {
        return res.status(400).json({
            success: false,
            message: '积分不足',
            required: gift.points,
            current: member.points
        });
    }
    
    member.points -= gift.points;
    gift.stock--;
    
    res.json({
        success: true,
        message: '兑换成功',
        data: {
            giftName: gift.name,
            pointsSpent: gift.points,
            remainingPoints: member.points
        }
    });
});

router.get('/showcase', (req, res) => {
    const showcaseMembers = members.slice(0, 3).map(m => ({
        id: m.id,
        username: m.username,
        level: m.level,
        points: m.points,
        activitiesCount: m.activitiesCount,
        avatar: m.avatar
    }));
    
    res.json({
        success: true,
        data: showcaseMembers
    });
});

module.exports = router;
