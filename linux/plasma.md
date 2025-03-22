# 语言

## LANG=zh_CN

没有字符集 编辑 `~/.config/plasma-localerc` 手动修改


## 样式

```bash
# 系统样式路径
/usr/share/plasma

# plasma视觉风格
~/.local/share/plasma/desktoptheme
# 全局主题
~/.local/share/plasma/look-and-feel
# 挂件
~/.local/share/plasma/plasmoids
```

# Trouble

## wifi问题

- 描述： 连接wifi显示 一直显示正在等待授权， 
- 解决： kde wallet密码问题，开始菜单搜索wallet 输入密码即可

## 触摸屏问题

1. 查看设备调试事件: `sudo libinput debug-events`
2. 异常情况触摸屏幕右下角时有这样一行输出
    - `event22  TOUCH_MOTION     2 +221.281s	0 (0) 30.81/19.24 (1262.00/788.00mm)`
    - 正常:  `event11  TOUCH_MOTION              2 +10.025s	0 (0) 97.11/98.00 (1243.00/784.00mm)`
    - 座标: 异常`30.81/19.24`  VS  正常`97.11/98.00`
3. `sudo dmesg | grep -i goodix`
    - `[    3.614555] Goodix-TS i2c-GDIX1002:00: Error reading 1 bytes from 0x8140: -121` 异常情况会出现此行
    - `[    3.636057] Goodix-TS i2c-GDIX1002:00: Error reading 1 bytes from 0x8140: -121` 异常情况会出现此行
    - `[    3.747134] Goodix-TS i2c-GDIX1002:00: ID 911, version: 1060`
    - `[    3.753146] Goodix-TS i2c-GDIX1002:00: Invalid config (0, 0, 0), using defaults` 异常情况会出现此行