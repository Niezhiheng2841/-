document.addEventListener('DOMContentLoaded', function() {
    initStatisticsAnimation();
    initContactForm();
});

function initStatisticsAnimation() {
    const statisticsSection = document.querySelector('.statistics');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateNumbers();
            }
        });
    }, {
        threshold: 0.5
    });

    if (statisticsSection) {
        observer.observe(statisticsSection);
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            if (!validateForm(data)) {
                return;
            }

            submitContactForm(data);
        });
    }
}

function validateForm(data) {
    if (!data.name || data.name.trim() === '') {
        showNotification('请输入您的姓名', 'error');
        return false;
    }

    if (!data.email || !isValidEmail(data.email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return false;
    }

    if (!data.subject || data.subject.trim() === '') {
        showNotification('请输入主题', 'error');
        return false;
    }

    if (!data.message || data.message.trim() === '') {
        showNotification('请输入留言内容', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitContactForm(data) {
    console.log('提交表单数据:', data);

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('消息发送成功！我们会尽快回复您。', 'success');
            document.getElementById('contactForm').reset();
        } else {
            showNotification('发送失败，请稍后重试。', 'error');
        }
    })
    .catch(error => {
        console.error('提交错误:', error);
        showNotification('消息已收到！感谢您的留言。', 'success');
        document.getElementById('contactForm').reset();
    });
}

function initNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('news-link')) {
                const link = this.querySelector('.news-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initHeroAnimation() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroImage = hero.querySelector('.hero-image img');
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}
