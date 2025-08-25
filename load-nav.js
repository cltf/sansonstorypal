// 加载底部导航栏
function loadBottomNav() {
    try {
        // 移除现有的底部导航栏
        const existingNav = document.querySelector('.bottom-nav');
        if (existingNav) {
            existingNav.remove();
        }
        
        // 直接插入底部导航栏HTML
        const navHTML = `<!-- 底部导航栏 -->
<nav class="bottom-nav" style="position: fixed !important; bottom: 0 !important; left: 0 !important; right: 0 !important; background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85)) !important; display: flex !important; justify-content: space-around; align-items: center; padding: 15px 20px; z-index: 9999 !important; width: 100% !important; box-sizing: border-box; min-height: 70px; border-top: 2px solid rgba(255, 182, 193, 0.3); box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15);">
    <div class="nav-item" id="nav-home" onclick="goToHome()">
        <i class="fas fa-home"></i>
        <span>首页</span>
    </div>
    <div class="nav-item" id="nav-scan" onclick="goToScan()">
        <i class="fas fa-camera"></i>
        <span>扫描</span>
    </div>
    <div class="nav-item" id="nav-library" onclick="goToLibrary()">
        <i class="fas fa-book"></i>
        <span>书库</span>
    </div>
    <div class="nav-item" id="nav-rewards" onclick="goToRewards()">
        <i class="fas fa-star"></i>
        <span>奖励</span>
    </div>
    <div class="nav-item" id="nav-profile" onclick="goToProfile()">
        <i class="fas fa-user"></i>
        <span>我的</span>
    </div>
</nav>`;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
        
        // 设置激活状态
        setActiveNavState();
    } catch (error) {
        console.error('加载底部导航栏失败:', error);
    }
}

// 设置导航栏激活状态
function setActiveNavState() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const navItems = document.querySelectorAll('.nav-item');
    
    // 移除所有激活状态
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 根据当前页面设置激活状态
    switch(currentPage) {
        case 'child-home':
            document.getElementById('nav-home').classList.add('active');
            break;
        case 'child-scan':
            document.getElementById('nav-scan').classList.add('active');
            break;
        case 'child-reading':
            document.getElementById('nav-library').classList.add('active');
            break;
        case 'child-rewards':
            document.getElementById('nav-rewards').classList.add('active');
            break;
        case 'child-profile':
            document.getElementById('nav-profile').classList.add('active');
            break;
        default:
            document.getElementById('nav-home').classList.add('active');
            break;
    }
}

// 页面加载完成后加载底部导航栏
document.addEventListener('DOMContentLoaded', loadBottomNav);

