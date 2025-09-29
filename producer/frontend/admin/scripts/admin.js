// 管理员端功能

// 全局变量
let userGrowthChart = null;
let bookGenerationChart = null;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});

// 初始化管理员仪表板
function initializeAdminDashboard() {
    initializeCharts();
    initializeEventHandlers();
    loadDashboardData();
}

// 初始化图表
function initializeCharts() {
    initializeUserGrowthChart();
    initializeBookGenerationChart();
}

// 初始化用户增长图表
function initializeUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;

    const data = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        datasets: [{
            label: '新增用户',
            data: [120, 190, 300, 500, 200, 300, 450],
            borderColor: '#4A90E2',
            backgroundColor: 'rgba(74, 144, 226, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }, {
            label: '活跃用户',
            data: [800, 950, 1100, 1300, 1200, 1400, 1600],
            borderColor: '#2ECC71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F1F3F4'
                    },
                    ticks: {
                        color: '#7F8C8D'
                    }
                },
                x: {
                    grid: {
                        color: '#F1F3F4'
                    },
                    ticks: {
                        color: '#7F8C8D'
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    };

    userGrowthChart = new Chart(ctx, config);
}

// 初始化绘本生成量图表
function initializeBookGenerationChart() {
    const ctx = document.getElementById('bookGenerationChart');
    if (!ctx) return;

    const data = {
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        datasets: [{
            label: '生成数量',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(74, 144, 226, 0.8)',
                'rgba(46, 204, 113, 0.8)',
                'rgba(255, 107, 53, 0.8)',
                'rgba(155, 89, 182, 0.8)',
                'rgba(52, 152, 219, 0.8)',
                'rgba(230, 126, 34, 0.8)',
                'rgba(231, 76, 60, 0.8)'
            ],
            borderColor: [
                '#4A90E2',
                '#2ECC71',
                '#FF6B35',
                '#9B59B6',
                '#3498DB',
                '#E67E22',
                '#E74C3C'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F1F3F4'
                    },
                    ticks: {
                        color: '#7F8C8D'
                    }
                },
                x: {
                    grid: {
                        color: '#F1F3F4'
                    },
                    ticks: {
                        color: '#7F8C8D'
                    }
                }
            }
        }
    };

    bookGenerationChart = new Chart(ctx, config);
}

// 初始化事件处理器
function initializeEventHandlers() {
    // 续费提醒按钮
    const reminderBtns = document.querySelectorAll('.reminder-btn');
    reminderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userName = this.closest('.reminder-item').querySelector('.user-name').textContent;
            sendRenewalReminder(userName);
        });
    });

    // 审核按钮
    const approveBtns = document.querySelectorAll('.action-btn.approve');
    approveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.audit-item');
            approveContent(item);
        });
    });

    const rejectBtns = document.querySelectorAll('.action-btn.reject');
    rejectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.audit-item');
            rejectContent(item);
        });
    });

    // 时间范围选择
    const timeRanges = document.querySelectorAll('.time-range');
    timeRanges.forEach(select => {
        select.addEventListener('change', function() {
            updateChartsData(this.value);
        });
    });
}

// 加载仪表板数据
function loadDashboardData() {
    // 模拟加载数据
    updateOverviewCards();
    updateManagementCards();
}

// 更新概览卡片
function updateOverviewCards() {
    // 这里可以添加实时数据更新逻辑
    console.log('更新概览卡片数据');
}

// 更新管理卡片
function updateManagementCards() {
    // 这里可以添加实时数据更新逻辑
    console.log('更新管理卡片数据');
}

// 发送续费提醒
function sendRenewalReminder(userName) {
    // 模拟发送提醒
    showToast(`已向 ${userName} 发送续费提醒`, 'success');
    
    // 更新按钮状态
    const btn = event.target;
    btn.textContent = '已发送';
    btn.disabled = true;
    btn.style.background = '#95A5A6';
}

// 审核通过
function approveContent(item) {
    const itemType = item.querySelector('.item-type').textContent;
    showToast(`${itemType} 审核通过`, 'success');
    
    // 移除审核项
    item.style.opacity = '0.5';
    item.style.pointerEvents = 'none';
    
    // 更新统计数据
    updateAuditStats();
}

