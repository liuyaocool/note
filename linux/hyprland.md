# config

- [~/.config/hypr/hyprland.conf](file/hyprland/hyprland.conf)

# 多屏类dwm配置

## ~~官方推荐(容易崩溃)~~

1. 安装插件
    ```bash
    hyprpm add https://github.com/zjeffer/split-monitor-workspaces # Add the plugin repository
    hyprpm enable split-monitor-workspaces # Enable the plugin
    hyprpm reload # Reload the plugins
    ```
2. Hyprland.conf配置插件: [~/.confi/hypr/hyprland.conf](file/hyprland/02dwmlike/hyprland.conf) <-点击下载
    ```conf
    bind = $MOD, j, focusmonitor, l
    bind = $MOD, l, focusmonitor, r
    # 向右移动：将当前窗口移动到其他显示器的当前工作区
    bind = $MOD SHIFT, j,  split-changemonitorsilent, -1
    bind = $MOD SHIFT, l, split-changemonitorsilent, +1

    plugin {
        split-monitor-workspaces {
            count = 10
            keep_focused = 0
            enable_notifications = 0
            enable_persistent_workspaces = 1

            # set this to 1 for gnome-like workspace switching
            link_monitors = 0

            # if you want a different monitor order
            # monitor_priority = DP-1, DVI-D-1

            # you can also set max workspaces per monitor
            # max_workspaces = DP-1, 9
            # max_workspaces = DVI-D-1, 5
        }
    }
    bind=$MOD,20,split-workspace,-1
    bind=$MOD,21,split-workspace,+1
    bind=$MOD SHIFT,20,split-movetoworkspacesilent,-1
    bind=$MOD SHIFT,21,split-movetoworkspacesilent,+1
    bind=$MOD,1,split-workspace,1
    bind=$MOD,2,split-workspace,2
    ...
    bind=$MOD SHIFT,1,split-movetoworkspacesilent,1
    bind=$MOD SHIFT,2,split-movetoworkspacesilent,2
    ...
    ```
3. 配置waybar
    - [~/.config/waybar/config](file/waybar/03HyprlandDwmlike/config)
    - [~/.config/waybar/style.css](file/waybar/03HyprlandDwmlike/style.css)

## 自己的配置

> 官方支持左右屏切换和左右屏移动，只需实现当前显示器的切换即可

1. 主要是 切换workspace 和 将窗口移动到workspace
2. 安装 [github](https://github.com/liuyaocool/hyprland-exp)
3. 配置waybar
    - 安装: `yay -S waybar-cava-git`
    - [~/.config/waybar/config](file/waybar/03HyprlandDwmlike/config)
    - [~/.config/waybar/style.css](file/waybar/03HyprlandDwmlike/style.css)
    - [~/.config/waybar/cava](file/waybar/03HyprlandDwmlike/cava)
4. 安装图标
    - [ ~/.local/share/fonts/waybar-icon.ttf](file/waybar/03HyprlandDwmlike/waybar-icon.ttf)
    - [ ~/.local/share/fonts/waybar-cava-bar32.ttf](file/waybar/03HyprlandDwmlike/waybar-cava-bar32.ttf)
    - 执行 `fc-cache -fv`

### 字体 waybar-cava-bar32.ttf 生成方法
1. 安装软件fontforge: `sudo pacman -S fontforge`
2. 创建文件 `bar32.py`, 内容如下
    ```python
    import fontforge

    NAME = "waybar-cava-bar32"
    EM = 2048 # 高度
    WIDTH = 800 # 宽度
    LEVELS = 32 # 高度平分字符个数
    ASCENT = 1900
    DESCENT = 148
    STEP = EM // LEVELS
    START = 0xE000
    
    font = fontforge.font()
    font.fontname = NAME
    font.familyname = NAME
    font.fullname = NAME
    font.em = EM
    font.ascent = ASCENT
    font.descent = DESCENT
    BOTTOM = -DESCENT
    for i in range(LEVELS):
        code = START + i
        glyph = font.createChar(code)
        height = STEP * i + 1
        pen = glyph.glyphPen()
        # 真正贴底
        pen.moveTo((0, BOTTOM))
        pen.lineTo((WIDTH, BOTTOM))
        pen.lineTo((WIDTH, BOTTOM + height))
        pen.lineTo((0, BOTTOM + height))
        pen.closePath()
        glyph.width = WIDTH

    font.generate(NAME + ".ttf")
    print("Generated " + NAME + ".ttf")
    ```
3. 执行 `fontforge -script bar32.py` 生成图标

# shell

## ~~rofi -show window 自动聚焦窗口脚本 (新版本使用以上配置已经默认启用)~~

`vim hypr_ipc`

```bash
#!/bin/sh

handle() {
	echo $1
  case $1 in urgent*)
	sleep 0.1 && hyprctl dispatch focusurgentorlast ;;
  esac
}

socat -U - UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read -r line; do handle "$line"; done
```

# rofi

## install
```bash
git clone https://github.com/lbonn/rofi.git
cd rofi
meson setup build
ninja -C build

# test run
./build/rofi -show drun
```

## config



# 截图

- 截图编辑: `grim -g "$(slurp)" - | swappy -f -`
- 截图复制: `grim -g "$(slurp)"  - | wl-copy`
- 复制程序: `sudo pacman -S wl-clipboard`

> grim slurp 不需配置

## swappy config 图片标记(截图)

`~/.config/swappy/config `

```ini
[Default]
# save_dir=$HOME/Desktop
save_dir=/tmp
save_filename_format=screenshot-%Y%m%d-%H_%M_%S.png
show_panel=true
line_size=2
text_size=16
text_font=sans-serif
paint_mode=brush
early_exit=false
fill_shape=false
```