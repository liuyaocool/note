# QEMU/KVM 虚拟机

## virt网络设置

### wifi桥接

1. 网卡开启4addr (WDS)**: 主要用于无线分布式系统(WDS)和桥接场景
   -  ```bash
      sudo iw dev wlan0 set 4addr on  # 启用4地址模式
      sudo ip link set wlan0 down     # 先禁用接口
      sudo ip link set wlan0 up       # 重新启用
      ```
2. virt修改网卡配置为: macvtap

## archlinux安装

```bash
sudo pacman -S libvirt 
sudo pacman -S qemu-base
# 可视化
sudo pacman -S virt-manager

# 添加至用户组 libvirt
sudo usermod -aG libvirt $USER

# 重启防火墙和libvirt
sudo systemctl restart firewalld 
sudo systemctl restart libvirtd
```

## 添加虚拟机

打开virt-manager -> 文件 -> 添加连接 -> 选QEMU/KVM -> 点“连接”

## 驱动程序

右键 复制链接 到下载器下载

- [win虚拟机驱动(spice-guest 从gitee raw)](https://gitee.com/liuyao_cool/linux-wm/raw/master/doc/spice-guest-tools-latest.exe)
- [win虚拟机驱动(spice-guest 从cloudflare)](https://resource.liuyao.link/file/spice-guest.exe)

## 一些错误

1. 不支持qxl
   - 安装 `qemu-hw-display-qxl`  
2. unknown audio driver 'spice'
   - 安装 `qemu-audio-spice `
3. -chardev spicevmc,id=charchannel0,name=vdagent:'spicevmc' is not a valid char driver name
   - 安装 `qemu-chardev-spice`


# Windows相关

## 添加共享目录 未成功

1. 虚拟机添加硬件 Filesystem
   - 驱动: virtio-9p
   - Source path: 要共享的目录
   - Target path: 自定义目标名称
2. windows安装驱动: https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md
   - 去磁盘管理中挂载磁盘
   - ？？没有成功
