# config

- [~/.config/hypr/hyprland.conf](file/hyprland/hyprland.conf)

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

# waybar

## install

`sudo pacman -S waybar`

## config

- [~/.config/waybar/config](file/waybar/02hyprland/config)
- [~/.config/waybar/style.css](file/waybar/02hyprland/style.css)

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