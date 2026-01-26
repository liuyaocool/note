# Win7

## 禁用win按键打开菜单

1.   Win + R , 输入 regedit
2. 在注册表编辑器中, 导航到以下路径: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout` 
3. 创建禁用Win键的项: Keyboard Layout 键下右键，选择 New -> Binary Value。
4. 将新创建的二进制值命名为 Scancode Map。
5. 双击 Scancode Map，进入编辑模式。在编辑框中输入以下16进制数值：
    - ` 00000000 00000000 03000000 00005BE0 00000000 `  这个值的含义是将左Win键映射为一个不存在的键码（0xE0）, 从而禁用它.
    - ` 00000000 00000000 03000000 00005CE0 00000000 `  右Win键可以通过此值禁用
6. 保存并重启：

## 程序列表

- [win7破解程序kmspico](https://resource.liuyao.link/file/kmspico.exe)
- [chrome 支持win7](https://bigfile.61linux.com/win7/chrome.exe)
- [.net 4](https://bigfile.61linux.com/win7/dnet4.exe)
- [百度拼音3.1](https://bigfile.61linux.com/win7/BaiduPinyin3.1.exe)

# win10

## 修改桌面下载等位置到其他盘

1. 打开**文件资源管理器**
2. **左侧**找到桌面等， 右键**属性**
3. 找到**位置**选项卡
4. 点击**移动**，选择文件夹后应用

## 关闭系统更新

1. 使用“服务”管理工具
    - `Win+R`, 输入 `services.msc`，按Enter。
    - 在服务窗口中，找到 `Windows Update` 服务，右键选择`属性`。
    - **常规**选项卡中，启动类型设置为**禁用**，然后点击**停止**来停止当前更新服务。
    - **恢复**选项卡，**第一次失败**，改为**无操作**
    - 点击 `应用` 和 `确定` 以保存设置。
2. 使用组策略编辑器（仅限 Windows 10 Pro 和 Enterprise）
    - `Win+R`，输入`gpedit.msc`，按Enter。
    - 在本地组策略编辑器中，依次展开：`计算机配置 > 管理模板 > Windows 组件 > Windows 更新`。
    - 找到并双击`配置自动更新`，选择`已禁用`，然后点击`应用`和`确定`。
    - 找到并双击`指定Intranet Microsoft更新服务位置`，选择`已启用`，将左下角三个服务器都设置为`127.0.0.1`，然后点击`应用`和`确定`。
3. 使用注册表编辑器
    - 按 Win + R 打开运行窗口，输入 regedit 并按 Enter。
    - 导航到：HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU（如果没有 WindowsUpdate 和 AU 文件夹，你需要手动创建）。
    - 在右侧窗格中，右键单击空白区域，选择 新建 > DWORD (32 位) 值。
    - 将新值命名为 NoAutoUpdate，然后将其值设置为 1。
    - 关闭注册表编辑器并重启计算机。

## 关闭防病毒程序

1. Win键+R，输入 “gpedit.msc” 
2. 依次打开 计算机配置 → 管理模板 → Windows组件 → Microsoft Defender防病毒
3. 在右侧双击 “关闭Microsoft Defender防病毒程序”，选择启用

## 触摸板滚轮

1. Win键，搜索**设备管理器**，从**鼠标和其他指针设备**中找到触控板，双击打开
2. 从**详细信息**选项卡中找到**硬件Id**，不要关闭
3. **Win+R**，输入**regedit**，回车
4. 导航到路径：**HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Enum\HID**
5. 根据设备的VID和PID找到对应的触控板设备
6. 在**Device Parameters**下找到**FlipFlopWheel**键值，将其值设置为**1**（如果不可用，尝试切换到十进制模式）。
7. 重启

# mac安装win10

## 触控板

控制面板 -> 搜 bootcamp -> 设置touch bar，触控板手势等

### 程序： Trackpad++

**问题**

1. 三指拖动手势在结束三指后仍会被拖动
2. 双指滚动惯性 跨应用后会继续


# win11

## 关闭相关设置

- 设置 → 系统 → 多任务处理 → 关闭“靠贴窗口”
- 设置 → 个性化 → 锁屏界面
- 设置 → 隐私和安全性 → 每个选项卡都找找

## 关闭不必要的服务

Win + r → 输入“services.msc” ， 关闭以下服务（常规 恢复 选项卡都要设置）

| 名称 | 服务   | 功能 |
| :------- | :--------- | :--- |
|                      | Intel(R) Driver & Support Assistant         |  |
|                      | Intel(R) Driver & Support Assistant Updater |  |
|                      | Intel® Computing Improvement Program        |  |
|                      | Geolocation Service                         |  |
|                      | Intel System Usage Report Service           |  |
| 系统优化工具          | Microsoft PC Manager Service                |  |
|                      | Secure Socket Tunneling Protocol Service    |  |
|                      | Windows Search                              |  |
|                      | Windows 更新                                |  |
|                      | Windows 推送通知系统服务                     |  |
|                      | 数据使用量                                  |  |
|                      | 同步主机_2cbad4                             |  |
|                      | 更新 Orchestrator 服务                      |  |
| microsoft 兼容性遥测  | Connected User Experiences and Telemetry   | 自动反馈和系统健康数据收集器 |

## 卸载无用软件

- OneDrive: 管理员权限运行 PowerShell， `winget uninstall Microsoft.OneDrive`

## 关闭防病毒程序

1. 打开**Windows安全中心**，点左侧**病毒和威胁防护**
2. 在**病毒和威胁防护**中，点**管理设置**
3. 在下方找到**篡改防护**，将其关闭。确保后续的注册表修改能够生效
4. **Win+R**，输入**regedit**
5. 找到**计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender**
6. 右键**Windows Defender**，新建 -> DWORD，添加以下值
    - DisableAntiSpyware = 1
    - DisableRealtimeMonitoring = 1 
    - DisableAntiVirus = 1
    - DisableSpecialRunningModes = 1
    - DisableRoutinelyTakingAction = 1
    - ServiceKeepAlive = 1
7. 右键**Windows Defender**，新建项 -> 命名为 **Real-Time Protection**，并在此下添加以下值
    - DisableBehaviorMonitoring = 1
    - DisableOnAccessProtection = 1
    - DisableRealtimeMonitoring = 1
    - DisableScanOnRealtimeEnable = 1
8. 右键**Windows Defender**，新建项 -> 命名为 **Signature Updates**，并在此下添加以下值
    - ForceUpdateFromMU =1
9. 右键**Windows Defender**，新建项 -> 命名为 **Spynet**，并在此下添加以下值
    - DisableBlockAtFirstSeen = 1 
10. 重启

# 终端Msys2

## 安装

使用pacman作为包管理工具， 基本与linux操作一致

> 配置软件都与linux基本一致， 如zsh vim等

1. 下载 https://github.com/msys2/msys2-installer/releases
    - 为了节省麻烦 选择非msys2-base开头的exe下载
2. 或官网下载 https://www.msys2.org/
3. 双击安装

## 换源

### 1.备份

1. 打开文件管理器， 打开安装目录`C:\msys64\`
2. 备份 `安装目录\etc\pacman.d`

### 2.换源

1. 我习惯中科大源 https://mirrors.ustc.edu.cn/help/msys2.html
2. 打开msys2, 按照教程执行命令

## 文件管理器地址栏启动

1. c盘根目录下创建文件夹 `bin`
2. 将此文件夹添加至Path
3. 此目录下创建文件`msys.bat`
    - 添加内容
    -   ```bat
        @echo off
        set MSYSTEM=MSYS
        C:\msys64\msys2_shell.cmd -here -no-start
        ```

## 配置

### 家目录

1. 打开msys2
2. `vim /etc/nsswitch.conf`
3. 修改此处  `db_home: windows`

### 颜色

窗口界面点logo -> Options -> Looks > Theme 选择 “flat-ui”

### 字体

下载 选中字体 右键安装

- UbuntuMono: https://design.ubuntu.com/font
    - 四个UbuntuMono-*.ttf
- Source Code pro: https://github.com/adobe-fonts/source-code-pro

### 修改默认终端为zsh

`vim  ~/.bash_profile`

添加如下
```bash
# 自动启动 zsh（如果存在）
if [ -f /bin/zsh ]; then
  exec /bin/zsh
