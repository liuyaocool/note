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

# ImmortalWRT

OpenWRT 大陆优化版

## 配置旁路由

1. 网络 -> 接口 -> “编辑lan”
    - 常规设置
        - 协议: 静态地址
        - IPv4地址: 192.168.x.2
        - IPv4网关: 192.168.x.1
    - DHCP服务 -> 常规设置
        - 忽略此接口: 勾选
2. 路由器lan口接旁路由lan口
3. 本机无法上网
    - 网络 -> 接口
    - 添加 DHCP client

## 配置中科大源

https://mirrors.ustc.edu.cn/help/immortalwrt.html

```bash
sed -e 's|https://downloads.immortalwrt.org|https://mirrors.ustc.edu.cn/immortalwrt|g' \
    -e 's|https://mirrors.vsean.net/openwrt|https://mirrors.ustc.edu.cn/immortalwrt|g' \
    -i.old /etc/opkg/distfeeds.conf
```

## 配置nas

```bash
# 安装 samba4-server luci-app-samba4(Web管理端)
```

## nginx

### 安装

`opkg install openssl-util nginx-full`

### 根配置

`vim /etc/nginx/nginx.conf`

```conf
user root;
worker_processes 1;

pid /etc/nginx/nginx.pid;

events {
    worker_connections 512;
    use epoll;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    gzip on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    include /etc/nginx/conf.d/*.conf;
}
```

### 配置nginx代理uhttpd

1. 修改uhttpd端口: `vim /etc/config/uhttpd`
2. 配置nginx添加 server, `vim /etc/nginx/conf.d/luci.conf`
    ```conf
    server {
        listen 80;
        listen [::]:80;
        server_name _;
        location / {
            proxy_pass  http://127.0.0.1:81/;
        }
    }
    ```

### 文件服务器(不推荐)

> 路由器专门做网络转发就行了, 添加其他功能 其实是增加负担(路由器的运算能力并不高, 高的只有网络处理能力), 如果没有其他nas可用 再通过路由器配置nas
 
`vim /etc/nginx/conf.d/fs.conf`

```conf
server {
    listen 80;
    server_name fs.com;
    charset utf-8;
    location / {
        # 这里可配置html文件管理web界面
    }
    location /api {
        alias /mnt/sda2;
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
        autoindex_format json;
        default_type application/json;
        charset utf-8;
    }
}
```

## vim

- type vim: `vim is an alias for vi`
- 安装: `opkg install vim`
- `vim ~/.vimrc`
    ```vim
    set tabstop=4       " 设置制表符宽度为 4
    set shiftwidth=4    " 设置自动缩进宽度为 4
    " 始终开启 paste 模式（不推荐）
    set paste
    " 同时禁用一些可能冲突的功能
    set noautoindent
    set nosmartindent
    set nocindent
    set formatoptions=
    ```
- `vim ~/.profile`
    ```bash
    export TERM=ansi
    ```

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

# cmccRax3000m刷机

## 版本介绍

- NAND（普通版）: 只有CH
- EMMC（算力版）: CH后面还跟着EC
    - <img src="/network/img/rax3000mEMMC.jpg" alt="image"/>

## 相关教程

- uboot源码: https://github.com/lgs2007m/bl-mt798x
- openwrt固件
    - https://github.com/lgs2007m/Actions-OpenWrt
    - https://github.com/AngelaCooljx/Actions-rax3000m-emmc

## 步骤1. 开ssh
    
1. 登录原网址 -> 更多 -> 管理 -> 配置管理 -> 导出文件
2. 导出的文件上传linux, 执行 `openssl aes-256-cbc -d -pbkdf2 -k $CmDc#RaX30O0M@\!$ -in cfg_export_config_file.conf -out - | tar -zxvf -`
    - 如果报错`bad magic number`说明不需要解密, 直接执行`tar -zxvf cfg_export_config_file.conf`
