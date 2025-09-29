// 自定义配置页面功能

// 全局变量
let configData = {
    taskName: '',
    ageLevel: '',
    productionCount: 5,
    themeType: 'cognitive',
    customTheme: '',
    artStyle: 'soft',
    pageCount: 10,
    sentenceTypes: [],
    educationGoals: [],
    customGoals: [],
    ipIntegration: false,
    ipFile: null,
    interactionTypes: [],
    arPointCount: 3,
    arEffect: 'animation',
    taskType: 'find',
    taskCount: 1
};

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomConfig();
});

// 初始化自定义配置页面
function initializeCustomConfig() {
    loadSelectedTemplate();
    initializeFormHandlers();
    initializeSliders();
    initializeSwitches();
    initializeUploadModal();
    initializePreview();
    updatePreview();
}

// 加载选中的模板
function loadSelectedTemplate() {
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
        try {
            const template = JSON.parse(selectedTemplate);
            populateFormFromTemplate(template);
        } catch (error) {
            console.error('解析模板数据失败:', error);
        }
    }
}

// 从模板填充表单
function populateFormFromTemplate(template) {
    const taskNameInput = document.getElementById('taskName');
    const ageLevelSelect = document.getElementById('ageLevel');
    const themeRadios = document.querySelectorAll('input[name="themeType"]');
    const styleRadios = document.querySelectorAll('input[name="artStyle"]');

    if (taskNameInput) {
        taskNameInput.value = template.title || '';
    }

    if (ageLevelSelect) {
        ageLevelSelect.value = `${template.level}-${template.age}` || '';
    }

    // 设置主题类型
    themeRadios.forEach(radio => {
        if (radio.value === template.theme) {
            radio.checked = true;
        }
    });

    // 设置画风
    styleRadios.forEach(radio => {
        if (radio.value === template.style) {
            radio.checked = true;
        }
    });

    // 更新配置数据
    updateConfigData();
}

// 初始化表单处理器
function initializeFormHandlers() {
    // 任务名称
    const taskNameInput = document.getElementById('taskName');
    if (taskNameInput) {
        taskNameInput.addEventListener('input', function() {
            configData.taskName = this.value;
            updatePreview();
        });
    }

    // 分龄分级
    const ageLevelSelect = document.getElementById('ageLevel');
    if (ageLevelSelect) {
        ageLevelSelect.addEventListener('change', function() {
            configData.ageLevel = this.value;
            updatePreview();
        });
    }

    // 生产数量
    const productionCountInput = document.getElementById('productionCount');
    if (productionCountInput) {
        productionCountInput.addEventListener('input', function() {
            configData.productionCount = parseInt(this.value) || 1;
            updatePreview();
        });
    }

    // 主题类型
    const themeRadios = document.querySelectorAll('input[name="themeType"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            configData.themeType = this.value;
            toggleCustomThemeInput();
            updatePreview();
        });
    });

    // 画风选择
    const styleRadios = document.querySelectorAll('input[name="artStyle"]');
    styleRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            configData.artStyle = this.value;
            updatePreview();
        });
    });

    // 句型要求
    const sentenceCheckboxes = document.querySelectorAll('input[name="sentenceType"]');
    sentenceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCheckboxArray('sentenceTypes', 'sentenceType');
            updatePreview();
        });
    });

    // 教育目标
    const educationCheckboxes = document.querySelectorAll('input[name="educationGoal"]');
    educationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCheckboxArray('educationGoals', 'educationGoal');
            updatePreview();
        });
    });

    // 互动类型
    const interactionCheckboxes = document.querySelectorAll('input[name="interactionType"]');
    interactionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCheckboxArray('interactionTypes', 'interactionType');
            toggleInteractionConfigs();
            updatePreview();
        });
    });

    // AR效果
    const arEffectSelect = document.getElementById('arEffect');
    if (arEffectSelect) {
        arEffectSelect.addEventListener('change', function() {
            configData.arEffect = this.value;
            updateEffectPreview();
        });
    }

    // 任务类型
    const taskTypeSelect = document.getElementById('taskType');
    if (taskTypeSelect) {
        taskTypeSelect.addEventListener('change', function() {
            configData.taskType = this.value;
            updatePreview();
        });
    }

    // 任务数量
    const taskCountInput = document.getElementById('taskCount');
    if (taskCountInput) {
        taskCountInput.addEventListener('input', function() {
            configData.taskCount = parseInt(this.value) || 1;
            updatePreview();
        });
    }

    // 添加自定义目标
    const addCustomGoalBtn = document.getElementById('addCustomGoal');
    if (addCustomGoalBtn) {
        addCustomGoalBtn.addEventListener('click', addCustomGoal);
    }

    // 保存模板按钮
    const saveTemplateBtn = document.getElementById('saveTemplateBtn');
    if (saveTemplateBtn) {
        saveTemplateBtn.addEventListener('click', saveAsTemplate);
    }

    // 下一步按钮
    const nextStepBtn = document.getElementById('nextStepBtn');
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', goToNextStep);
    }
}

