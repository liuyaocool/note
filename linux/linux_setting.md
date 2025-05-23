# 服务
## 操作服务

- 用户级: `systemctl --user enable/disable/start/stop/status xxx`
- 系统级: `sudo systemctl enable/disable/start/stop/status xxx`

## 创建服务-用户级

>用户级不会随开机启动， 需要登录用户后才会启动

`vim ~/.config/systemd/user/xxx.service`

```bash
[Unit]
Description=Auto SSH Tunnel
After=network-online.target

[Service]
# 注： 这里不要加 User Group
Type=simple
ExecStart=/bin/bash -c '这里填写命令'
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=30s

[Install]
WantedBy=default.target
```

## 创建服务-系统级

`vim /usr/lib/systemd/system/xxx.service`

```bash
[Unit]
# 描述
Description=Auto SSH Tunnel
# 指定服务启动的依赖条件, 如network.target表示网络启动后再启动服务
After=network-online.target

[Service]
# 指定运行服务的用户和组
User=liuyao
# Group=liuyao
Type=simple
# 指定要运行的命令或脚本的路径(需要从“/”开始), bash -c可用$(), 直接写命令不能用$()
ExecStart=/bin/bash -c '这里填写命令'
ExecReload=/bin/kill -HUP $MAINPID
# control-group: 默认值 systemd 会停止服务的控制组（cgroup）中的所有进程，包括主进程和所有子进程。
# process: 仅停止服务的主进程，不会终止子进程。
# mixed: 向主进程发送 SIGTERM 信号，同时向子进程发送 SIGKILL 信号。
# none: 不停止任何进程，仅执行 ExecStop 中定义的命令。
KillMode=control-group
# 设置服务失败时是否自动重启, always表示总是重启
Restart=always
RestartSec=30s

[Install]
# 指定服务的目标, multi-user.target表示多用户模式, 目标见/etc/systemd/system 
WantedBy=multi-user.target
```

# 网络

## 虚拟网卡

```bash
# 临时
sudo ip addr add ip/掩码 dev 所属网卡 label 网卡标签
# 例:
sudo ip addr add 172.21.2.61/24 dev enp12s0 label 网卡标签
```

# 账号设置

删除密码(不能用密码登录): ` sudo passwd -d username `

# ssh

## 生成密钥

`ssh-keygen -t ed25519`

## 免密登录

### 服务端

**修改配置**
```bash
sudo vi /etc/ssh/sshd_config

    # ----- 修改 -------
    Port 28
    RSAAuthentication yes
    PubkeyAuthentication yes
    # 密码不能为空
    PermitEmptyPasswords no
    #AuthorizedKeysFile .ssh/authorized_keys
    # 关闭密码登录 建议关闭
    PasswordAuthentication no
    # 是否允许root用户通过SSH登录: 这里配的 禁止密码登录
    PermitRootLogin prohibit-password

# 重启 ssh
service sshd restart
```

**创建文件**

```bash
# 如果没有 .ssh 路径
mkdir -p ~/.ssh
chmod 700 ~/.ssh

touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# or 去客户端
ssh-copy-id -p {port} {remote user}@{remote host}
```

### 客户端

```bash
# 1. 生成密钥
ssh-keygen -t ed25519
# 2. 公钥上传至服务器
# ~/.ssh/id_ed25519.pub 内文本复制到服务端~/.ssh/authorized_keys文件内
# or 
ssh-copy-id -p {port} {remote user}@{remote host}

# 3. 指定私钥文件登录
ssh -p {port} -i "/home/{user}/.ssh/id_ed25519" {remote user}@{remote host}
```

**登录报错**

- 报错1：ERROR: Host key verification failed. 解决：vi ~/.ssh/known_hosts ，删除某一行


## 内网穿透

### 中间机(公网机)

```bash
vi /etc/ssh/sshd_config
    ## ---------- 设置 -----------
    GatewayPorts yes

service sshd restart
```

### 内网机

**版本1：ssh实现, 断开需要手动重连**