3. 得到etc目录
4. 启动ssh登录: 修改`etc/config/dropbear` 中的 `option enable '0'` -> `option enable '1'`
5. 去除root密码: 修改`etc/shadow` 中 `root:xxx:19179:0:99999:7:::` -> `root::19179:0:99999:7:::`
6. 重新打包
    - 加密版本: `tar -zcvf - etc | openssl aes-256-cbc -pbkdf2 -k $CmDc#RaX30O0M@\!$ -out cfg_export_config_file_new.conf`
    - 无加密版本: `tar -zcvf  cfg_export_config_file_new.conf etc`
    - 这里会报错 `权限不够` 和 `tar: 由于前次错误，将以上次的错误状态退出`, 不用管
    - 使用WSL或虚拟机不会出错
7. 到导出配置的位置， 选择文件->导入配置
8. 直接ssh即可登录

## 步骤2. 备份

### NAND 普通版

```bash
# 1. 检查分区表
root@RAX3000M:~# cat /proc/mtd
dev:    size   erasesize  name
mtd0: 08000000 00020000 "spi0.0"
mtd1: 00100000 00020000 "BL2"
mtd2: 00080000 00020000 "u-boot-env"
mtd3: 00200000 00020000 "Factory"
mtd4: 00200000 00020000 "FIP"
mtd5: 03d00000 00020000 "ubi"
mtd6: 02500000 00020000 "plugins"
mtd7: 00800000 00020000 "fwk"
mtd8: 00800000 00020000 "fwk2"

# 2. 备份第一个分区, 第一个分区有点大, 之后下载删除
dd if=/dev/mtd0 | gzip >/tmp/mtd0_spi0.0.bin.gz
# 之后备份其他分区就行了
dd if=/dev/mtd1 of=/tmp/mtd1_BL2.bin
dd if=/dev/mtd2 of=/tmp/mtd2_u-boot-env.bin
dd if=/dev/mtd3 of=/tmp/mtd3_Factory.bin
dd if=/dev/mtd4 of=/tmp/mtd4_mtd4_FIP.bin
dd if=/dev/mtd5 of=/tmp/mtd5_ubi.bin
dd if=/dev/mtd6 of=/tmp/mtd6_plugins.bin
dd if=/dev/mtd7 of=/tmp/mtd7_fwk.bin
dd if=/dev/mtd8 of=/tmp/mtd8_fwk2.bin
```

### EMMC 算力版

> 准备一个不小于60G的U盘

```bash
# 这里可插入外接存储 直接备份到外接存储里
dd if=/dev/mmcblk0p1 of=/mnt/mmcblk0p12/mmcblk0p1.bin
dd if=/dev/mmcblk0p2 of=/mnt/mmcblk0p12/mmcblk0p2.bin
dd if=/dev/mmcblk0p3 of=/mnt/mmcblk0p12/mmcblk0p3.bin
dd if=/dev/mmcblk0p4 of=/mnt/mmcblk0p12/mmcblk0p4.bin
dd if=/dev/mmcblk0p5 of=/mnt/mmcblk0p12/mmcblk0p5.bin
dd if=/dev/mmcblk0p6 of=/mnt/mmcblk0p12/mmcblk0p6.bin
dd if=/dev/mmcblk0p7 of=/mnt/mmcblk0p12/mmcblk0p7.bin
dd if=/dev/mmcblk0p8 of=/mnt/mmcblk0p12/mmcblk0p8.bin
dd if=/dev/mmcblk0p9 of=/mnt/mmcblk0p12/mmcblk0p9.bin
dd if=/dev/mmcblk0p10 of=/mnt/mmcblk0p12/mmcblk0p10.bin
dd if=/dev/mmcblk0p11 of=/mnt/mmcblk0p12/mmcblk0p11.bin
```

```bash
# 最后一个分区有点大 通过usb外接一个U盘或硬盘(60G+) 直接备份到U盘
mv /mnt/mmcblk0p12/*.bin /mnt/usb/sda2/
dd if=/dev/mmcblk0p12 of=/mnt/usb/sda2/mmcblk0p12.bin
```
**备份结果**