// 初始化滑动条
function initializeSliders() {
    // 页数滑动条
    const pageCountSlider = document.getElementById('pageCount');
    const pageCountValue = document.getElementById('pageCountValue');
    
    if (pageCountSlider && pageCountValue) {
        pageCountSlider.addEventListener('input', function() {
            const value = this.value;
            pageCountValue.textContent = value;
            configData.pageCount = parseInt(value);
            updatePreview();
        });
    }

    // AR互动点数量滑动条
    const arPointCountSlider = document.getElementById('arPointCount');
    const arPointCountValue = document.getElementById('arPointCountValue');
    
    if (arPointCountSlider && arPointCountValue) {
        arPointCountSlider.addEventListener('input', function() {
            const value = this.value;
            arPointCountValue.textContent = value;
            configData.arPointCount = parseInt(value);
            updatePreview();
        });
    }
}

// 初始化开关
function initializeSwitches() {
    // IP植入开关
    const ipIntegrationSwitch = document.getElementById('ipIntegration');
    const ipUploadSection = document.getElementById('ipUploadSection');
    
    if (ipIntegrationSwitch && ipUploadSection) {
        ipIntegrationSwitch.addEventListener('change', function() {
            configData.ipIntegration = this.checked;
            ipUploadSection.style.display = this.checked ? 'block' : 'none';
            updatePreview();
        });
    }
}

// 初始化上传弹窗
function initializeUploadModal() {
    const uploadBtn = document.getElementById('uploadIpBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeBtn = document.getElementById('closeUploadModal');
    const cancelBtn = document.getElementById('cancelUpload');
    const confirmBtn = document.getElementById('confirmUpload');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadedFiles = document.getElementById('uploadedFiles');
    const previewImage = document.getElementById('previewImage');

    // 打开上传弹窗
    if (uploadBtn && uploadModal) {
        uploadBtn.addEventListener('click', function() {
            uploadModal.classList.add('show');
        });
    }

    // 关闭上传弹窗
    if (closeBtn) {
        closeBtn.addEventListener('click', closeUploadModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeUploadModal);
    }

    // 确认上传
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            if (configData.ipFile) {
                showToast('IP素材上传成功', 'success');
                closeUploadModal();
            } else {
                showToast('请先选择文件', 'error');
            }
        });
    }

    // 拖拽上传
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#4A90E2';
            this.style.backgroundColor = '#F8F9FA';
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#E9ECEF';
            this.style.backgroundColor = 'transparent';
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#E9ECEF';
            this.style.backgroundColor = 'transparent';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }

    // 文件选择
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0]);
            }
        });
    }

    function handleFileUpload(file) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            showToast('请选择图片文件', 'error');
            return;
        }

        // 验证文件大小 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('文件大小不能超过5MB', 'error');
            return;
        }

        // 预览图片
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            configData.ipFile = file;
            uploadArea.style.display = 'none';
            uploadedFiles.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    function closeUploadModal() {
        uploadModal.classList.remove('show');
        // 重置状态
        uploadArea.style.display = 'block';
        uploadedFiles.style.display = 'none';
        fileInput.value = '';
        configData.ipFile = null;
    }
}

// 初始化预览
function initializePreview() {
    updatePreview();
}

// 更新预览
function updatePreview() {
    updateConfigData();
    
    // 更新页数预览
    const previewPageCount = document.getElementById('previewPageCount');
    if (previewPageCount) {
        previewPageCount.textContent = `${configData.pageCount}页`;
    }

    // 更新风格预览
    const previewStyle = document.getElementById('previewStyle');
    if (previewStyle) {
        const styleMap = {
            'soft': '柔和手绘风',
            'simple': '简约卡通风'
        };
        previewStyle.textContent = styleMap[configData.artStyle] || configData.artStyle;
    }

    // 更新互动预览
    const previewInteraction = document.getElementById('previewInteraction');
    if (previewInteraction) {
        const interactionMap = {
            'ar': 'AR角色互动',
            'click': '点击查词',
            'task': '任务引导'
        };
        const interactions = configData.interactionTypes.map(type => interactionMap[type] || type);
        previewInteraction.textContent = interactions.join('、') || '无互动';
    }
}

