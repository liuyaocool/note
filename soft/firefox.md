# PC

## 禁用 Alt键 打开菜单栏

1. 地址栏输入 about:config
2. 搜索 `ui.key.menuAccessKeyFocuses` 并将其关闭

# 安卓

## 配置代理

1. 安装 Firefox Nightly
2. 打开 about:config
3. 修改以下配置
    - network.proxytype = 1 (默认值为5，必须改为1才能使用代理)
    - network.proxy.http = 代理ip
    - network.proxy.http_port = 代理port
    - network.proxy.ssl = 代理ip
    - network.proxy.ssl_port = 代理port
    - network.proxy.socks_port
    - network.proxy.socks remote dns修改为true(默认值为false，须改为true)

