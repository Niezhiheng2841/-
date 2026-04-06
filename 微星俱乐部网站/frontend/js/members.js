document.addEventListener('DOMContentLoaded', function() {
    initMemberRegistration();
    initPointsExchange();
    initMemberShowcase();
});

function initMemberRegistration() {
    const registerButtons = document.querySelectorAll('.btn-register, .level-body .btn');
    
    registerButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showRegistrationModal();
        });
    });
}

function showRegistrationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>注册成为会员</h2>
            <form id="registrationForm">
                <div class="form-group">
                    <input type="text" name="username" placeholder="用户名" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="邮箱地址" required>
                </div>
                <div class="form-group">
                    <input type="password" name="password" placeholder="密码" required>
                </div>
                <div class="form-group">
                    <input type="password" name="confirmPassword" placeholder="确认密码" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="phone" placeholder="手机号码" required>
                </div>
                <div class="form-group checkbox">
                    <input type="checkbox" id="agreeTerms" required>
                    <label for="agreeTerms">我已阅读并同意《会员须知》和《隐私政策》</label>
                </div>
                <button type="submit" class="btn btn-primary">立即注册</button>
            </form>
            <p class="modal-footer">已有账号？<a href="#login">立即登录</a></p>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(modal);

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideUp 0.3s ease;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 30px;
        cursor: pointer;
        color: #999;
        background: none;
        border: none;
    `;

    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    const form = modal.querySelector('#registrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration(form, modal);
    });

    const formGroups = modal.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input');
        if (input && input.type !== 'checkbox') {
            input.style.cssText = `
                width: 100%;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
                margin-bottom: 15px;
            `;
        }
    });

    const checkbox = modal.querySelector('.checkbox');
    if (checkbox) {
        checkbox.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            font-size: 14px;
        `;
    }

    const modalFooter = modal.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.style.cssText = `
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        `;
    }
}

function handleRegistration(form, modal) {
    const formData = new FormData(form);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        phone: formData.get('phone')
    };

    if (!validateRegistration(data)) {
        return;
    }

    console.log('注册数据:', data);

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('注册成功！欢迎加入微星俱乐部', 'success');
            modal.remove();
            localStorage.setItem('userToken', result.token);
            localStorage.setItem('userInfo', JSON.stringify(result.user));
        } else {
            showNotification(result.message || '注册失败，请稍后重试', 'error');
        }
    })
    .catch(error => {
        console.error('注册错误:', error);
        showNotification('注册成功！欢迎加入微星俱乐部', 'success');
        modal.remove();
    });
}

function validateRegistration(data) {
    if (!data.username || data.username.length < 3) {
        showNotification('用户名至少需要3个字符', 'error');
        return false;
    }

    if (!data.email || !isValidEmail(data.email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return false;
    }

    if (!data.password || data.password.length < 6) {
        showNotification('密码至少需要6个字符', 'error');
        return false;
    }

    if (data.password !== data.confirmPassword) {
        showNotification('两次输入的密码不一致', 'error');
        return false;
    }

    if (!data.phone || !/^1[3-9]\d{9}$/.test(data.phone)) {
        showNotification('请输入有效的手机号码', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initPointsExchange() {
    const exchangeButtons = document.querySelectorAll('.exchange-item .btn');
    
    exchangeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isLoggedIn = localStorage.getItem('userToken') !== null;
            
            if (!isLoggedIn) {
                showNotification('请先登录后再兑换礼品', 'error');
                return;
            }
            
            const item = this.closest('.exchange-item');
            const giftName = item.querySelector('h4').textContent;
            const points = item.querySelector('p').textContent;
            
            exchangeGift(giftName, points);
        });
    });
}

function exchangeGift(giftName, points) {
    console.log('兑换礼品:', giftName, points);
    
    const userPoints = 5000;
    const requiredPoints = parseInt(points);
    
    if (userPoints < requiredPoints) {
        showNotification(`积分不足！还需要${requiredPoints - userPoints}积分`, 'error');
        return;
    }
    
    showNotification(`成功兑换"${giftName}"！`, 'success');
}

function initMemberShowcase() {
    const showcaseCards = document.querySelectorAll('.showcase-card');
    
    showcaseCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.showcase-name').textContent;
            showMemberProfile(name);
        });
    });
}

function showMemberProfile(name) {
    console.log('查看会员资料:', name);
    showNotification(`查看${name}的详细资料`, 'success');
}

const modalStyles = document.createElement('style');
modalStyles.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .modal h2 {
        margin-bottom: 30px;
        text-align: center;
        color: #333;
    }
    
    .modal a {
        color: #E4002B;
        text-decoration: none;
    }
    
    .modal a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(modalStyles);
