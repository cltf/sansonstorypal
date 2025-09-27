#!/bin/bash

echo "=== 三生Storypal Android 项目编译脚本 ==="
echo ""

# 检查 Java 环境
echo "检查 Java 环境..."
if ! command -v java &> /dev/null; then
    echo "❌ 错误: 未找到 Java 环境"
    echo "请安装 Java JDK 8 或更高版本"
    exit 1
fi

java -version
echo "✅ Java 环境正常"
echo ""

# 检查 Android SDK
echo "检查 Android SDK..."
ANDROID_SDK="$HOME/Library/Android/sdk"
if [ ! -d "$ANDROID_SDK" ]; then
    echo "❌ 错误: 未找到 Android SDK"
    echo "请安装 Android Studio 和 Android SDK"
    exit 1
fi

echo "✅ Android SDK 路径: $ANDROID_SDK"
echo ""

# 设置环境变量
export ANDROID_HOME="$ANDROID_SDK"
export PATH="$PATH:$ANDROID_SDK/platform-tools:$ANDROID_SDK/tools"

echo "设置环境变量..."
echo "ANDROID_HOME: $ANDROID_HOME"
echo ""

# 尝试使用系统 Gradle 或下载
echo "检查 Gradle..."
if command -v gradle &> /dev/null; then
    echo "✅ 找到系统 Gradle"
    GRADLE_CMD="gradle"
else
    echo "⚠️  未找到系统 Gradle，尝试下载..."
    
    # 创建 gradle wrapper
    mkdir -p gradle/wrapper
    
    # 尝试下载 gradle wrapper jar
    echo "下载 Gradle Wrapper..."
    if curl -L -o gradle/wrapper/gradle-wrapper.jar "https://services.gradle.org/distributions/gradle-8.4-wrapper.jar" 2>/dev/null; then
        echo "✅ Gradle Wrapper 下载成功"
        GRADLE_CMD="./gradlew"
        chmod +x gradlew
    else
        echo "❌ Gradle Wrapper 下载失败"
        echo "建议使用 Android Studio 打开项目进行编译"
        exit 1
    fi
fi

echo ""

# 编译项目
echo "开始编译项目..."
echo "使用命令: $GRADLE_CMD"

if [ "$GRADLE_CMD" = "./gradlew" ]; then
    ./gradlew clean build
else
    gradle clean build
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 编译成功！"
    echo ""
    echo "APK 文件位置:"
    echo "app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "安装到设备:"
    echo "adb install app/build/outputs/apk/debug/app-debug.apk"
else
    echo ""
    echo "❌ 编译失败"
    echo ""
    echo "建议:"
    echo "1. 使用 Android Studio 打开项目"
    echo "2. 点击 'Sync Project with Gradle Files'"
    echo "3. 点击 'Build > Make Project'"
fi
