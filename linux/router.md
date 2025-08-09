# OpenWRT

## 安装

1. 下载 https://firmware-selector.openwrt.org/ 按cpu型号下载固件
2. 刷入固件: 各型号自行查找教程，本文后边提供360P2路由

## 新机设置

### 修改密码

浏览器打开 `192.168.1.1`, 帐号root，无密码 直接登录后修改密码, 之后即可用ssh登录进行操作了

### 修改网络, 配置静态ip

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

## 连接wifi

## 更新

- 配置中科大源
- 时间校准
    - 不然更新失败， 所有需要整数的网络操作都会报错
- 执行 `opkg update`

## 5G频段不能用

opkg search kmod-mt76x2

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
