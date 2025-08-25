// 全局变量
let currentPage = 'home';
let eyeProtectionMode = false;
let currentStars = 32;

// 页面导航函数
function goToHome() {
    window.location.href = 'child-home.html';
}

function goToScan() {
    window.location.href = 'child-scan.html';
}

function goToReading() {
    window.location.href = 'child-reading.html';
}

function goToLibrary() {
    window.location.href = 'child-reading.html';
}

function goToRewards() {
    window.location.href = 'child-rewards.html';
}

function goToProfile() {
    window.location.href = 'child-profile.html';
}

function goToParent() {
    // 跳转到家长端登录页面
    showNotification('正在跳转到家长端...');
    setTimeout(() => {
        window.location.href = 'parent-dashboard.html';
    }, 1000);
}

function goToDashboard() {
    window.location.href = 'parent-dashboard.html';
}

function goToRemote() {
    // 跳转到远程共读页面
    showNotification('远程共读页面开发中...');
}

function goToSettings() {
    // 跳转到设置页面
    showNotification('设置页面开发中...');
}

function goBack() {
    window.history.back();
}

// 儿童端首页功能
function startReading(bookId) {
    showNotification('正在加载绘本...');
    setTimeout(() => {
        // 根据绘本ID跳转到相应的阅读页面
        if (bookId === 'caterpillar') {
            goToScan();
        } else {
            showNotification('绘本加载完成！');
        }
    }, 1500);
}

function toggleEyeProtection() {
    eyeProtectionMode = !eyeProtectionMode;
    const body = document.body;
    
    if (eyeProtectionMode) {
        body.style.filter = 'brightness(0.8) sepia(0.1)';
        showNotification('护眼模式已开启');
    } else {
        body.style.filter = '';
        showNotification('护眼模式已关闭');
    }
}

// 扫描页面功能
function showHelp() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeHelp() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showOfflineBooks() {
    showNotification('离线绘本功能开发中...');
}

function toggleFlash() {
    showNotification('闪光灯功能开发中...');
}

function startARReading() {
    showNotification('正在启动AR阅读模式...');
    setTimeout(() => {
        showNotification('AR模式已启动，请将手机对准绘本页面');
    }, 2000);
}

// 阅读列表页功能
function showSearch() {
    const searchSection = document.getElementById('searchSection');
    if (searchSection) {
        searchSection.classList.remove('hidden');
    }
}

function clearSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
}

function openBook(bookId) {
    showNotification('正在打开绘本...');
    setTimeout(() => {
        goToScan();
    }, 1000);
}

// 奖励中心页功能
function showHistory() {
    showNotification('奖励历史记录开发中...');
}

function switchTab(tabName) {
    // 更新标签页状态
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // 更新内容区域
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    const activeContent = document.getElementById(`${tabName}-content`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

function unlockReward(rewardId, cost) {
    if (currentStars >= cost) {
        // 显示解锁确认弹窗
        const modal = document.getElementById('unlockModal');
        const itemName = document.getElementById('unlockItemName');
        const costElement = document.getElementById('unlockCost');
        
        if (modal && itemName && costElement) {
            // 根据奖励ID设置名称
            const rewardNames = {
                'rainbow-caterpillar': '毛毛虫彩虹皮肤',
                'space-cat': '太空猫咪皮肤',
                'butterfly': '蝴蝶贴纸',
                'rabbit': '小兔子',
                'penguin': '小企鹅'
            };
            
            itemName.textContent = rewardNames[rewardId] || '未知奖励';
            costElement.textContent = `${cost}★`;
            modal.classList.remove('hidden');
        }
    } else {
        showNotification('星星不足，无法解锁此奖励');
    }
}

function closeUnlockModal() {
    const modal = document.getElementById('unlockModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function confirmUnlock() {
    const costElement = document.getElementById('unlockCost');
    if (costElement) {
        const cost = parseInt(costElement.textContent);
        currentStars -= cost;
        
        // 更新星星显示
        const starCountElements = document.querySelectorAll('.star-count');
        starCountElements.forEach(element => {
            element.textContent = `${currentStars}★`;
        });
        
        showNotification('解锁成功！');
        closeUnlockModal();
        
        // 刷新页面以显示解锁状态
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

function useReward(rewardId) {
    showNotification('奖励已应用到AR角色！');
}

function useSticker(stickerId) {
    showNotification('贴纸已添加到你的贴纸本！');
}

function feedPet(petId) {
    const modal = document.getElementById('feedModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeFeedModal() {
    const modal = document.getElementById('feedModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function feedWithFood(foodType, cost) {
    if (currentStars >= cost) {
        currentStars -= cost;
        
        // 更新星星显示
        const starCountElements = document.querySelectorAll('.star-count');
        starCountElements.forEach(element => {
            element.textContent = `${currentStars}★`;
        });
        
        const foodNames = {
            'carrot': '胡萝卜',
            'apple': '苹果',
            'cake': '蛋糕'
        };
        
        showNotification(`小恐龙吃了${foodNames[foodType]}，很开心！`);
        closeFeedModal();
    } else {
        showNotification('星星不足，无法购买食物');
    }
}

// 家长端功能
function viewAllRecords() {
    showNotification('查看全部记录功能开发中...');
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// 筛选功能
function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除同组其他标签的激活状态
            const parent = this.parentElement;
            const siblings = parent.querySelectorAll('.filter-tab');
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            // 激活当前标签
            this.classList.add('active');
            
            // 显示筛选结果
            const filterType = this.getAttribute('data-filter');
            showNotification(`已筛选：${this.textContent}`);
        });
    });
}

// 时间筛选功能
function setupTimeFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除其他按钮的激活状态
            const siblings = this.parentElement.querySelectorAll('.filter-btn');
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            // 激活当前按钮
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            showNotification(`已切换到${period === 'week' ? '本周' : '本月'}数据`);
        });
    });
}

