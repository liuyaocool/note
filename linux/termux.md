
# 安装

```sh
# 修改默认终端
chsh -s zsh 用户名
chsh -s tmux 用户名

# ssh 默认端口：8022
```

# 换源

中科大源站

1. 运行 `termux-change-repo`
2. 空格选中 `Single mirror`, 点Ok
3. 空格选中 `mirrors.ustc.edu.cn`, 点Ok
4. 运行 `pkg upgrade`

# 软件


# 安卓12杀进程

问题android12 phantom pricess killing

Android12+在使用Termux时，有时会显示`[Process completed (signal 9) - press Enter]`，这是因为Android12的PhantomProcesskiller限制了应用的子进程，最大允许应用有32个子进程

解决方式:

1. 开启开发者模式, 打开手机设置 -> 关于手机 -> 版本设置 -> 连续点击5次“版本号” -> 输入密码 (若找不到 自行百度手机型号)
2. 打开Termux, 输入 `pkg install android-tools` 并浮窗termux
4. 配置无线调试, 设置 -> 系统设置 -> 开发者设置 -> 打开无线调试
5. 记住显示的IP地址和端口，在termux中输入`adb pair 192.168.0.103:45367`
6. 当显示“Enter pairing code:”时，输入配对码链接, 链接到adb, 复制IP地址以留备用。
7. 输入`adb connect 192.168.0.103:4`, 当输出以下表示连接成功
    - daemon not running; starting now at tcp:5037
    - daemon started successfully
    - connected to 192.168.0.103:41249
8. 设置最大子进程是65536: 
    - `adb shell device_config set_sync_disabled_for_tests persistent`
    - `adb shell device_config put activity_manager max_phantom_processes 65536`

# 配置

- 颜色: [~/.termux/colors.properties](file/termux/colors.properties)
- 字体(UbuntuMono): [~/.termux/font.ttf](file/termux/font.ttf)
- 界面配置: [~/.termux/termux.properties](file/termux/termux.properties)

## 颜色配置

` ~/.termux/colors.properties `

```properties
# flat.colors
# Color scheme from https://github.com/Mayccoll/Gogh
color1=#0000ff
color3=#ffff00
color5=#00ffff
color6=#ff00ff
color7=#ffffff
color8=#f0f0f0
color11=#f0f0f0
# zsh .zip .tar.gz
color9=#a80909
# zsh username background, zsh current path foreground
color0=#006054
# zsh current path background
color4=#cecb00
# exec
color10=#23fd00
# folder
color12=#cecb00
# bash command line folder path
color2=#23fd00
# bash command line "$"
color15=#23fd00
# properties value
color13=#00ff00
# properties key / note / ln
color14=#f6903b
background=#000000
#foreground=#d1ba74
#cursor=#1abc9c
cursor=#d1ba74
foreground=#00ffa8
```

## 界面配置

` ~/.termux/termux.properties `

```properties
extra-keys = [ \
    [ESC, '[',  ']', '{', '}', '+', '=', '~/', UP, BACKSLASH], \
    [TAB, CTRL, '"', '<', '>', {macro: '$PREFIX/', display:'根'}, '|', LEFT, DOWN, RIGHT] \
]
```

```bash
extra-keys = [ \    
    [ESC, '[',  ']', '{', '}', '+', '=', '`', UP, BACKSLASH], \
    [TAB, CTRL, '"', '<', '>', {macro: '$PREFIX/', display:'根'}, '|', LEFT, DOWN, RIGHT] \
]
```

```bash
extra-keys = [ \
        [ESC, '[',  ']', '{', '}', '~/', '+', '=', UP, {macro: "CTRL b c", display: "[+]"}], \
        [TAB, CTRL, '"', '<', '>', {macro: '$PREFIX/', display:'根'}, '|', LEFT, DOWN, RIGHT] \
]
```