```bash
root@RAX3000M:/mnt/usb/sda2# ls -lh
-rwxr-xr-x    1 root     root      512.0K Oct  1 19:48 mmcblk0p1.bin
-rwxr-xr-x    1 root     root       16.0M Oct  1 19:49 mmcblk0p10.bin
-rwxr-xr-x    1 root     root       16.0M Oct  1 19:49 mmcblk0p11.bin
-rwxr-xr-x    1 root     root       57.1G Oct  1 23:24 mmcblk0p12.bin
-rwxr-xr-x    1 root     root        2.0M Oct  1 19:48 mmcblk0p2.bin
-rwxr-xr-x    1 root     root        2.0M Oct  1 19:48 mmcblk0p3.bin
-rwxr-xr-x    1 root     root       32.0M Oct  1 19:48 mmcblk0p4.bin
-rwxr-xr-x    1 root     root       64.0M Oct  1 19:48 mmcblk0p5.bin
-rwxr-xr-x    1 root     root       32.0M Oct  1 19:48 mmcblk0p6.bin
-rwxr-xr-x    1 root     root       64.0M Oct  1 19:49 mmcblk0p7.bin
-rwxr-xr-x    1 root     root      256.0M Oct  1 19:49 mmcblk0p8.bin
-rwxr-xr-x    1 root     root       64.0M Oct  1 19:49 mmcblk0p9.bin
```
## 步骤3. 刷入Uboot

### H大 ?? 不适用emmc

> 参照: https://blog.iplayloli.com/rax3000m-router-flashing-explanation-nanny-tutorial-easy-to-get-started.html

