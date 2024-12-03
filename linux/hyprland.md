# config

- [conf](file/hyprland/hyprland.conf)

# shell

## rofi -show window 自动聚焦窗口脚本

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