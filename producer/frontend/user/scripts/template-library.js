// 模板库页面功能

// 全局变量
let filteredTemplates = [...templateData];
let currentPreviewPage = 1;
let totalPreviewPages = 3;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplateLibrary();
});

// 初始化模板库
function initializeTemplateLibrary() {
    renderTemplates();
    initializeFilters();
    initializePreviewModal();
    initializeCustomTemplate();
}

// 渲染模板列表
function renderTemplates() {
    const templateGrid = document.getElementById('templateGrid');
    if (!templateGrid) return;

    templateGrid.innerHTML = '';

    filteredTemplates.forEach(template => {
        const templateCard = createTemplateCard(template);
        templateGrid.appendChild(templateCard);
    });
}

// 创建模板卡片
function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.dataset.templateId = template.id;

    const badgeText = `${template.level.toUpperCase()}・${template.age}岁・${getThemeText(template.theme)}`;
    
    card.innerHTML = `
        <div class="template-cover">
            <img src="${template.cover}" alt="${template.title}" onerror="this.src='assets/placeholder-book.jpg'">
            <div class="template-badge">${badgeText}</div>
            <button class="template-favorite ${template.favorited ? 'favorited' : ''}" onclick="toggleFavorite(${template.id})">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 2L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 2Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
        <div class="template-info">
            <h3 class="template-title">${template.title}</h3>
            <p class="template-description">${template.description}</p>
            <div class="template-structure">
                <div class="structure-item">
                    <span class="structure-label">内容结构：</span>
                    <span class="structure-value">${template.pages}页，每页${template.wordsPerPage}</span>
                </div>
                <div class="structure-item">
                    <span class="structure-label">核心句型：</span>
                    <span class="structure-value">"${template.coreSentence}"</span>
                </div>
                <div class="structure-item">
                    <span class="structure-label">互动预留：</span>
                    <span class="structure-value">${template.arPoints}处AR角色互动点</span>
                </div>
            </div>
            <div class="template-actions">
                <button class="template-action-btn" onclick="previewTemplate(${template.id})">预览模板</button>
                <button class="template-action-btn primary" onclick="useTemplate(${template.id})">选用此模板</button>
            </div>
        </div>
    `;

    return card;
}

// 获取主题文本
function getThemeText(theme) {
    const themeMap = {
        'cognitive': '认知类',
        'habit': '习惯类',
        'story': '故事类'
    };
    return themeMap[theme] || theme;
}

// 初始化筛选器
function initializeFilters() {
    const levelFilter = document.getElementById('levelFilter');
    const ageFilter = document.getElementById('ageFilter');
    const themeFilter = document.getElementById('themeFilter');
    const styleFilter = document.getElementById('styleFilter');
    const searchInput = document.getElementById('searchInput');

    // 筛选器联动
    if (ageFilter) {
        ageFilter.addEventListener('change', function() {
            const selectedAge = this.value;
            updateLevelFilter(selectedAge);
            applyFilters();
        });
    }

    // 绑定筛选事件
    [levelFilter, ageFilter, themeFilter, styleFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });

    // 搜索功能
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
}

// 更新分级筛选器
function updateLevelFilter(selectedAge) {
    const levelFilter = document.getElementById('levelFilter');
    if (!levelFilter) return;

    const ageLevelMap = {
        '3-6': 'pre-a1',
        '7-9': 'a1',
        '10-12': 'a2'
    };

    const suggestedLevel = ageLevelMap[selectedAge];
    if (suggestedLevel) {
        levelFilter.value = suggestedLevel;
    }
}