1. [uboot Github](https://github.com/hanwckf/bl-mt798x/releases) 中下载刷机固件压缩包
2. 将 `mt7981_cmcc_rax3000m-fip-fixed-parts.bin` 解压出来
3. 上传到 路由器 `/tmp` 目录
4. 刷写uboot `mtd write mt7981_cmcc_rax3000m-fip-fixed-parts.bin FIP`
5. 刷完后第一次重启会进入刷机模式
6. 第二次重启后每次刷写新固件时**断电长按reset后接入电源**
7. 旧版本需把电脑设置IP为 192.168.1.2
8. 浏览器打开192.168.1.1
9. 选择固件上传更新

### 官方步骤 ?? 不适用emmc

> 参考: https://github.com/immortalwrt/immortalwrt/discussions/1666  
> https://www.right.com.cn/forum/thread-8338290-1-1.html

1. 解锁SSH 备份, 上边找
2. 下载官方固件，注意：官方OP只能用官方提供的uboot，H大的uboot（截至写稿时的20231124版本）暂不支持刷入官方op。
    - https://firmware-selector.immortalwrt.org/
    - 更换最新版本刷机
    - 注意需要下载这三个文件。KERNEL下载后重命名为openwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery.itb
3. 刷入uboot，将NAND-BL31-UBOOT.FIP上传/tmp，使用命令 mtd write /tmp/《.FIP文件的名字》 FIP 刷写uboot
4. 将电脑有线网卡IP设置为192.168.1.254，打开TFTPd（注意开放防火墙），选择KERNEL文件所在的目录，注意确认名字为openwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery.itb
5. 路由器连接电脑，重启，等待TFTP传输完毕，并进入op后台，http:/192.168.1.1/cgi-bin/luci/admin/system/flash
6. 上传sysupgrade 镜像并更新，等待重启，刷机完毕。
7. 定制固件: https://openwrt.ai/?target=mediatek%2Ffilogic&id=cmcc_rax3000m-emmc

### ImmortalWRT官方 emmc算力版

> 更换Uboot？？: https://www.right.com.cn/forum/thread-8418450-1-1.html

> [官方文档](https://github.com/openwrt/openwrt/pull/13513) 找到: eMMC Flash instructions

> 或参考: https://blog.codee.top/rax3000m%E6%90%9E%E6%9C%BA%E7%9B%AE%E5%BD%95/

[官网下载固件](https://firmware-selector.immortalwrt.org/ )

**1. 三个文件刷uboot**

- **EMMC-BL31-UBOOT.FIP**: xxx-emmc-bl31-uboot.fip
- **EMMC-GPT.BIN**: xxx-emmc-gpt.bin
- **EMMC-PRELOADER.BIN**: xxx-emmc-preloader.bin

```bash
# 1. ssh
# 2. Write new GPT table
dd if=xxx-emmc-gpt.bin of=/dev/mmcblk0 bs=512 seek=0 count=34 conv=fsync
# 3. Erase and write new BL2
echo 0 > /sys/block/mmcblk0boot0/force_ro
dd if=/dev/zero of=/dev/mmcblk0boot0 bs=512 count=8192 conv=fsync
dd if=xxx-emmc-preloader.bin of=/dev/mmcblk0boot0 bs=512 conv=fsync
# 4. Erase and write new FIP:
dd if=/dev/zero of=/dev/mmcblk0 bs=512 seek=13312 count=8192 conv=fsync
dd if=xxx-emmc-bl31-uboot.fip of=/dev/mmcblk0 bs=512 seek=13312 conv=fsync
```

```bash
# 执行结果如下 如果报错 千万不要重启 网上找解决方案
root@RAX3000M:/tmp# dd if=imgpt.bin of=/dev/mmcblk0 bs=512 seek=0 count=34 conv=fsync
34+0 records in
34+0 records out
root@RAX3000M:/tmp# echo 0 > /sys/block/mmcblk0boot0/force_ro
root@RAX3000M:/tmp# dd if=/dev/zero of=/dev/mmcblk0boot0 bs=512 count=8192 conv=fsync
8192+0 records in
8192+0 records out
root@RAX3000M:/tmp# dd if=impre.bin  of=/dev/mmcblk0boot0 bs=512 conv=fsync
432+1 records in
432+1 records out
root@RAX3000M:/tmp# dd if=/dev/zero of=/dev/mmcblk0 bs=512 seek=13312 count=8192 conv=fsync
8192+0 records in
8192+0 records out
root@RAX3000M:/tmp# dd if=imbl31.fip of=/dev/mmcblk0 bs=512 seek=13312 conv=fsync
1689+1 records in
1689+1 records out
```

**2. 刷入系统**

- **KERNEL**: xxx-initramfs-recovery.itb
- **SYSUPGRADE**: xxx-squashfs-sysupgrade.itb

1. 断电按住reset后上电
2. 电脑设置ip `192.168.1.254` 注意必须254
3. 网关和DNS填入`192.168.1.1`
4. 打开tftp
    - 选中`immortalwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery.itb`所在目录
    - 其他不用动
    - 不是这个名字改成这个名字
    - 识别到后会自动上传
    - tftp下载: [github官网](https://github.com/PJO2/tftpd64/releases/) 下载`tftpd64_portable_v4.73.zip`
5. 上传完成后会自动进入路由器后台
6. 点击 转到固件升级
7. 点最后 刷写固件
8. 当前安装列表备份在 `/etc/backup/installed_packages.txt`
9. 完成

**3. 分配剩余空间**

> 刷好固件后，发现有50多G的空间不见了，这是因为分区表变了

```bash
opkg update
opkg install cfdisk
cfdisk /dev/mmcblk0
```
<pre>
                                                   Disk: /dev/mmcblk0
                                 Size: 57.62 GiB, 61865984000 bytes, 120832000 sectors
                              Label: gpt, identifier: 5452574F-2211-4433-5566-778899AABB00

    Device                            Start               End           Sectors           Size Type
    /dev/mmcblk0p1                     8192              9215              1024           512K Linux filesystem
    /dev/mmcblk0p2                     9216             13311              4096             2M Linux filesystem
    /dev/mmcblk0p3                    13312             21503              8192             4M EFI System
    Free space                        21504             24575              3072           1.5M
    /dev/mmcblk0p4                    24576             90111             65536            32M EFI System
    Free space                        90112            131071             40960            20M
    /dev/mmcblk0p5                   131072            745471            614400           300M unknown
    /dev/mmcblk0p128                     34              8191              8158             4M BIOS boot
    >>  Free space                       745472         120831966         120086495          57.3G   <span style="color: red">← 选中此处未用空间</span>


                        [   New  ]  [  Quit  ]  [  Help  ]  [  Sort  ]  [  Write ]  [  Dump  ]

                                        Create new partition from free space
</pre>
<pre>
                                                .....

    >>  Free space                       745472         120831966         120086495          57.3G                          

Partition size: 57.3G      <span style="color: red">← 这里继续回车</span>

                                        Create new partition from free space
</pre>
<pre>
                                                ......

    /dev/mmcblk0p6                   745472         120829951         120084480          57.3G Linux filesystem  <span style="color: red">← 这里改好了</span>
>>  /dev/mmcblk0p128                     34              8191              8158             4M BIOS boot

 <div style="border: white 1px solid;padding: 5px;"> Partition UUID: 5452574F-2211-4433-5566-778899AABB80
 Partition type: BIOS boot (21686148-6449-6E6F-744E-656564454649)</div>
             [ Delete ]  [ Resize ]  [  Quit  ]  [  Type  ]  [  Help  ]  [  Sort  ]  [  Write ]  [  Dump  ]
                                                                                         <span style="color: red">↑</span>
                                                                                      <span style="color: red">点击 输入yes 写入应用修改</span>

                                Write partition table to disk (this might destroy data)
</pre>

```bash
# 设置文件系统
mkfs.ext4 /dev/mmcblk0p6
# 挂载: 系统-> 软件包 -> 安装 'automount'
# 重启
```

# 挂载 overlay

登录后台管理界面， 找到 系统 -> 挂载点， 配置如下

```bash
UUID: xxx (/dev/mmcblk0p6, 57.26 GiB)	/overlay	auto (ext4)	    defaults
UUID: xxx (/dev/fit0, 8.57 MiB)	        /rom	    auto (squashfs) defaults
# 原overlay挂载点
UUID: xxx (/dev/fitrw, 283.87 MiB)	    /mnt/fitrw  auto (f2fs)	    defaults
```

### 官方原文

官方链接: [https://github.com/openwrt/openwrt/pull/13513](https://github.com/openwrt/openwrt/pull/13513)

<pre>
Hardware specification:
  SoC: MediaTek MT7981B 2x A53
  Flash: 64GB eMMC or 128 MB SPI-NAND
  RAM: 512MB
  Ethernet: 4x 10/100/1000 Mbps
  Switch: MediaTek MT7531AE
  WiFi: MediaTek MT7976C
  Button: Reset, Mesh
  Power: DC 12V 1A
- UART: 3.3v, 115200n8
  --------------------------
  |         Layout         |
  |   -----------------    |
  | 4 | GND TX VCC RX | <= |
  |   -----------------    |
  --------------------------

Gain SSH access:
1. Login into web interface, and download the configuration.
2. Enter fakeroot, decompress the configuration:
   tar -zxf cfg_export_config_file.conf
3. Edit 'etc/config/dropbear', set 'enable' to '1'.
4. Edit 'etc/shadow', update (remove) root password:
   'root::19523:0:99999:7:::'
5. Repack 'etc' directory:
   tar -zcf cfg_export_config_file.conf etc/
   * If you find an error about 'etc/wireless/mediatek/DBDC_card0.dat',
     just ignore it.
6. Upload new configuration via web interface, now you can SSH to RAX3000M.

Check stroage type:
Check the label on the back of the device:
"CH EC CMIIT ID: xxxx" is eMMC version
"CH    CMIIT ID: xxxx" is NAND version

eMMC Flash instructions:
1. SSH to RAX3000M, and backup everything, especially 'factory' part.
   ('data' partition can be ignored, it's useless.)
2. Write new GPT table:
   dd if=openwrt-mediatek-filogic-cmcc_rax3000m-emmc-gpt.bin of=/dev/mmcblk0 bs=512 seek=0 count=34 conv=fsync
3. Erase and write new BL2:
   echo 0 > /sys/block/mmcblk0boot0/force_ro
   dd if=/dev/zero of=/dev/mmcblk0boot0 bs=512 count=8192 conv=fsync
   dd if=openwrt-mediatek-filogic-cmcc_rax3000m-emmc-preloader.bin of=/dev/mmcblk0boot0 bs=512 conv=fsync
4. Erase and write new FIP:
   dd if=/dev/zero of=/dev/mmcblk0 bs=512 seek=13312 count=8192 conv=fsync
   dd if=openwrt-mediatek-filogic-cmcc_rax3000m-emmc-bl31-uboot.fip of=/dev/mmcblk0 bs=512 seek=13312 conv=fsync
5. Set static IP on your PC:
   IP 192.168.1.254, GW 192.168.1.1
6. Serve OpenWrt initramfs image using TFTP server.
7. Cut off the power and re-engage, wait for TFTP recovery to complete.
8. After OpenWrt has booted, perform sysupgrade.
9. Additionally, if you want to have eMMC recovery boot feature:
     (Don't worry! You will always have TFTP recovery boot feature.)
   dd if=openwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery.itb of=/dev/mmcblk0p4 bs=512 conv=fsync

NAND Flash instructions:
1. SSH to RAX3000M, and backup everything, especially 'Factory' part.
2. Erase and write new BL2:
   mtd erase BL2
   mtd write openwrt-mediatek-filogic-cmcc_rax3000m-nand-preloader.bin BL2
3. Erase and write new FIP:
   mtd erase FIP
   mtd write openwrt-mediatek-filogic-cmcc_rax3000m-nand-bl31-uboot.fip FIP
4. Set static IP on your PC:
   IP 192.168.1.254, GW 192.168.1.1
5. Serve OpenWrt initramfs image using TFTP server.
6. Cut off the power and re-engage, wait for TFTP recovery to complete.
7. After OpenWrt has booted, erase UBI volumes:
   ubidetach -p /dev/mtd0
   ubiformat -y /dev/mtd0
   ubiattach -p /dev/mtd0
8. Create new ubootenv volumes:
   ubimkvol /dev/ubi0 -n 0 -N ubootenv -s 128KiB
   ubimkvol /dev/ubi0 -n 1 -N ubootenv2 -s 128KiB
9. Additionally, if you want to have NAND recovery boot feature:
     (Don't worry! You will always have TFTP recovery boot feature.)
   ubimkvol /dev/ubi0 -n 2 -N recovery -s 20MiB
   ubiupdatevol /dev/ubi0_2 openwrt-mediatek-filogic-cmcc_rax3000m-initramfs-recovery.itb
10. Perform sysupgrade.
</pre>

## 救砖

> https://github.com/lgs2007m/Actions-OpenWrt/blob/main/Tutorial/RAX3000M-eMMC_XR30-eMMC.md

### 1. 准备

1. usb转ttl设备， 比如ch340G， 并安装驱动
2. 电脑安装putty

### 2. 连接ttl

用夹子夹上或直接焊接, 如下， 用usb转ttl设备连接电脑

<img src="/network/img/rax3000mTTL.jpg" alt="image" style="zoom: 50%;"/>

### 3. 开始操作

1. 打开设备管理器， 找到串口, 双击查看
    - <img src="/network/img/rax3000mCOM3.png" alt="image" style="zoom: 50%;"/>
    - <img src="/network/img/rax3000mRATE.png" alt="image" style="zoom: 50%;"/>
2. putty,  连接串口
3. 路由器插电源，在如下界面 按任意键打断boot
    - <img src="/network/img/rax3000mTTLConsole.png" alt="image" style="zoom: 50%;"/>
