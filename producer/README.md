# KidBookFlow Producer - 智能绘本生产平台

## 项目概述

KidBookFlow Producer 是一个专为儿童教育设计的智能绘本生产平台，支持从需求定义到最终交付的完整绘本生产流程。平台采用模块化设计，提供用户端Web界面和管理员端管理界面。

## 核心功能

### 用户端功能

#### 1. 需求定义中心
- **首页导航**: 功能入口聚合页，快速触达核心功能
- **模板库**: 分龄分级模板选择，支持多维度筛选
- **自定义配置**: 个性化需求输入，可视化配置界面

#### 2. AI内容工厂
- **需求确认**: 生产前最终核对，可视化预览方案
- **生产进度**: 实时跟踪生产状态，支持暂停/取消
- **文本编辑**: AI生成后人工校准，批量/单本修改
- **视觉编辑**: 画风调整、布局修改、IP形象优化

#### 3. 功能适配中心
- **AR互动配置**: 配置AR效果，导出Unity/ARKit数据
- **离线适配**: 生成低内存离线包，支持无网络使用

#### 4. 质量验收与迭代
- **自动化检测**: 视觉、内容、功能适配三大维度检测
- **儿童测试反馈**: 收集真实使用反馈，优化建议生成

### 管理员端功能

- **平台管理**: 用户数据概览、会员管理、内容审核
- **模板库管理**: 模板编辑、审核、数据统计
- **系统配置**: 模板库更新、AI模型训练、服务器监控

## 技术架构

### 前端技术栈
- **HTML5/CSS3**: 响应式设计，支持平板操作
- **JavaScript**: 原生JS，模块化开发
- **Chart.js**: 数据可视化图表
- **SVG图标**: 矢量图标，支持多分辨率

### 后端技术栈
- **Flask**: Python Web框架
- **SQLAlchemy**: ORM数据库操作
- **JWT**: 用户认证和授权
- **Celery**: 异步任务处理
- **Redis**: 缓存和消息队列

### 数据库设计
- **用户管理**: 用户信息、会员等级、配额管理
- **模板系统**: 分龄分级模板、自定义模板
- **生产任务**: 任务状态、进度跟踪、配置管理
- **绘本内容**: 文本、图片、AR配置、离线包
- **素材管理**: 用户上传素材、审核状态
- **质量报告**: 检测结果、优化建议

## 项目结构

```
producer/
├── frontend/                 # 前端代码
│   ├── user/                # 用户端界面
│   │   ├── index.html       # 首页
│   │   ├── template-library.html  # 模板库
│   │   ├── custom-config.html     # 自定义配置
│   │   ├── styles/          # 样式文件
│   │   └── scripts/         # JavaScript文件
│   └── admin/               # 管理员端界面
│       ├── index.html       # 管理后台首页
│       ├── styles/          # 样式文件
│       └── scripts/         # JavaScript文件
├── backend/                 # 后端代码
│   ├── api/                 # API服务
│   │   └── app.py          # Flask应用主文件
│   ├── config.py           # 配置文件
│   └── requirements.txt    # Python依赖
├── docs/                   # 项目文档
└── assets/                 # 静态资源
```

## 快速开始

### 环境要求
- Python 3.8+
- Node.js 14+ (可选，用于前端开发)
- Redis (用于缓存和消息队列)
- PostgreSQL (生产环境) 或 SQLite (开发环境)

### 后端启动

1. 安装依赖
```bash
cd backend
pip install -r requirements.txt
```

2. 配置环境变量
```bash
export SECRET_KEY="your-secret-key"
export DATABASE_URL="sqlite:///kidbookflow.db"
export JWT_SECRET_KEY="your-jwt-secret"
```

3. 初始化数据库
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

4. 启动服务
```bash
python app.py
```

### 前端启动

1. 使用静态文件服务器
```bash
cd frontend/user
python -m http.server 8080
```

2. 或使用Node.js服务器
```bash
npx serve frontend/user -p 8080
```

## API文档

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 模板接口
- `GET /api/templates` - 获取模板列表
- `GET /api/templates/<id>` - 获取模板详情

### 任务接口
- `POST /api/tasks` - 创建生产任务
- `GET /api/tasks` - 获取任务列表
- `GET /api/tasks/<id>` - 获取任务详情

### 素材接口
- `POST /api/materials` - 上传素材
- `GET /api/materials` - 获取素材列表

### 管理员接口
- `GET /api/admin/stats` - 获取统计数据

## 部署指南

### Docker部署

1. 构建镜像
```bash
docker build -t kidbookflow-producer .
```

2. 运行容器
```bash
docker run -d -p 5000:5000 \
  -e DATABASE_URL="postgresql://user:pass@db:5432/kidbookflow" \
  -e REDIS_URL="redis://redis:6379/0" \
  kidbookflow-producer
```

### 生产环境部署

1. 使用Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

2. 配置Nginx反向代理
3. 设置SSL证书
4. 配置监控和日志

## 开发指南

### 代码规范
- Python: 遵循PEP 8规范
- JavaScript: 使用ES6+语法
- CSS: 使用BEM命名规范

### 测试
```bash
# 运行后端测试
python -m pytest tests/

# 运行前端测试
npm test
```

### 贡献指南
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

## 许可证

本项目采用MIT许可证，详见LICENSE文件。

## 联系方式

- 项目主页: https://github.com/your-org/kidbookflow-producer
- 问题反馈: https://github.com/your-org/kidbookflow-producer/issues
- 邮箱: support@kidbookflow.com
