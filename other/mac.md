# u盘安装

创建可引导的 macOS 安装器

https://support.apple.com/zh-cn/101578?utm_source=hacpai.com


# 软件推荐

- [AltTab: 窗口切换器](https://alt-tab-macos.netlify.app/)
- [HapiGO: 程序启动器](https://www.hapigo.com/)
- [Karabiner-Elements: 快捷键映射](https://karabiner-elements.pqrs.org/)


# brew (Homebrew)

ustc源搜brew, 点brew.git后help， 内有安装教程和换源教程

# 启动ssh服务

## 步骤1: 授予终端完全磁盘访问权限

1. 打开 系统设置（macOS 13 或更高版本）或 系统偏好设置（macOS 12 或更早版本）。
2. 在 系统偏好设置 中，点击 安全性与隐私（Security & Privacy），然后选择 隐私 标签。
3. 在隐私设置中，选择 完全磁盘访问（Full Disk Access）选项。
4. 点击左下角的锁形图标进行解锁（如果需要）。
5. 在右侧的应用列表中，确保 终端（Terminal）被勾选。如果没有显示，点击 + 按钮手动添加 终端（Terminal）应用。

## 步骤2: 启动服务

- 启动： `sudo systemsetup -setremotelogin on`
- 检查状态： `sudo systemsetup -getremotelogin`
- 配置文件： `sudo vim /etc/ssh/sshd_config`
- 重新启动： 
    - `sudo launchctl stop com.openssh.sshd`
    - `sudo launchctl start com.openssh.sshd`
- ok

# 痛点

## command+q

使用HapiGO 设置 command+Q 为识别图片， 改掉快捷键功能即可