fi
```

# 好用程序

- 截图: PixPin

# KVM设置

## 磁盘

1. 添加磁盘后虚拟机中找不到: windows中打开磁盘工具， 将空间分配

# 脚本

## 定时关机

> 如果 shutdown -s 命令执行了重启  
> 1. ~~win+r 运行`sysdm.cpl` → 高级 → 启动和故障恢复 → 设置, 取消勾选‘系统失败’那块的“自动重新启动”~~

```bat
@echo off
@REM 修改字符编码utf-8
chcp 65001 >nul
title 定时关机
@REM 修改颜色为绿色
color 0A

@REM 标记 用于goto跳转到这
:start
@REM 清屏
cls
echo ========================================
echo 定时关机
echo ========================================
echo.
echo 常用:
echo   0    = 取消
echo   60   = 1分钟
echo   300  = 5分钟
echo   1800 = 30分钟
echo   3600 = 1小时
echo   7200 = 2小时
echo.
set /p "seconds=请输入秒数: "

if "%seconds%"=="0" (
    shutdown -a
    echo.
    echo 已取消定时关机！
) else (
    @REM -f:强制关机 -s:关机 -t:时间(秒)
    shutdown -s -f -t %seconds%
    echo.
    if %seconds% GEQ 300 (
        set /a minutes=seconds/60
        echo 约 %minutes% 分钟 后关机！
    ) else (
        echo 约 %seconds% 秒 后关机！
    )
)

echo.
echo 按任意键继续，或按Ctrl+C退出...
pause >nul
goto start
```