// 更新配置数据
function updateConfigData() {
    // 从表单获取最新数据
    const taskNameInput = document.getElementById('taskName');
    const ageLevelSelect = document.getElementById('ageLevel');
    const productionCountInput = document.getElementById('productionCount');
    const themeRadios = document.querySelectorAll('input[name="themeType"]:checked');
    const styleRadios = document.querySelectorAll('input[name="artStyle"]:checked');

    if (taskNameInput) configData.taskName = taskNameInput.value;
    if (ageLevelSelect) configData.ageLevel = ageLevelSelect.value;
    if (productionCountInput) configData.productionCount = parseInt(productionCountInput.value) || 1;
    if (themeRadios.length > 0) configData.themeType = themeRadios[0].value;
    if (styleRadios.length > 0) configData.artStyle = styleRadios[0].value;
}

// 更新复选框数组
function updateCheckboxArray(arrayName, name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    configData[arrayName] = Array.from(checkboxes).map(cb => cb.value);
}

// 切换自定义主题输入
function toggleCustomThemeInput() {
    const customThemeInput = document.getElementById('customThemeInput');
    const otherRadio = document.querySelector('input[name="themeType"][value="other"]');
    
    if (customThemeInput && otherRadio) {
        customThemeInput.style.display = otherRadio.checked ? 'block' : 'none';
    }
}

// 切换互动配置
function toggleInteractionConfigs() {
    const arConfig = document.getElementById('arConfig');
    const taskConfig = document.getElementById('taskConfig');
    
    if (arConfig) {
        arConfig.style.display = configData.interactionTypes.includes('ar') ? 'block' : 'none';
    }
    
    if (taskConfig) {
        taskConfig.style.display = configData.interactionTypes.includes('task') ? 'block' : 'none';
    }
}

// 更新效果预览
function updateEffectPreview() {
    const effectPreview = document.getElementById('effectPreview');
    if (effectPreview) {
        const effectMap = {
            'animation': 'assets/ar-preview-animation.gif',
            'click': 'assets/ar-preview-click.gif',
            'gesture': 'assets/ar-preview-gesture.gif'
        };
        
        const img = effectPreview.querySelector('img');
        if (img) {
            img.src = effectMap[configData.arEffect] || 'assets/placeholder-ar.jpg';
        }
    }
}

// 添加自定义目标
function addCustomGoal() {
    const customGoal = prompt('请输入自定义教育目标:');
    if (customGoal && customGoal.trim()) {
        configData.customGoals.push(customGoal.trim());
        
        // 添加到UI
        const checkboxGroup = document.querySelector('.checkbox-group');
        if (checkboxGroup) {
            const customItem = document.createElement('label');
            customItem.className = 'checkbox-item';
            customItem.innerHTML = `
                <input type="checkbox" name="educationGoal" value="custom-${configData.customGoals.length - 1}" checked>
                <span class="checkbox-label">${customGoal.trim()}</span>
            `;
            checkboxGroup.appendChild(customItem);
            
            // 绑定事件
            const checkbox = customItem.querySelector('input');
            checkbox.addEventListener('change', function() {
                updateCheckboxArray('educationGoals', 'educationGoal');
                updatePreview();
            });
        }
        
        showToast('自定义目标已添加', 'success');
    }
}

// 保存为模板
function saveAsTemplate() {
    updateConfigData();
    
    const templateName = prompt('请输入模板名称:');
    if (templateName && templateName.trim()) {
        const template = {
            id: Date.now(),
            name: templateName.trim(),
            config: { ...configData },
            createdAt: new Date().toISOString()
        };
        
        // 保存到本地存储
        const savedTemplates = JSON.parse(localStorage.getItem('savedTemplates') || '[]');
        savedTemplates.push(template);
        localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
        
        showToast('模板保存成功', 'success');
    }
}

// 进入下一步
function goToNextStep() {
    updateConfigData();
    
    // 验证必填字段
    if (!configData.taskName.trim()) {
        showToast('请输入任务名称', 'error');
        return;
    }
    
    if (!configData.ageLevel) {
        showToast('请选择分龄分级', 'error');
        return;
    }
    
    // 保存配置数据
    localStorage.setItem('customConfig', JSON.stringify(configData));
    
    // 跳转到需求确认预览页
    window.location.href = 'config-preview.html';
}

// 导出全局函数
window.addCustomGoal = addCustomGoal;