// 通知系统
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease;
        font-family: inherit;
    `;

    // 添加动画样式
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // 添加到页面
    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前页面
    const path = window.location.pathname;
    if (path.includes('child-home')) {
        currentPage = 'home';
    } else if (path.includes('child-scan')) {
        currentPage = 'scan';
    } else if (path.includes('child-reading')) {
        currentPage = 'reading';
    } else if (path.includes('child-rewards')) {
        currentPage = 'rewards';
    } else if (path.includes('parent-dashboard')) {
        currentPage = 'dashboard';
    }
    
    // 初始化页面特定功能
    setupFilterTabs();
    setupTimeFilter();
    
    // 添加一些视觉效果
    addVisualEffects();
    
    // 设置页面标题
    setPageTitle();
});

// 添加视觉效果
function addVisualEffects() {
    // 星星闪烁动画
    const starNumber = document.querySelector('.star-count');
    if (starNumber) {
        setInterval(() => {
            starNumber.style.transform = 'scale(1.1)';
            setTimeout(() => {
                starNumber.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // 进度条动画
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = '68%';
        }, 500);
    }
    
    // 扫描动画
    const scanBorder = document.querySelector('.scan-border');
    if (scanBorder) {
        scanBorder.style.animation = 'scan 2s infinite';
    }
    
    // 图表动画
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.height = bar.style.height || '60%';
        }, index * 100);
    });
}

// 设置页面标题
function setPageTitle() {
    const titles = {
        'home': 'StoryPal - 儿童首页',
        'scan': 'StoryPal - 绘本扫描',
        'reading': 'StoryPal - 阅读书库',
        'rewards': 'StoryPal - 奖励中心',
        'dashboard': 'StoryPal - 家长看板'
    };
    
    if (titles[currentPage]) {
        document.title = titles[currentPage];
    }
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键关闭弹窗
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
    
    // 回车键确认操作
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('search-input')) {
            // 执行搜索
            showNotification('搜索功能开发中...');
        }
    }
});

// 触摸手势支持
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // 检测滑动方向
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            // 向右滑动 - 返回上一页
            if (currentPage !== 'home') {
                goBack();
            }
        } else {
            // 向左滑动 - 前进（如果有的话）
            showNotification('前进功能开发中...');
        }
    }
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 搜索防抖
const debouncedSearch = debounce(function(query) {
    showNotification(`搜索：${query}`);
}, 500);

// 监听搜索输入
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('search-input')) {
        debouncedSearch(e.target.value);
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误：', e.error);
    showNotification('页面出现错误，请刷新重试');
});

// 离线支持
window.addEventListener('offline', function() {
    showNotification('网络连接已断开，部分功能可能无法使用');
});

window.addEventListener('online', function() {
    showNotification('网络连接已恢复');
});

