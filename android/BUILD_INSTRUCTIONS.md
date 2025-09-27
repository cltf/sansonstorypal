# 三生Storypal Android 项目编译指南

## 🚀 快速开始

由于网络环境限制，建议使用 **Android Studio** 来编译和运行项目。

## 📋 环境要求

- ✅ **Java JDK 8+** (已安装 OpenJDK 24.0.1)
- ✅ **Android SDK** (已安装在 ~/Library/Android/sdk)
- ✅ **Android Studio** (推荐使用最新版本)

## 🔧 编译步骤

### 方法一：使用 Android Studio (推荐)

1. **打开项目**
   ```bash
   # 在 Android Studio 中打开项目
   File > Open > 选择 /Users/chenlei/Desktop/storypal/android
   ```

2. **同步项目**
   - Android Studio 会自动检测项目
   - 点击 "Sync Project with Gradle Files"
   - 等待依赖下载完成

3. **编译项目**
   - 点击 `Build > Make Project` 或按 `Cmd+F9`
   - 等待编译完成

4. **运行项目**
   - 连接 Android 设备或启动模拟器
   - 点击 `Run > Run 'app'` 或按 `Shift+F10`

### 方法二：命令行编译 (需要解决网络问题)

```bash
cd /Users/chenlei/Desktop/storypal/android

# 方法 2.1: 使用系统 Gradle
brew install gradle
gradle clean build

# 方法 2.2: 使用 Android Studio 的 Gradle
# Android Studio 会自动下载正确的 Gradle Wrapper
```

## 📱 项目特性

### 已实现功能
- ✅ 主入口页面 (MainActivity)
- ✅ 儿童端首页 (ChildHomeActivity)
- ✅ 绘本扫描页面 (ChildScanActivity)
- ✅ 阅读列表页面 (ChildReadingActivity)
- ✅ 奖励中心页面 (ChildRewardsActivity)
- ✅ 家长看板页面 (ParentDashboardActivity)
- ✅ 响应式布局 (手机/平板适配)
- ✅ Material Design 3 主题
- ✅ 权限管理 (相机权限)

### 待开发功能
- 🔄 相机扫描功能
- 🔄 绘本内容识别
- 🔄 离线内容下载
- 🔄 家长远程控制
- 🔄 设备连接功能
- 🔄 投影模式
- 🔄 数据持久化

## 🎨 设计特色

- **儿童友好**: 大按钮、鲜艳色彩、简洁布局
- **响应式**: 支持手机、平板、大平板
- **Material Design 3**: 现代化设计语言
- **护眼模式**: 支持护眼模式切换

## 📂 项目结构

```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/storypal/          # Kotlin 源码
│   │   ├── res/
│   │   │   ├── layout/                 # 手机布局
│   │   │   ├── layout-sw600dp/         # 平板布局
│   │   │   ├── layout-sw720dp/         # 大平板布局
│   │   │   ├── drawable/               # 图标和背景
│   │   │   └── values/                 # 字符串、颜色、主题
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
├── settings.gradle
└── gradle.properties
```

## 🐛 常见问题

### 1. Gradle 下载慢
**解决方案**: 已配置国内镜像源
- 阿里云 Maven 镜像
- 腾讯云 Gradle 镜像

### 2. 编译失败
**解决方案**:
1. 使用 Android Studio 打开项目
2. 清理项目: `Build > Clean Project`
3. 重新同步: `File > Sync Project with Gradle Files`
4. 重新编译: `Build > Rebuild Project`

### 3. 权限问题
**解决方案**:
- 确保在 `AndroidManifest.xml` 中声明了必要权限
- 在运行时请求相机权限

## 📞 技术支持

如果遇到问题，请：
1. 检查 Android Studio 版本是否为最新
2. 确保 Android SDK 已正确安装
3. 尝试清理并重新同步项目
4. 查看 Android Studio 的 Build 输出日志

## 🎯 下一步

1. 使用 Android Studio 打开项目
2. 同步 Gradle 依赖
3. 在设备上运行应用
4. 根据需要扩展功能模块

---

**注意**: 由于网络环境限制，命令行编译可能遇到问题。强烈建议使用 Android Studio 进行开发。
