// 页面切换功能
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const notesContainer = document.getElementById('current-notes');

    // 交互说明数据
    const interactionNotes = {
        'child-home': {
            title: '儿童端首页',
            notes: [
                '点击「绘本扫描」→ 启动摄像头（首次使用弹出权限申请）',
                '点击「推荐阅读」→ 跳转分龄分级阅读列表页',
                '点击「奖励中心」→ 跳转奖励中心页',
                '点击「护眼模式」→ 界面亮度降低20%',
                '点击「找爸爸妈妈」→ 跳转家长端登录页'
            ]
        },
        'child-scan': {
            title: '绘本扫描页',
            notes: [
                '扫描界面：中央取景框引导对准绘本页面',
                '点击「切换离线绘本」→ 弹出已缓存绘本列表',
                '点击「帮助」→ 弹出扫描教程动图',
                '扫描成功后→ 自动切换到AR互动界面',
                'AR界面：3D角色动画 + 英文语音播放',
                '点击「跟读」→ 启动语音识别，实时评分',
                '点击「查词」→ 进入点击查词模式，单词变可点击',
                '跟读完成后→ 弹出评分弹窗（准确率92分）',
                '点击单词→ 弹出浮窗：中文释义+例句+3D动画'
            ]
        },
        'child-reading': {
            title: '分龄分级阅读列表页',
            notes: [
                '顶部筛选栏：按年龄/CEFR等级筛选绘本',
                '点击筛选项→ 列表实时刷新为对应年龄段绘本',
                '绘本卡片：封面图+名称+难度标签+开始阅读按钮',
                '底部标注：离线可用图标、任务图标',
                '点击「开始阅读」→ 若需扫描跳转扫描页，若已缓存直接进入AR页',
                '底部推荐栏：根据阅读表现推荐个性化绘本'
            ]
        },
        'child-rewards': {
            title: '奖励中心页',
            notes: [
                '顶部数据：总星星数+进度条显示解锁进度',
                '奖励分类：角色皮肤、贴纸、虚拟宠物',
                '点击「解锁」→ 弹出确认弹窗，确认后星星减少',
                '已解锁皮肤→ 显示「使用」按钮，可应用到AR角色',
                '虚拟宠物→ 点击已拥有宠物进入喂养界面',
                '喂食星星兑换的食物→ 宠物英文互动："Thank you for the carrot!"'
            ]
        },
        'parent-dashboard': {
            title: '家长数据看板页',
            notes: [
                '顶部孩子信息：姓名、年龄、当前CEFR等级',
                '核心数据图表：阅读时长折线图、词汇掌握柱状图、发音准确率环形图',
                '点击图表→ 展开详情页查看细分数据',
                '近期阅读记录：绘本名称、时间、时长、核心表现',
                '数据实时更新，帮助家长了解学习效果',
                '配色沉稳，数据可视化清晰'
            ]
        },
        'parent-remote': {
            title: '远程共读页',
            notes: [
                '绘本选择：搜索框+推荐列表（孩子最近在读的绘本）',
                '录制功能区：绘本页面预览+文本内容',
                '录制控制：录制/播放/保存按钮',
                '录制设置：语速调节（慢/中/快）、背景音选择',
                '保存后→ 标注"已嵌入绘本，孩子阅读时可触发"',
                '孩子阅读时→ 页面底部弹出"爸爸/妈妈的声音"按钮',
                '点击播放→ 播放家长录制的语音，增强亲子互动'
            ]
        },
        'parent-settings': {
            title: '防沉迷设置页',
            notes: [
                '时长设置：每日使用时长滑动条（0-60分钟）',
                '分段使用开关：每20分钟提醒休息',
                '视力保护：护眼投影模式开关（20分钟自动切换）',
                '休息提醒文案：可自定义（默认英文提醒）',
                '使用时段限制：禁止使用时段选择',
                '设置完成后→ 点击"保存设置"，弹窗提示生效',
                '达到使用时长/休息时间→ 儿童端弹出全屏提醒，需家长解锁'
            ]
        },
        'hardware-connect': {
            title: '设备连接页',
            notes: [
                '连接步骤：打开阅读灯电源→开启蓝牙→搜索设备→点击配对',
                '设备列表：显示附近可连接的StoryPal阅读灯',
                '配对成功→ 弹窗提示"已连接，是否开启投影模式？"',
                '连接成功后→ 可使用投影模式和离线绘本功能',
                '界面设计：深色主题，突出连接状态'
            ]
        },
        'hardware-projector': {
            title: '投影模式页',
            notes: [
                '投影控制栏：亮度调节、投影尺寸、切换页面',
                'AR投影互动开关：开启后AR角色投射到墙面',
                '手势控制：儿童可通过手机屏幕点击控制墙面AR角色',
                '投影距离建议：1.5-2米，墙面保持平整浅色',
                '护眼功能：减少屏幕直射，营造沉浸式阅读氛围',
                '软件+硬件联动：覆盖屏幕+投影双场景'
            ]
        }
    };

    // 页面切换函数
    function switchPage(pageId) {
        // 隐藏所有页面
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // 显示目标页面
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 更新导航按钮状态
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // 激活当前按钮
        const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // 更新交互说明
        updateInteractionNotes(pageId);
    }

    // 更新交互说明
    function updateInteractionNotes(pageId) {
        const notes = interactionNotes[pageId];
        if (notes) {
            notesContainer.innerHTML = `
                <p><strong>${notes.title}：</strong></p>
                <ul>
                    ${notes.notes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            `;
        }
    }

    // 绑定导航按钮点击事件
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });

    // 模拟交互功能
    setupInteractiveElements();

    // 初始化显示第一个页面的说明
    updateInteractionNotes('child-home');
});