// 审核拒绝
function rejectContent(item) {
    const itemType = item.querySelector('.item-type').textContent;
    const reason = prompt('请输入拒绝原因:');
    
    if (reason && reason.trim()) {
        showToast(`${itemType} 审核拒绝: ${reason}`, 'error');
        
        // 移除审核项
        item.style.opacity = '0.5';
        item.style.pointerEvents = 'none';
        
        // 更新统计数据
        updateAuditStats();
    }
}

// 更新审核统计
function updateAuditStats() {
    const auditItems = document.querySelectorAll('.audit-item:not([style*="opacity: 0.5"])');
    const pendingCount = auditItems.length;
    
    const statValue = document.querySelector('.audit-stats .stat-item:first-child .stat-value');
    if (statValue) {
        statValue.textContent = pendingCount;
    }
}

// 更新图表数据
function updateChartsData(timeRange) {
    // 根据时间范围更新图表数据
    const days = parseInt(timeRange);
    
    // 生成模拟数据
    const labels = generateDateLabels(days);
    const userData = generateUserData(days);
    const bookData = generateBookData(days);
    
    // 更新用户增长图表
    if (userGrowthChart) {
        userGrowthChart.data.labels = labels;
        userGrowthChart.data.datasets[0].data = userData.newUsers;
        userGrowthChart.data.datasets[1].data = userData.activeUsers;
        userGrowthChart.update();
    }
    
    // 更新绘本生成图表
    if (bookGenerationChart) {
        bookGenerationChart.data.labels = labels;
        bookGenerationChart.data.datasets[0].data = bookData;
        bookGenerationChart.update();
    }
}

// 生成日期标签
function generateDateLabels(days) {
    const labels = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        if (days <= 7) {
            labels.push(date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }));
        } else if (days <= 30) {
            labels.push(date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }));
        } else {
            labels.push(date.toLocaleDateString('zh-CN', { month: 'short' }));
        }
    }
    
    return labels;
}

// 生成用户数据
function generateUserData(days) {
    const newUsers = [];
    const activeUsers = [];
    
    for (let i = 0; i < days; i++) {
        newUsers.push(Math.floor(Math.random() * 100) + 50);
        activeUsers.push(Math.floor(Math.random() * 500) + 1000);
    }
    
    return { newUsers, activeUsers };
}

// 生成绘本数据
function generateBookData(days) {
    const data = [];
    
    for (let i = 0; i < days; i++) {
        data.push(Math.floor(Math.random() * 200) + 100);
    }
    
    return data;
}

// 快速操作函数
function openTemplateManagement() {
    showToast('跳转到模板库管理页面', 'info');
    // window.location.href = 'template-management.html';
}

function openUserManagement() {
    showToast('跳转到用户管理页面', 'info');
    // window.location.href = 'user-management.html';
}

function openContentAudit() {
    showToast('跳转到内容审核页面', 'info');
    // window.location.href = 'content-audit.html';
}

function openSystemLogs() {
    showToast('跳转到系统日志页面', 'info');
    // window.location.href = 'system-logs.html';
}

function openDataExport() {
    showToast('跳转到数据导出页面', 'info');
    // window.location.href = 'data-export.html';
}

// 系统配置函数
function updateTemplateLibrary() {
    showToast('正在更新模板库...', 'info');
    
    // 模拟更新过程
    setTimeout(() => {
        showToast('模板库更新完成', 'success');
    }, 2000);
}

function checkSystemHealth() {
    showToast('正在进行系统健康检查...', 'info');
    
    // 模拟检查过程
    setTimeout(() => {
        showToast('系统健康检查完成，所有服务正常', 'success');
    }, 3000);
}

function viewServerLogs() {
    showToast('正在加载服务器日志...', 'info');
    
    // 模拟加载过程
    setTimeout(() => {
        showToast('服务器日志加载完成', 'success');
    }, 1500);
}

// 导出全局函数
window.openTemplateManagement = openTemplateManagement;
window.openUserManagement = openUserManagement;
window.openContentAudit = openContentAudit;
window.openSystemLogs = openSystemLogs;
window.openDataExport = openDataExport;
window.updateTemplateLibrary = updateTemplateLibrary;
window.checkSystemHealth = checkSystemHealth;
window.viewServerLogs = viewServerLogs;