// 应用筛选器
function applyFilters() {
    const levelFilter = document.getElementById('levelFilter');
    const ageFilter = document.getElementById('ageFilter');
    const themeFilter = document.getElementById('themeFilter');
    const styleFilter = document.getElementById('styleFilter');
    const searchInput = document.getElementById('searchInput');

    const filters = {
        level: levelFilter ? levelFilter.value : '',
        age: ageFilter ? ageFilter.value : '',
        theme: themeFilter ? themeFilter.value : '',
        style: styleFilter ? styleFilter.value : '',
        search: searchInput ? searchInput.value.toLowerCase() : ''
    };

    filteredTemplates = templateData.filter(template => {
        // 分级筛选
        if (filters.level && template.level !== filters.level) {
            return false;
        }

        // 年龄筛选
        if (filters.age && template.age !== filters.age) {
            return false;
        }

        // 主题筛选
        if (filters.theme && template.theme !== filters.theme) {
            return false;
        }

        // 风格筛选
        if (filters.style && template.style !== filters.style) {
            return false;
        }

        // 搜索筛选
        if (filters.search) {
            const searchText = `${template.title} ${template.description} ${template.coreSentence}`.toLowerCase();
            if (!searchText.includes(filters.search)) {
                return false;
            }
        }

        return true;
    });

    renderTemplates();
}

// 切换收藏状态
function toggleFavorite(templateId) {
    const template = templateData.find(t => t.id === templateId);
    if (template) {
        template.favorited = !template.favorited;
        
        // 更新UI
        const favoriteBtn = document.querySelector(`[data-template-id="${templateId}"] .template-favorite`);
        if (favoriteBtn) {
            favoriteBtn.classList.toggle('favorited', template.favorited);
        }

        // 显示提示
        const message = template.favorited ? '已添加到收藏' : '已取消收藏';
        showToast(message, 'success');
    }
}

// 预览模板
function previewTemplate(templateId) {
    const template = templateData.find(t => t.id === templateId);
    if (!template) return;

    const modal = document.getElementById('templatePreviewModal');
    const title = document.getElementById('previewTitle');
    
    if (title) {
        title.textContent = template.title;
    }

    // 更新预览内容
    updatePreviewContent(template);
    
    if (modal) {
        modal.classList.add('show');
    }
}

// 更新预览内容
function updatePreviewContent(template) {
    // 这里可以根据模板数据更新预览内容
    // 目前使用静态内容作为示例
}

// 使用模板
function useTemplate(templateId) {
    const template = templateData.find(t => t.id === templateId);
    if (!template) return;

    // 保存选中的模板到本地存储
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    
    // 跳转到自定义需求配置页
    window.location.href = 'custom-config.html';
}

// 初始化预览弹窗
function initializePreviewModal() {
    const modal = document.getElementById('templatePreviewModal');
    const closeBtn = document.getElementById('closePreviewModal');
    const closePreviewBtn = document.getElementById('closePreview');
    const useTemplateBtn = document.getElementById('useTemplate');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');

    // 关闭弹窗
    if (closeBtn) {
        closeBtn.addEventListener('click', closePreviewModal);
    }

    if (closePreviewBtn) {
        closePreviewBtn.addEventListener('click', closePreviewModal);
    }

    // 使用模板
    if (useTemplateBtn) {
        useTemplateBtn.addEventListener('click', function() {
            const templateId = modal.dataset.templateId;
            if (templateId) {
                useTemplate(parseInt(templateId));
            }
        });
    }

    // 页面导航
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPreviewPage > 1) {
                currentPreviewPage--;
                updatePreviewPage();
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPreviewPage < totalPreviewPages) {
                currentPreviewPage++;
                updatePreviewPage();
            }
        });
    }

    // 点击外部关闭
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePreviewModal();
            }
        });
    }
}

// 关闭预览弹窗
function closePreviewModal() {
    const modal = document.getElementById('templatePreviewModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// 更新预览页面
function updatePreviewPage() {
    const pages = document.querySelectorAll('.page-preview');
    const currentPageSpan = document.getElementById('currentPage');
    
    pages.forEach((page, index) => {
        page.classList.toggle('active', index + 1 === currentPreviewPage);
    });

    if (currentPageSpan) {
        currentPageSpan.textContent = currentPreviewPage;
    }
}

// 初始化自定义模板功能
function initializeCustomTemplate() {
    const customBtn = document.getElementById('customTemplateBtn');
    if (customBtn) {
        customBtn.addEventListener('click', function() {
            // 跳转到自定义需求配置页
            window.location.href = 'custom-config.html';
        });
    }
}

// 防抖函数
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

// 导出全局函数
window.toggleFavorite = toggleFavorite;
window.previewTemplate = previewTemplate;
window.useTemplate = useTemplate;
