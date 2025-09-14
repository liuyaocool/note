# meta quest3

## 光剑节奏

### 修改

https://mbf.bsquest.xyz/
https://computerelite.github.io/

## 软件 sidequest

优点 支持linux

连接步骤
1. 头显打开开发者模式
2. 手机app(Meta Horizon)关联头显 在手机app打开开发者模式
3. 插上电脑

## wifi自动连接

开机后dock不显示 要很久才出来

```bash
adb shell settings delete global captive_portal_http_url
adb shell settings delete global captive_portal_https_url

adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
```

## 激活

### windows

1. v2rayN: 连接好节点后， 设置->参数设置->基础设置->设置端口，允许来自局域网的连接
2. sstap: 添加代理 -> socks5,ip,端口; 模式: 不代理中国IP
3. 打开电脑热点
4. 控制面板>网络和共享中心>更改适配器设置: 右键SSTAP 属性 共享 共享到“本地连接*10”
5. 设备连接开启的热点即可开启更新

## 软件

- ES文件管理器
    - 可安装apk, 不会出现安装权限被抢掉的情况
    - 最好第一个安装
- kiwi browser
    - 可下载apk， 配合上一个可在不开启开发者情况下安装apk
- quest助手: 有中文输入法，但不好用