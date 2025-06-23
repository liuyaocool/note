# EndeavourOS

## 关闭开机自启 登录管理器+桌面

1. `sudo systemctl disable sddm`
2. 重启

# 系统更新问题

## 包冲突

```bash
vim /etc/pacman.conf
# 添加以下行
IgnorePkg = libxml2

# 重新升级
```

## 升级中断导致pacman不可用

1. `wget https://archive.archlinux.org/packages/i/icu/icu-72.1-1-x86_64.pkg.tar.zst`
2. `sudo tar -xvf icu-72.1-1-x86_64.pkg.tar.zst -C /`
3. `sudo pacman -Syyu`
4. ok