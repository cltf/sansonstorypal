# 三生Storypal Android 应用

基于StoryPal产品原型图开发的Android应用，支持手机和平板设备。

## 功能特性

### 儿童端功能
- **儿童端首页**: 主要功能入口，包含扫描、阅读、任务、离线等功能卡片
- **绘本扫描**: 使用相机扫描绘本页面，让角色活起来
- **阅读列表**: 显示推荐书籍、我的书籍和最近阅读
- **奖励中心**: 成就系统、每日奖励和等级进度

### 家长端功能
- **家长看板**: 监控孩子的阅读进度、时间控制和设备设置

### 设备功能
- **设备连接**: 连接StoryPal硬件设备
- **投影模式**: 支持投影显示功能

## 技术特性

### 响应式设计
- 支持手机布局 (`layout/`)
- 支持平板布局 (`layout-sw600dp/`)
- 支持大平板布局 (`layout-sw720dp/`)

### 权限管理
- 相机权限：用于绘本扫描功能
- 网络权限：用于在线功能
- 存储权限：用于离线内容下载

### 主题设计
- 儿童友好色彩方案
- Material Design 3 设计语言
- 护眼模式支持

## 项目结构

```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/sansheng/storypal/
│   │   │   ├── MainActivity.kt              # 主入口Activity
│   │   │   ├── ChildHomeActivity.kt         # 儿童端首页
│   │   │   ├── ChildScanActivity.kt         # 绘本扫描
│   │   │   ├── ChildReadingActivity.kt      # 阅读列表
│   │   │   ├── ChildRewardsActivity.kt      # 奖励中心
│   │   │   └── ParentDashboardActivity.kt   # 家长看板
│   │   ├── res/
│   │   │   ├── layout/                      # 手机布局
│   │   │   ├── layout-sw600dp/              # 平板布局
│   │   │   ├── layout-sw720dp/              # 大平板布局
│   │   │   ├── drawable/                    # 图标和背景
│   │   │   ├── values/                      # 字符串、颜色、主题
│   │   │   └── mipmap-*/                    # 应用图标
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
├── settings.gradle
└── gradle.properties
```

## 开发环境要求

- Android Studio Arctic Fox 或更高版本
- Android SDK API 24+ (Android 7.0)
- Kotlin 1.9.10+
- Gradle 8.1.4+

## 构建和运行

1. 使用Android Studio打开项目
2. 同步Gradle依赖
3. 连接Android设备或启动模拟器
4. 点击运行按钮

## 待开发功能

- [ ] 相机扫描功能实现
- [ ] 绘本内容识别
- [ ] 离线内容下载
- [ ] 家长远程控制
- [ ] 设备连接功能
- [ ] 投影模式
- [ ] 护眼模式切换
- [ ] 数据持久化
- [ ] 用户账户系统

## 设计说明

应用采用Material Design 3设计语言，针对儿童用户进行了优化：
- 大按钮设计，便于儿童操作
- 鲜艳的色彩搭配，吸引儿童注意力
- 简洁的界面布局，减少认知负担
- 响应式设计，适配不同屏幕尺寸

## 许可证

本项目基于StoryPal产品原型图开发，仅供学习和演示使用。
