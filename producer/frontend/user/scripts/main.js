// 主要JavaScript功能

// 全局变量
let currentUser = {
    name: '张老师',
    avatar: 'assets/avatar-placeholder.png',
    membership: 'professional',
    monthlyQuota: 100,
    usedQuota: 50
};

// 模板数据
const templateData = [
    {
        id: 1,
        title: '动物认知 - 10页基础版',
        description: '适合3-6岁儿童的动物认知绘本，通过重复句型学习动物名称',
        cover: 'assets/template-animals.jpg',
        level: 'pre-a1',
        age: '3-6',
        theme: 'cognitive',
        style: 'soft',
        pages: 10,
        wordsPerPage: '5-8词',
        coreSentence: 'I see a ___',
        educationGoals: '词汇认知、动物识别',
        arPoints: 3,
        favorited: false
    },
    {
        id: 2,
        title: '数字学习 - 12页进阶版',
        description: '7-9岁儿童数字学习绘本，结合生活场景学习1-10',
        cover: 'assets/template-numbers.jpg',
        level: 'a1',
        age: '7-9',
        theme: 'cognitive',
        style: 'simple',
        pages: 12,
        wordsPerPage: '8-12词',
        coreSentence: 'I have ___ apples',
        educationGoals: '数字认知、数学启蒙',
        arPoints: 4,
        favorited: true
    },
    {
        id: 3,
        title: '刷牙习惯 - 8页习惯版',
        description: '培养3-6岁儿童刷牙习惯的互动绘本',
        cover: 'assets/template-brushing.jpg',
        level: 'pre-a1',
        age: '3-6',
        theme: 'habit',
        style: 'soft',
        pages: 8,
        wordsPerPage: '4-6词',
        coreSentence: 'I brush my teeth',
        educationGoals: '习惯培养、健康意识',
        arPoints: 2,
        favorited: false
    },
    {
        id: 4,
        title: '友谊故事 - 15页故事版',
        description: '10-12岁儿童友谊主题故事绘本，培养社交能力',
        cover: 'assets/template-friendship.jpg',
        level: 'a2',
        age: '10-12',
        theme: 'story',
        style: 'simple',
        pages: 15,
        wordsPerPage: '12-18词',
        coreSentence: 'We are good friends',
        educationGoals: '社交礼仪、情感表达',
        arPoints: 5,
        favorited: false
    }
];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    initializeHeader();
    initializeWelcomeModal();
    initializeFunctionCards();
    initializeDataOverview();
}

// 初始化头部功能
function initializeHeader() {
    const notificationBtn = document.getElementById('notificationBtn');
    const helpBtn = document.getElementById('helpBtn');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    // 消息通知
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotificationPanel();
        });
    }

    // 帮助中心
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            showHelpPanel();
        });
    }

    // 用户菜单
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleUserDropdown();
        });

        // 点击外部关闭下拉菜单
        document.addEventListener('click', function() {
            userDropdown.style.opacity = '0';
            userDropdown.style.visibility = 'hidden';
            userDropdown.style.transform = 'translateY(-10px)';
        });
    }
}

// 切换用户下拉菜单
function toggleUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        const isVisible = userDropdown.style.opacity === '1';
        if (isVisible) {
            userDropdown.style.opacity = '0';
            userDropdown.style.visibility = 'hidden';
            userDropdown.style.transform = 'translateY(-10px)';
        } else {
            userDropdown.style.opacity = '1';
            userDropdown.style.visibility = 'visible';
            userDropdown.style.transform = 'translateY(0)';
        }
    }
}

// 显示消息通知面板
function showNotificationPanel() {
    // 创建通知面板
    const notificationPanel = document.createElement('div');
    notificationPanel.className = 'notification-panel';
    notificationPanel.innerHTML = `
        <div class="notification-header">
            <h3>消息通知</h3>
            <button class="close-notification">&times;</button>
        </div>
        <div class="notification-list">
            <div class="notification-item">
                <div class="notification-icon">📚</div>
                <div class="notification-content">
                    <h4>绘本生成完成</h4>
                    <p>您的"动物认知绘本"已生成完成，可以开始编辑了</p>
                    <span class="notification-time">2分钟前</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">⚠️</div>
                <div class="notification-content">
                    <h4>额度提醒</h4>
                    <p>本月生成额度已使用50%，建议合理安排使用</p>
                    <span class="notification-time">1小时前</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">🎉</div>
                <div class="notification-content">
                    <h4>新功能上线</h4>
                    <p>AR互动配置功能已上线，快来体验吧！</p>
                    <span class="notification-time">1天前</span>
                </div>
            </div>
        </div>
    `;

    // 添加到页面
    document.body.appendChild(notificationPanel);

    // 关闭按钮事件
    const closeBtn = notificationPanel.querySelector('.close-notification');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(notificationPanel);
    });

    // 点击外部关闭
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!notificationPanel.contains(e.target)) {
                document.body.removeChild(notificationPanel);
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);
}