// 设置交互元素
function setupInteractiveElements() {
    // 儿童端首页交互
    setupChildHomeInteractions();
    
    // 绘本扫描页交互
    setupScanPageInteractions();
    
    // 阅读列表页交互
    setupReadingListInteractions();
    
    // 奖励中心页交互
    setupRewardsInteractions();
    
    // 家长端交互
    setupParentInteractions();
    
    // 硬件交互
    setupHardwareInteractions();
}

// 儿童端首页交互
function setupChildHomeInteractions() {
    // 功能卡片点击效果
    const functionCards = document.querySelectorAll('.function-card');
    functionCards.forEach(card => {
        card.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 护眼模式切换
    const eyeProtection = document.querySelector('.eye-protection');
    if (eyeProtection) {
        eyeProtection.addEventListener('click', function() {
            const phoneFrame = document.querySelector('#child-home .phone-frame');
            if (phoneFrame.style.filter === 'brightness(0.8)') {
                phoneFrame.style.filter = '';
                this.style.color = '#4a5568';
            } else {
                phoneFrame.style.filter = 'brightness(0.8)';
                this.style.color = '#667eea';
            }
        });
    }
}

// 绘本扫描页交互
function setupScanPageInteractions() {
    const scanFrame = document.querySelector('.scan-frame');
    const arInterface = document.querySelector('.ar-interface');
    
    if (scanFrame) {
        scanFrame.addEventListener('click', function() {
            // 模拟扫描成功
            this.style.display = 'none';
            if (arInterface) {
                arInterface.classList.remove('hidden');
            }
        });
    }

    // AR界面交互
    const readBtn = document.querySelector('.read-btn');
    const lookupBtn = document.querySelector('.lookup-btn');
    
    if (readBtn) {
        readBtn.addEventListener('click', function() {
            showNotification('跟读模式已启动，请说出："I\'m a hungry caterpillar!"');
        });
    }
    
    if (lookupBtn) {
        lookupBtn.addEventListener('click', function() {
            showNotification('查词模式已开启，点击页面单词查看释义');
        });
    }
}

// 阅读列表页交互
function setupReadingListInteractions() {
    // 筛选功能
    const filterItems = document.querySelectorAll('.filter-item');
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            filterItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            showNotification(`已筛选：${this.textContent}`);
        });
    });

    // 开始阅读按钮
    const startReadingBtns = document.querySelectorAll('.start-reading');
    startReadingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('正在加载绘本，请稍候...');
        });
    });
}

// 奖励中心页交互
function setupRewardsInteractions() {
    // 标签页切换
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            showNotification(`已切换到：${this.textContent}`);
        });
    });

    // 解锁按钮
    const unlockBtns = document.querySelectorAll('.unlock-cost');
    unlockBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('是否用20★解锁毛毛虫彩虹皮肤？')) {
                showNotification('解锁成功！星星-20，皮肤已可用');
                this.parentElement.classList.remove('locked');
                this.innerHTML = '<button class="use-btn">使用</button>';
            }
        });
    });

    // 使用按钮
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('use-btn')) {
            showNotification('皮肤已应用到AR角色！');
        }
    });
}

// 家长端交互
function setupParentInteractions() {
    // 数据卡片点击
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`查看${title}详细数据`);
        });
    });

    // 录制按钮
    const recordBtn = document.querySelector('.record-btn');
    if (recordBtn) {
        recordBtn.addEventListener('click', function() {
            this.style.background = '#c53030';
            this.innerHTML = '<i class="fas fa-stop"></i> 停止';
            showNotification('正在录制，请朗读绘本内容...');
            
            setTimeout(() => {
                this.style.background = '#e53e3e';
                this.innerHTML = '<i class="fas fa-microphone"></i> 录制';
                showNotification('录制完成！');
            }, 3000);
        });
    }

    // 保存设置
    const saveSettings = document.querySelector('.save-settings');
    if (saveSettings) {
        saveSettings.addEventListener('click', function() {
            showNotification('设置已保存，将同步到儿童端');
        });
    }

    // 时间滑块
    const timeSlider = document.querySelector('.time-slider');
    const timeDisplay = document.querySelector('.time-display');
    if (timeSlider && timeDisplay) {
        timeSlider.addEventListener('input', function() {
            timeDisplay.textContent = `${this.value}分钟/天`;
        });
    }
}

// 硬件交互
function setupHardwareInteractions() {
    // 设备连接
    const deviceItem = document.querySelector('.device-item');
    if (deviceItem) {
        deviceItem.addEventListener('click', function() {
            showNotification('正在连接 StoryPal-L123...');
            setTimeout(() => {
                if (confirm('已连接 StoryPal-L123，是否开启投影模式？')) {
                    // 切换到投影模式页
                    document.querySelector('[data-page="hardware-projector"]').click();
                }
            }, 2000);
        });
    }

    // 投影控制
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showNotification(`投影尺寸已调整为：${this.textContent}`);
        });
    });

    // AR投影互动
    const arCheckbox = document.querySelector('input[type="checkbox"]');
    if (arCheckbox) {
        arCheckbox.addEventListener('change', function() {
            if (this.checked) {
                showNotification('AR投影互动已开启，请对准墙面');
            } else {
                showNotification('AR投影互动已关闭');
            }
        });
    }
}

// 显示通知
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
    `;

    // 添加动画样式
    const style = document.createElement('style');
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

    // 添加到页面
    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加一些视觉效果
document.addEventListener('DOMContentLoaded', function() {
    // 星星闪烁动画
    const starNumber = document.querySelector('.star-number');
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
});

