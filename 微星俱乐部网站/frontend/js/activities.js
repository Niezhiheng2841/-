document.addEventListener('DOMContentLoaded', function() {
    initActivityFilters();
    initActivityCalendar();
    initLoadMore();
});

function initActivityFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const filterSelects = document.querySelectorAll('.filter-select');
    const activityCards = document.querySelectorAll('.activity-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterActivities();
        });
    });

    filterSelects.forEach(select => {
        select.addEventListener('change', filterActivities);
    });

    function filterActivities() {
        const statusFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
        const typeFilter = document.getElementById('activityType').value;
        const locationFilter = document.getElementById('activityLocation').value;

        activityCards.forEach(card => {
            const cardStatus = card.getAttribute('data-status');
            const cardType = card.getAttribute('data-type');
            const cardLocation = card.getAttribute('data-location');

            const statusMatch = statusFilter === 'all' || cardStatus === statusFilter;
            const typeMatch = typeFilter === 'all' || cardType === typeFilter;
            const locationMatch = locationFilter === 'all' || cardLocation === locationFilter;

            if (statusMatch && typeMatch && locationMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function initActivityCalendar() {
    const calendarNav = document.querySelectorAll('.calendar-nav');
    const calendarMonth = document.querySelector('.calendar-month');
    const calendarDays = document.querySelector('.calendar-days');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = ['一月', '二月', '三月', '四月', '五月', '六月', 
                    '七月', '八月', '九月', '十月', '十一月', '十二月'];

    function renderCalendar() {
        calendarMonth.textContent = `${currentYear}年${months[currentMonth]}`;
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        calendarDays.innerHTML = '';
        
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }
        
        const events = getEvents(currentYear, currentMonth);
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            if (events.includes(day)) {
                dayElement.classList.add('has-event');
            }
            
            dayElement.addEventListener('click', function() {
                showDayEvents(currentYear, currentMonth, day);
            });
            
            calendarDays.appendChild(dayElement);
        }
    }

    calendarNav.forEach(nav => {
        nav.addEventListener('click', function() {
            if (this.classList.contains('prev')) {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
            } else {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
            }
            renderCalendar();
        });
    });

    renderCalendar();
}

function getEvents(year, month) {
    const events = {
        2026: {
            3: [5, 15, 20],
            4: [10, 18, 25],
            5: [8, 16, 22]
        }
    };
    
    return events[year] && events[year][month] ? events[year][month] : [];
}

function showDayEvents(year, month, day) {
    const events = [
        { date: '2026-04-05', title: '上海会员线下聚会', time: '14:00' },
        { date: '2026-04-15', title: '微星新品体验会 - 北京站', time: '14:00' },
        { date: '2026-04-20', title: '硬件超频技术分享会', time: '19:00' }
    ];
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date === dateStr);
    
    if (dayEvents.length > 0) {
        let message = `${year}年${month + 1}月${day}日的活动：\n`;
        dayEvents.forEach(event => {
            message += `- ${event.title} (${event.time})\n`;
        });
        alert(message);
    } else {
        alert(`${year}年${month + 1}月${day}日暂无活动安排`);
    }
}

function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more .btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = '加载中...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('已加载所有活动', 'success');
                this.textContent = '没有更多活动了';
                this.disabled = true;
            }, 1000);
        });
    }
}

function initActivityRegistration() {
    const registerButtons = document.querySelectorAll('.activity-actions .btn-primary');
    
    registerButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.activity-card');
            const title = card.querySelector('.activity-title').textContent;
            
            const isLoggedIn = checkLoginStatus();
            
            if (!isLoggedIn) {
                showNotification('请先登录后再报名活动', 'error');
                setTimeout(() => {
                    window.location.href = '#login';
                }, 1500);
                return;
            }
            
            registerForActivity(title);
        });
    });
}

function checkLoginStatus() {
    return localStorage.getItem('userToken') !== null;
}

function registerForActivity(activityTitle) {
    console.log('报名活动:', activityTitle);
    
    showNotification(`成功报名"${activityTitle}"！`, 'success');
}

const calendarStyle = document.createElement('style');
calendarStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(calendarStyle);
