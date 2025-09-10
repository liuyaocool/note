# 路由介绍

[路由统计网站](https://mao.fan/select)

## 芯片对比

| 芯片     | 算力   | CPU                    | NPU    | NAT峰值   | 64字节包转发率 |    版本      | 无线速率(Mbps) 2.4G+5G |
| ------- | ------ | ---------              | ----   | ---      | ---         | ---------    | ---         |
| MT7986A | 18,400 | 2 * 2.0GHz ARM-A53     | 双核    | 4.8 Gbps | 7.14 Mpps   | 中高端 wifi6  | 1148 + 4804 |
| BCM4912 | 18,400 |                        |        |           |             |              |             |
| BCM6765 | 18,400 |                        |        |           |             |              |             |
| BCM4908 | 16,560 |                        |        |           |             |              |             |
| IPQ6010 | 16,560 |                        |        |           |             |              |             |
| MT7986B | 14,720 |                        |        |           |             |              |             |
| IPQ5322 | 13,800 |                        |        |           |             |              |             |
| MT7981B |  5,980 | 1 * 1.3GHz ARM-A53     | 单核    | 2.4 Gbps  | 3.57 Mpps   | wifi6        | 574 + 2402  |
| MT7621A |  2,816 | 2 * 880MHz MIPS-1004Kc | CPU处理 |   1 Gbps  | 1.488 Mpps  | wifi5        | 外接芯片1200 |

- 64字节小包: 
    - 64字节包 转发性能最低, 所以用这个衡量
    - (64+20) * 8 --> (数据包大小 + 开销) × 8
    - 包转发率: `3.57 Mpps ≈ 2.4 Gbps / ((64+20) * 8)`
- NPU: 网络处理单元
    - NAT: 网络地址转换
- Mpps: **每秒个数**, Million Packets per second, 数据包转发能力, 表示每秒钟能够处理多少百万个数据包（Packet）
- Mbps: **每秒总量**, Megabits per second 兆比特每秒, 数据传输速率, 表示每秒钟可以传输多少兆个比特（bit）
- Gbps: **每秒总量, 同上**, Gigabits per second 千兆比特每秒
    - G = Giga（千兆，十亿，即 10^9）
    - b = bits（比特）
    - p = per（每）
    - s = second（秒）

### 算力(DMIPS)计算方法

DMIPS（Dhrystone MIPS）是一种经典的CPU整数运算能力基准。计算通常基于以下公式：
    
    总DMIPS = CPU核心数 × 主频(MHz) × DMIPS系数()

```
如MT7986A算力：
    核心数：4
    主频：2000 MHz
    系数: 2.3
    总DMIPS: 4 × 2000 × 2.3 = 18,400
```

### DMIPS系数表

每MHz的DMIPS值, 根据官方数据和行业标准:

| 架构         | 系数(DMIPS/MHz) |
| -------     | --- |
| MIPS-1004Kc | 1.6 |
| Cortex-A53  | 2.3 |


## 各芯片路由器推荐

### MT7986A AX6000

| 型号            | 内存     | 闪存   |  eMMC  |  2.5G网口         | USB     |
| :-------       | -----    | ---   | -----  | ------            | -----   |
| 红米AX6000      | 512M     | 128M  |   no   |  no               | no      |
| 锐捷X60Pro      | 512M     | 128M  |   x    | 1 = 1 wan/lan     | no      |
| 磊科N60Pro      | 512M/2G  | 128M  |   x    | 2 = 1 wan + 1 lan | USB3.0  |
| XDR6088        |          |       |        |                    |         |
| 爱快Q6000       |          |       |        |                    |         |
| 京东云AX6000百里 |          |       |        |                    |         |

- eMMC： 嵌入式存储

### MT7981B AX3000

| 型号                 | 内存  | 闪存   | eMMC  | USB    |
| :-------            | ----- | ---   | ----- | -----  |
| 360T7               | 256M  | 128M  |   x   |   x    |
| 小米WR30U           | 256M  | 128M  |   x   |   x    |
| 小米AX3000T         | 256M  | 128M  |   x   |   x    |
| 新华三NX30Pro        | 256M  | 128M  |   x   |   x    |
| CMCC RAX3000M算力版  | 512M  |   x   |  64G  | USB3.0 |
| 思创CT3003(电信)     | 256M  | 128M  |   x   |   x    |
| 诺基亚贝尔AX3000     | 256M  | 128M  |   x   |   x    |
| 司络SL3000          | 1G    | 32M   |  128G |   x    |

### MT7621A

热门机型： 
- 斐讯K2P(推荐)
- 红米AC2100(推荐)
- 小米R3G
- 极路由B70
- 新路由3
- 京东无线宝一代(推荐)
- 友华WR1200JS、
- 360P2 (128M内存+60M闪存)

# ImmortalWrt

OpenWRT 大陆优化版

# OpenWRT

## opkg

```bash
opkg update
opkg search

```

## 安装

1. 下载 https://firmware-selector.openwrt.org/ 按cpu型号下载固件
2. 刷入固件: 各型号自行查找教程，本文后边提供360P2路由

## 更换国内镜像 更新

see: https://mirrors.ustc.edu.cn/help/openwrt.html

```bash
# 备份
cd /etc/opkg
cp distfeeds.conf distfeeds.conf.bak
# 换源
sed -i 's/downloads.openwrt.org/mirrors.ustc.edu.cn\/openwrt/g' /etc/opkg/distfeeds.conf

# 若此命令出现证书错误 更新系统时间
opkg update
```

## 修改密码

浏览器打开 `192.168.1.1`, 帐号root，无密码 直接登录后修改密码, 之后即可用ssh登录进行操作了

## 修改网络, 配置静态ip

- `vim /etc/config/network`
-   ```bash
    config interface 'lan'
        option device 'br-lan'
        option proto 'static'
        option ipaddr '192.168.3.36'
        option netmask '255.255.255.0'
        option gateway '192.168.3.1'
        option dns '8.8.8.8 114.114.114.114'
        # option ip6assign '60'
    ```

## 硬盘不够，usb扩展

> 此文档不适合linux小白, 看不懂请移步 [官方文档](https://openwrt.org/docs/guide-user/additional-software/extroot_configuration)

### 环境说明

- 刷机时间: 2025-08-11
- 设备: 360 P2路由器
- 固件版本: [openwrt-24.10.2-ramips-mt76x8-mediatek_mt7628an-eval-board-squashfs-sysupgrade.bin](https://resource.liuyao.link/file/360P2/openwrt-24.10.2-ramips-mt76x8-mediatek_mt7628an-eval-board-squashfs-sysupgrade.bin)

### 1 准备

```bash
opkg update
opkg install block-mount kmod-fs-ext4 e2fsprogs parted kmod-usb-storage
# 查看设备
ls -l /sys/block
```

### 2. 分区 格式化 u盘

```bash
DISK="/dev/sda"
parted -s ${DISK} -- mklabel gpt mkpart extroot 2048s -2048s
DEVICE="${DISK}1"
mkfs.ext4 -L extroot ${DEVICE}
```

### 3. 配置 extroot

```bash
eval $(block info ${DEVICE} | grep -o -e 'UUID="\S*"')
eval $(block info | grep -o -e 'MOUNT="\S*/overlay"')
uci -q delete fstab.extroot
uci set fstab.extroot="mount"
uci set fstab.extroot.uuid="${UUID}"
uci set fstab.extroot.target="${MOUNT}"
uci commit fstab
```

### 4. 配置 rootfs_data / ubifs

```bash
ORIG="$(block info | sed -n -e '/MOUNT="\S*\/overlay"/s/:\s.*$//p')"
uci -q delete fstab.rwm
uci set fstab.rwm="mount"
uci set fstab.rwm.device="${ORIG}"
uci set fstab.rwm.target="/rwm"
uci commit fstab
```

### 5. 复制系统文件到u盘

```bash
mount ${DEVICE} /mnt
tar -C ${MOUNT} -cvf - . | tar -C /mnt -xf -
```

### 6. 重启

`reboot` or 断电重插

```bash
# 测试
root@OpenWrt:~# df -h
Filesystem                Size      Used Available Use% Mounted on
/dev/root                 4.0M      4.0M         0 100% /rom
tmpfs                    60.2M    176.0K     60.0M   0% /tmp
/dev/sda1                 3.6G      5.1M      3.3G   0% /overlay
overlayfs:/overlay        3.6G      5.1M      3.3G   0% /
tmpfs                   512.0K         0    512.0K   0% /dev
/dev/mtdblock6            2.2M      1.7M    484.0K  78% /rwm
```

## nginx

打开管理页面->系统->软件->搜索并安装

## openclash

[github原文档](https://github.com/vernesong/OpenClash/releases)

dnsmasq-full 安装失败: 卸载 `opkg remove dnsmasq`,  然后重新安装

## 软件

- git: `opkg install git git-http ca-bundle`

## 主题 argon

[github原文档](https://github.com/jerrykuku/luci-theme-argon/blob/master/README_ZH.md)

```bash
opkg install luci-compat
opkg install luci-lib-ipkg
# 下边网址打不开用可以这个: https://resource.liuyao.link/file/360P2/luci-theme-argon_2.3.2-r20250207_all.ipk
wget --no-check-certificate https://github.com/jerrykuku/luci-theme-argon/releases/download/v2.3.2/luci-theme-argon_2.3.2-r20250207_all.ipk
opkg install luci-theme-argon*.ipk
```

# 360p2 刷入 OpenWrt

## 刷机步骤

参考: https://zhuanlan.zhihu.com/p/668070367

1. 路由器用网线连接pc, 浏览器打开管理页面`xxx.xxx.x.1`
2. 降级固件
    - 防火墙设置->高级设置->系统升级
    - 使用手动升级
    - 选择 [360降级固件: 360POP-P2-V1.0.25.36330.bin](https://resource.liuyao.link/file/360P2/360POP-P2-V1.0.25.36330.bin)
    - 点确定, 等上传完成后重启
3. 调试固件: 找到系统升级，位置可能跟之前不一样了
    - 使用 [360调试固件: 360POP-P2-DEBUG-V1.0.42.42668.bin](https://resource.liuyao.link/file/360P2/360POP-P2-DEBUG-V1.0.42.42668.bin)
    - 操作同上
4. breed固件做成下载链接
    - 下载breed固件: [breed-mt7628-hiwifi-hc5661a.bin](https://resource.liuyao.link/file/360P2/breed-mt7628-hiwifi-hc5661a.bin)
    - 如果路由器能连接网络, 可以直接复制此链接， 跳到第4步
    - 不能联网:
        - [hfs](https://www.rejetto.com/hfs/)(小白推荐): `建议关闭wifi,如果插了其他网线也建议拔掉, 只保留360p2的有线连接, 360p2不要连接wan口`
        - [nginx](https://nginx.org/): 自行百度
5. 刷入breed
    - telnet连接:
        - 打开命令行, linux/mac用终端 windows用cmd
        - 输入 `telnet xxx.xxx.x.1` 连接
        - login 输入 admin
        - Password 输入 你的路由器密码, 如果不对输入12345678
        - 如果不会上述操作 window可用[PuTTY程序](https://resource.liuyao.link/file/360P2/puttytel.exe)
    - 连接成功后分别执行以下命令 **每条命令输入完后按回车**
        -   ```bash
            cd /tmp
            wget "breed固件做成的下载链接"
            mtd_write erase /dev/mtd1
            cat breed-mt7628-hiwifi-hc5661a.bin > /dev/mtd1
            ```
6. 刷入openwrt/immortalWrt
    - [官网](https://firmware-selector.openwrt.org/) 中找到 MediaTek MT7628 下载固件
    - 路由器断电，按住reset后通电
    - 浏览器打开: `192.168.1.1` -> `固件更新` -> `固件` -> `上传`, 完成后重启路由 刷新页面
    - 后续设置见本文 OpenWRT

## 5G频段不能用

由于 mt7612 闭源 所以没有相应的开放固件

opkg search kmod-mt76x2