// 显示帮助面板
function showHelpPanel() {
    const helpPanel = document.createElement('div');
    helpPanel.className = 'help-panel';
    helpPanel.innerHTML = `
        <div class="help-header">
            <h3>帮助中心</h3>
            <button class="close-help">&times;</button>
        </div>
        <div class="help-content">
            <div class="help-section">
                <h4>新手教程</h4>
                <ul>
                    <li><a href="#" onclick="startNewUserGuide()">开始新手引导</a></li>
                    <li><a href="#" onclick="showVideoTutorial()">观看视频教程</a></li>
                    <li><a href="#" onclick="downloadUserGuide()">下载使用手册</a></li>
                </ul>
            </div>
            <div class="help-section">
                <h4>客服支持</h4>
                <ul>
                    <li><a href="#" onclick="openLiveChat()">在线客服</a></li>
                    <li><a href="mailto:support@kidbookflow.com">邮件支持</a></li>
                    <li><a href="tel:400-123-4567">电话支持</a></li>
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(helpPanel);

    const closeBtn = helpPanel.querySelector('.close-help');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(helpPanel);
    });
}

// 初始化欢迎弹窗
function initializeWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    const closeBtn = document.getElementById('closeWelcomeModal');
    const skipBtn = document.getElementById('skipGuide');
    const startBtn = document.getElementById('startGuide');

    // 检查是否首次登录
    const isFirstLogin = !localStorage.getItem('hasSeenWelcome');
    
    if (isFirstLogin && welcomeModal) {
        setTimeout(() => {
            welcomeModal.classList.add('show');
        }, 500);
    }

    // 关闭弹窗
    if (closeBtn) {
        closeBtn.addEventListener('click', closeWelcomeModal);
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', closeWelcomeModal);
    }

    if (startBtn) {
        startBtn.addEventListener('click', function() {
            closeWelcomeModal();
            window.location.href = 'template-library.html';
        });
    }
}

// 关闭欢迎弹窗
function closeWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    if (welcomeModal) {
        welcomeModal.classList.remove('show');
        localStorage.setItem('hasSeenWelcome', 'true');
    }
}

// 初始化功能卡片
function initializeFunctionCards() {
    const functionCards = document.querySelectorAll('.function-card');
    
    functionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.dataset.action;
            handleFunctionCardClick(action);
        });

        // 添加hover效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// 处理功能卡片点击
function handleFunctionCardClick(action) {
    switch (action) {
        case 'new-task':
            window.location.href = 'template-library.html';
            break;
        case 'template-library':
            window.location.href = 'template-library.html';
            break;
        case 'history':
            window.location.href = 'history-tasks.html';
            break;
        case 'materials':
            window.location.href = 'material-library.html';
            break;
        case 'adaptation':
            window.location.href = 'adaptation-center.html';
            break;
        case 'quality':
            window.location.href = 'quality-reports.html';
            break;
        default:
            console.log('未知功能:', action);
    }
}

// 初始化数据概览
function initializeDataOverview() {
    updateDataOverview();
}

// 更新数据概览
function updateDataOverview() {
    const quotaElement = document.querySelector('.overview-value');
    if (quotaElement) {
        quotaElement.textContent = `${currentUser.usedQuota}/${currentUser.monthlyQuota} 本`;
    }
}

// 工具函数
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 新手引导相关函数
function startNewUserGuide() {
    closeWelcomeModal();
    window.location.href = 'template-library.html';
}

function showVideoTutorial() {
    showToast('视频教程功能开发中...', 'info');
}

function downloadUserGuide() {
    showToast('使用手册下载功能开发中...', 'info');
}

function openLiveChat() {
    showToast('在线客服功能开发中...', 'info');
}

// 导出全局函数
window.startNewUserGuide = startNewUserGuide;
window.showVideoTutorial = showVideoTutorial;
window.downloadUserGuide = downloadUserGuide;
window.openLiveChat = openLiveChat;
