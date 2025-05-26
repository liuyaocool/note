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

## 触控板程序

Trackpad++

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

- Intel(R) Driver & Support Assistant
- Intel(R) Driver & Support Assistant Updater
- Intel® Computing Improvement Program
- Geolocation Service
- Intel System Usage Report Service
- 系统优化工具： Microsoft PC Manager Service
- Secure Socket Tunneling Protocol Service
- Windows Search
- Windows 更新
- Windows 推送通知系统服务
- 数据使用量
- 同步主机_2cbad4
- 更新 Orchestrator 服务

## 卸载无用软件

- OnrDrive: 管理员权限运行 PowerShell， `winget uninstall Microsoft.OneDrive`

# 好用程序

- 截图: PixPin