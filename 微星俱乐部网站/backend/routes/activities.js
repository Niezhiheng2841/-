const express = require('express');
const router = express.Router();

let activities = [
    {
        id: 1,
        title: '2026春季电竞大赛',
        type: 'competition',
        status: 'ongoing',
        location: 'online',
        locationName: '线上',
        startDate: '2026-04-01',
        endDate: '2026-04-30',
        description: '俱乐部年度电竞赛事火热进行中，丰厚奖品等你来拿！',
        participants: 256,
        quota: 500,
        image: 'images/activity-1.jpg'
    },
    {
        id: 2,
        title: '微星新品体验会 - 北京站',
        type: 'experience',
        status: 'upcoming',
        location: 'beijing',
        locationName: '北京市朝阳区xxx大厦',
        startDate: '2026-04-15',
        startTime: '14:00',
        description: '抢先体验微星最新发布的游戏本和显卡产品',
        participants: 45,
        quota: 100,
        image: 'images/activity-2.jpg'
    },
    {
        id: 3,
        title: '硬件超频技术分享会',
        type: 'online',
        status: 'upcoming',
        location: 'online',
        locationName: '线上直播',
        startDate: '2026-04-20',
        startTime: '19:00',
        description: '资深硬件玩家分享超频技巧和经验',
        participants: 128,
        quota: null,
        image: 'images/activity-3.jpg'
    }
];

router.get('/', (req, res) => {
    const { status, type, location } = req.query;
    
    let filteredActivities = [...activities];
    
    if (status && status !== 'all') {
        filteredActivities = filteredActivities.filter(a => a.status === status);
    }
    
    if (type && type !== 'all') {
        filteredActivities = filteredActivities.filter(a => a.type === type);
    }
    
    if (location && location !== 'all') {
        filteredActivities = filteredActivities.filter(a => a.location === location);
    }
    
    res.json({
        success: true,
        data: filteredActivities,
        total: filteredActivities.length
    });
});

router.get('/:id', (req, res) => {
    const activityId = parseInt(req.params.id);
    const activity = activities.find(a => a.id === activityId);
    
    if (!activity) {
        return res.status(404).json({
            success: false,
            message: '活动不存在'
        });
    }
    
    res.json({
        success: true,
        data: activity
    });
});

router.post('/:id/register', (req, res) => {
    const activityId = parseInt(req.params.id);
    const activity = activities.find(a => a.id === activityId);
    
    if (!activity) {
        return res.status(404).json({
            success: false,
            message: '活动不存在'
        });
    }
    
    if (activity.status === 'ended') {
        return res.status(400).json({
            success: false,
            message: '该活动已结束'
        });
    }
    
    if (activity.quota && activity.participants >= activity.quota) {
        return res.status(400).json({
            success: false,
            message: '该活动名额已满'
        });
    }
    
    activity.participants++;
    
    res.json({
        success: true,
        message: '报名成功',
        data: {
            activityId: activity.id,
            participants: activity.participants
        }
    });
});

router.post('/', (req, res) => {
    const newActivity = {
        id: activities.length + 1,
        ...req.body,
        participants: 0,
        createdAt: new Date().toISOString()
    };
    
    activities.push(newActivity);
    
    res.status(201).json({
        success: true,
        message: '活动创建成功',
        data: newActivity
    });
});

router.put('/:id', (req, res) => {
    const activityId = parseInt(req.params.id);
    const activityIndex = activities.findIndex(a => a.id === activityId);
    
    if (activityIndex === -1) {
        return res.status(404).json({
            success: false,
            message: '活动不存在'
        });
    }
    
    activities[activityIndex] = {
        ...activities[activityIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    
    res.json({
        success: true,
        message: '活动更新成功',
        data: activities[activityIndex]
    });
});

router.delete('/:id', (req, res) => {
    const activityId = parseInt(req.params.id);
    const activityIndex = activities.findIndex(a => a.id === activityId);
    
    if (activityIndex === -1) {
        return res.status(404).json({
            success: false,
            message: '活动不存在'
        });
    }
    
    activities.splice(activityIndex, 1);
    
    res.json({
        success: true,
        message: '活动删除成功'
    });
});

module.exports = router;