```bash
vi ~/.ssh/config
    ## ---------- 设置 -----------
    Host sshh
    #断线重连 or `ssh -o ServerAliveInterval=30`
    ServerAliveInterval 30
    HostName 中间机(公网机)host
    User root
    Port 11122
    IdentityFile ~/.ssh/id_rsa

# -N 表示不执行远程命令，如果不加入这个选项，就会在创建隧道的时候，也直接登陆进相应主机了。此选项适用于只进行端口转发的情况。 
# -R 表示创建反向隧道。是Remote的简写
# -f 后台运行
ssh -NR *:8888:127.0.0.1:22 sshh # <任何主机>可访问
ssh -NR 8888:127.0.0.1:22 sshh # 仅<中间机>可访问
```

**版本2：autossh实现, 断开自动重连**

```bash
apt install autossh

# 需配置免密登录中间机

# -M 4010”意思是使用内网主机 A 的 4010 端口监视 SSH 连接状态，连接出问题了会自动重连
# -N 不执行远程命令
# -R 意思是将中间机的某个端口转发到本地指定机器的指定端口
##  8888:127.0.0.1:22 -> 中间机转发端口8888:本机ip127.0.0.1:本机ssh端口22
# user@ip -> 中间机用户名@中间机ip/域名
# -p port -> 中间机ssh端口,默认22可不加此参数
autossh -M 4010 -N -R 8888:127.0.0.1:22 user@ip (-p port)

#配置AutoSSH开机自启动，根据linux版本设置
```

**连接**

`ssh 内网机用户名@中间机ip -p 中间机映射端口`


# 键盘

## 设置默认为F1~F12

描述：顶部一排功能键区 (F1~F12) 的默认行为控制屏幕亮度、音量等功能键，F1~F12键需要 Fn 键一起才能触发。

```bash
# 0  禁用功能键，按 ‘Fn’ + ‘F8’ 等同于 F8
# 1  默认功能键，按 ‘F8’ 触发功能键 (play/pause)，按 ‘Fn’ + ‘F8’ 触发 F8 键
# 2  默认非功能键，按 ‘F8’ 触发 F8 键，按 ‘Fn’ + ‘F8’ 触发功能键 (play/pause)

# 方案1: 重启失效
echo 2 > /sys/module/hid_apple/parameters/fnmode


# 方案2: 永久生效
vi /etc/modprobe.d/hid_apple.conf
## ---------- 修改或添加 ----------
options hid_apple fnmode=2
# 有时候系统可能会使用缓存的 initramfs 而忽略新的模块参数设置。
# 可以尝试更新 initramfs
sudo mkinitcpio -P

# wayland 校验
wev
# xprop 校验
xev
## ---------- end ----------
```

## gentoo 设置

**官方说明, 无用**

`https://wiki.gentoo.org/wiki/Apple_Keyboard`

**开机启动脚本方式(ok)**

```sh
# 1. edit shell
doas vi /etc/local.d/fn_F1-F12.start
    ## ------ add -----
    echo 2 > /sys/module/hid_apple/parameters/fnmode
# 2. give shell run power
doas chmod a+x /etc/local.d/fn_F1-F12.start

# 3. restart test
```


# 默认程序

## 默认终端APP

```sh
# text editor default
export EDITOR=/usr/bin/vim
```

## 默认启动程序

```sh
vi ~/.config/mimeapps.list
## -------- 修改 ----------- 
[Default Applications]
inode/directory=org.kde.dolphin.desktop
## -------- 修改 ----------- 
```

# .desktop

- `/usr/share/applications`
- `~/.local/share/applications`



# 字体

```sh
# 中文
emerge media-fonts/noto-cjk

# 查看安装的字体
fc-match -a

# 手动安装字体
cd /usr/share/fonts/myfont/
cp *.ttf ./
## or
cd ~/.local/share/fonts/myfont/
cp *.ttf ./

## 然后执行
mkfontscale
mkfontdir

# also exec next command only
fc-cache -fv
```

## chrome demo

```sh 
# PingFang(mac font)
Standard font: PingFang SC
Sans-serif font: Monospace
Fixed-width font: Source Code Pro
Mathematical font: Source Code Pro
```

## firefox demo

```sh
Fonts fot: Simplified Chinese
# all set to PingFang SC
等宽字体: SourceCodeVF
```

# bluetooth

## 基础命令

```bash
# systemd
systemctl enable bluetooth
systemctl status bluetooth
systemctl start bluetooth
systemctl stop bluetooth
```

# ToucbScreen

## 触摸不准