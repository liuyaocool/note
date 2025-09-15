# quest3


# 软件 sidequest

优点 支持linux

连接步骤
1. 头显打开开发者模式
2. 手机app(Meta Horizon)关联头显 在手机app打开开发者模式
3. 插上电脑

# wifi自动连接

开机后dock不显示 要很久才出来

```bash
adb shell settings delete global captive_portal_http_url
adb shell settings delete global captive_portal_https_url

adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
```

# quest3激活

## windows

1. v2rayN: 连接好节点后， 设置->参数设置->基础设置->设置端口，允许来自局域网的连接
2. sstap: 添加代理 -> socks5,ip,端口; 模式: 不代理中国IP
3. 打开电脑热点
4. 控制面板>网络和共享中心>更改适配器设置: 右键SSTAP 属性 共享 共享到“本地连接*10”
5. 设备连接开启的热点即可开启更新

# 软件

- ES文件管理器
    - 可安装apk, 不会出现安装权限被抢掉的情况
    - 最好第一个安装
- kiwi browser
    - 可下载apk， 配合上一个可在不开启开发者情况下安装apk
- quest助手: 有中文输入法，但不好用

# 节奏光剑

## 下载

- [VR魔趣网](https://www.vrmoo.net/?s=beat+saber&type=post)
- [DLC解锁_v1.40.6_6407.1661](https://www.vrmoo.net/72.html)

## 修改教程

- [在线mod修改](https://mbf.bsquest.xyz/)
- [Oculus工具](https://computerelite.github.io/)
- [mod查询](https://mods.bsquest.xyz/1.40.6_6407/)

## mod说明

### 自定义歌曲

- 下载网址: [https://beatsaver.com](https://beatsaver.com/?q=Th%20Power&order=Latest)
- v1.40.6 安装位置: `/sdcard/ModData/com.beatgames.beatsaber/Mods/SongCore/CustomLevels/`

### 光剑模型

- 模型下载:
    - discord： [http://www.questmodding.com/](http://www.questmodding.com/) 中加入discord
- v1.35.0 v1.37.0
    - 安装模块: Qosmetics Core(核心模块)
    - 模型安装路径: `/sdcard/ModData/com.beatgames.beatsaber/Mods/Qosmetics/` + 下边表格path
- v1.40.6
    - 源码: [github源码](https://github.com/Metalit/CustomModels/)
    - 安装模块: Custom models
    - 模型安装路径: `/sdcard/ModData/com.beatgames.beatsaber/Mods/CustomModels/` + 下边表格path

| 模型  | 后缀                   | v1.40.6 path | v1.35.0 v1.37.0 mod | v1.35.0 v1.37.0 path |
| ---   | -------                | ------       | ---                 | ---         |
|  剑   | .whacker               | ./Sabers     | Qosmetics Whackers  | ./whackers  |
|  墙   | .box                   | ./Walls      | Qosmetics Boxes     | ./boxes     |
|  方块 | .cyoob                 | ./Notes      | Qosmetics Cyoobs    | ./cyoobs    |
|       | .qsaber .qwall, .qbloq | ./Legacy     |                     |
|       | .zip                   | ./Zips       |                     |