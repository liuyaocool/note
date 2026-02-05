# quest3

## 软件 sidequest

优点 支持linux

连接步骤
1. 头显打开开发者模式
2. 手机app(Meta Horizon)关联头显 在手机app打开开发者模式
3. 插上电脑

## wifi自动连接

> 开机后dock不显示 要很久才出来!!!

```bash
adb shell settings delete global captive_portal_http_url
adb shell settings delete global captive_portal_https_url

adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
```

## quest3激活

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

## 节奏光剑

### 下载

- [VR魔趣网](https://www.vrmoo.net/?s=beat+saber&type=post)
- [DLC解锁_v1.40.6_6407.1661](https://www.vrmoo.net/72.html)

### 修改教程

- [在线mod修改](https://mbf.bsquest.xyz/)
- [Oculus工具](https://computerelite.github.io/)
- [mod查询](https://mods.bsquest.xyz/1.40.6_6407/)

### mod说明

- **所有mod数据路径**: `/sdcard/ModData/com.beatgames.beatsaber/Mods/`

#### 自定义歌曲

- 下载网址: [https://beatsaver.com](https://beatsaver.com/?q=Th%20Power&order=Latest)
- v1.40.6 安装位置: `mod路径/SongCore/CustomLevels/`

#### 光剑模型

- 模型下载:
    - discord： [http://www.questmodding.com/](http://www.questmodding.com/) 中加入discord
- v1.35.0 v1.37.0
    - 安装模块: Qosmetics Core(核心模块)
    - 模型安装路径: `mod路径/Qosmetics/` + 下边表格path
- v1.40.6
    - 源码: [github源码](https://github.com/Metalit/CustomModels/)
    - 安装模块: Custom models
    - 模型安装路径: `mod路径/CustomModels/` + 下边表格path

| 模型  | 后缀                   | v1.40.6 path | v1.35.0 v1.37.0 mod | v1.35.0 v1.37.0 path |
| ---   | -------                | ------       | ---                 | ---         |
|  剑   | .whacker               | ./Sabers     | Qosmetics Whackers  | ./whackers  |
|  墙   | .box                   | ./Walls      | Qosmetics Boxes     | ./boxes     |
|  方块 | .cyoob                 | ./Notes      | Qosmetics Cyoobs    | ./cyoobs    |
|       | .qsaber .qwall, .qbloq | ./Legacy     |                     |
|       | .zip                   | ./Zips       |                     |


#### 声音mod

- mod名称: QuestSounds
- 源码: [github](https://github.com/EnderdracheLP/QuestSounds/)

**路径**

| 修改地方             | 路径 `mod路径/QuestSounds/`+ |
| :-------            | :--------- |
| MenuMusic           | ./MenuMusic/           |
| LobbyMusic          | ./LobbyMusic/          |
| MenuClicks          | ./MenuClicks/          |
| HitSounds   (击中)   | ./HitSounds/           |
| BadHitSounds        | ./BadHitSounds/        |
| NoteMissedSounds    | ./NoteMissedSounds/    |
| BombExplosionSounds | ./BombExplosionSounds/ |
| LevelCleared        | ./LevelCleared/        |
| LevelFailed         | ./LevelFailed/         |
| Firework            | ./Fireworks/           |

# 魔兽争霸3

## 指令

- `-apneng` ai模式下正常金币正常经验


# 卧虎

## 升级

```
====== 升级相关 ======
经验符 + 37%

84级:
低一段橙符: 19611246
一本段紫符: 10548184
一本段橙符: 21096368

LV:60- （测试账号LV40）
铜人阵: 一个怪经验(橙色) = 情缘 / 183.25
闯门派: 一个怪经验(橙色) = 情缘 / 44.32  * 91个怪
紫色桃木: 情缘*1.78

LV65
情缘: 7505784
情缘 = 0.179 * 升级需要经验
铜人阵: 一个怪经验(橙色) = 情缘 / 240
闯门派: 一个怪经验(橙色) = 情缘 / 55
橙令 = 情缘 * 1.9
紫令 = 情缘 * 1
橙演武符:
紫演武符: 0.41 * 情缘

LV72
情缘: 8594944
情缘 = 0.118 * 升级需要经验
铜人阵: 一个怪经验(橙色) = 情缘 /        紫：321
闯门派: 一个怪经验(橙色) = 情缘 / 46
橙令 = 情缘 * 2
紫令 = 情缘 * 1
橙演武符: 0.9 * 情缘
紫演武符:  0.45 * 情缘

LV80
情缘: 9805528
升级需要: 128036400
情缘 = 0.076 * 升级需要经验
铜人阵一个怪(橙色:55624) = 情缘 / 176
闯门派一个怪(橙色:247217)*91 = 22496747 = 情缘 * 2.3
橙令(19611246) = 情缘 * 2
紫令(9805622) = 情缘 * 1
橙演武符(9427220) = 情缘 * 0.96
紫演武符(4649040) = 情缘 * 0.47
```

## 图片

### 逍遥

<img src="/other/img/whcl/xiaoyao_shenqi_1.jpg" style="zoom: 25%;"/>
<img src="/other/img/whcl/xiaoyao_shenqi_2.jpg" style="zoom: 25%;"/>
<img src="/other/img/whcl/xiaoyao_shenqi_3.jpg" style="zoom: 25%;"/>
<img src="/other/img/whcl/xiaoyao_shenqi_4.jpg" style="zoom: 25%;"/>

### 明教

<img src="/other/img/whcl/mingjiao_shenqi_1.jpg" style="zoom: 35%;"/>
<img src="/other/img/whcl/mingjiao_shenqi_2.jpg" style="zoom: 35%;"/>
<img src="/other/img/whcl/mingjiao_shenqi_3.jpg" style="zoom: 35%;"/>
<img src="/other/img/whcl/mingjiao_shenqi_4.jpg" style="zoom: 35%;"/>

### 血刀

### 神龙

<img src="/other/img/whcl/shenlong_shenqi_1.jpg" style="zoom: 25%;"/>
<img src="/other/img/whcl/shenlong_shenqi_2.jpg" style="zoom: 25%;"/>
<img src="/other/img/whcl/shenlong_shenqi_3.jpg" style="zoom: 25%;"/> 
<img src="/other/img/whcl/shenlong_shenqi_4.jpg" style="zoom: 25%;"/>

### 武当

<img src="/other/img/whcl/wudang_shenqi_1.jpg" style="zoom: 28%;"/>
<img src="/other/img/whcl/wudang_shenqi_2.jpg" style="zoom: 28%;"/>
<img src="/other/img/whcl/wudang_shenqi_3.jpg" style="zoom: 28%;"/>
<img src="/other/img/whcl/wudang_shenqi_4.jpg" style="zoom: 28%;"/>

### 丐帮

<img src="/other/img/whcl/gaibang_shenqi_1.jpg" style="zoom: 38%;"/>
<img src="/other/img/whcl/gaibang_shenqi_2.jpg" style="zoom: 38%;"/>
<img src="/other/img/whcl/gaibang_shenqi_3.jpg" style="zoom: 38%;"/>
<img src="/other/img/whcl/gaibang_shenqi_4.jpg" style="zoom: 38%;"/>

### 天龙

<img src="/other/img/wohu/tianlong_shenqi_n1.jpg" style="zoom: 30%;"/>
<img src="/other/img/wohu/tianlong_shenqi_n2.jpg" style="zoom: 30%;"/>
<img src="/other/img/whcl/tianlong_shenqi_1.jpg" style="zoom: 33%;"/>
<img src="/other/img/whcl/tianlong_shenqi_2.jpg" style="zoom: 33%;"/>
<img src="/other/img/whcl/tianlong_shenqi_3.jpg" style="zoom: 33%;"/>
<img src="/other/img/whcl/tianlong_shenqi_4.jpg" style="zoom: 33%;"/>
<img src="/other/img/wohu/tianlong_shenqi_p1.jpg" style="zoom: 13%;"/>
<img src="/other/img/wohu/tianlong_shenqi_p2.jpg" style="zoom: 13%;"/>
<img src="/other/img/wohu/tianlong_shenqi_p3.jpg" style="zoom: 13%;"/>
<img src="/other/img/wohu/tianlong_shenqi_p4.jpg" style="zoom: 13%;"/>

### 五毒

<img src="/other/img/whcl/wudu_shenqi_1.jpg" style="zoom: 30%;"/>
<img src="/other/img/whcl/wudu_shenqi_2.jpg" style="zoom: 30%;"/>
<img src="/other/img/whcl/wudu_shenqi_3.jpg" style="zoom: 30%;"/>
<img src="/other/img/whcl/wudu_shenqi_6.jpg" style="zoom: 30%;"/>
<img src="/other/img/wohu/wudu_shenqi_p1.jpg" style="zoom: 10%;"/>
<img src="/other/img/wohu/wudu_shenqi_p2.jpg" style="zoom: 10%;"/>
<img src="/other/img/wohu/wudu_shenqi_p3.jpg" style="zoom: 10%;"/>
<img src="/other/img/wohu/wudu_shenqi_p4.jpg" style="zoom: 10%;"/>

### 唐门

<img src="/other/img/whcl/tangmen_shenqi_1.jpg" style="zoom: 35%;"/>
<img src="/other/img/whcl/tangmen_shenqi_2.jpg" style="zoom: 35%;"/>
<img src="/other/img/whcl/tangmen_shenqi_3.jpg" style="zoom: 35%;"/>
<img src="/other/img/whcl/tangmen_shenqi_4.jpg" style="zoom: 35%;"/>
<img src="/other/img/wohu/tangmen_shenqi_p1.jpg" style="zoom: 13%;"/>
<img src="/other/img/wohu/tangmen_shenqi_p2.jpg" style="zoom: 13%;"/>
<img src="/other/img/wohu/tangmen_shenqi_p3.jpg" style="zoom: 13%;"/>
<img src="/other/img/wohu/tangmen_shenqi_p4.jpg" style="zoom: 13%;"/>

## 号

```
------ 3v3 密码: 111111
卧虎区 28 天龙男
福利区 1994 天龙男
十年区 99 神龙男 v5 黑豹
```

| 号   | 卧虎区 `满级号`       | 福利区    | 寒雪区     | 十年区                         | 无限区 |
| :--- | :---------          | :---     | :---      | :---                          | :--- |
| 99   | `中 丐男82 ￥ 白饵47` | `中 神男` | ✗        | `主号` + 南 毒女36 + 中 神男65   |
| 186  | 西 逍男48 ￥25 柔攻   | `西 逍男` | `天男`    | `西 逍男` + 西 逍男72            |
| 109  | ✗                  | ✗        | `神男`    | `南 唐男` + `西 明男 神器`        |
| 103  | `西 逍女 妻子` 橙装   | 西 逍女61 | 南 毒女40 | 西 血女80`轻功`+中武女62+南唐男35+南武男13￥9锭 | 天男61 |
| L28  | `南 唐女 帮会` 橙装   | 中 丐男65 | 西 逍女61 | 中神女36+南毒女26+中丐男30+所有毒女 | 毒女43 |
| LY28 | 南 毒男55 ￥21 白饵60 | 中 武女65 | 南 毒男37 | `南 转唐女 雷神兵 ￥509`          | 毒女67 |
| Y991471 | ✗               | `中 武女`  | 南 唐男   | `中 丐男` ￥6锭                 |
| bang01 | `南 毒女69`       | 南 毒女35  | ✗        | 中丐男64 ￥39锭 + 中武女64       |
| bang02 | 南 唐男35 白饵5    | 南 毒男35  | ✗        | 中丐男40 + 中武女27￥70锭        |
| bang03 | 南 唐女38 白饵7    | 南 唐女36  | ✗        | 西 明男35                       |
| bang04 | 南 毒男37         | 南 唐男36  | ✗        | 西 逍女39                       |
| ———— | ——————————         | —————     | ————     | —————————————————              | ——— |
| 99LY | 中 武女23           | 南 天女68  |
| L28Y | 西 血女51 ￥2 白饵30 | 西 明男65  |
| L99  | 南 毒女57 ￥33 白饵8 | 南 唐女80  | 西 血女61 |
| LY99 | `西 明女77 ￥39`    | 中 神女40  | 中 武女   | 西 明女63 ￥44锭               |
| Y99L | 南 毒女23           | 南 毒女70  | 中 丐男   | 西 逍女35                     |
| L99Y | 南 唐男31           | 西 血男63  | 南 唐女   | 西 血女32 + 西 血女47          |
| 28LY | 西 明女35 白饵3      | 西 逍男80  | ✗        | 南 天男62 + 西 明女35          | 西 明男63 |
| Y28  | `南 天女64 白饵56`   | 西 血女65  | ✗        | ✗                           | 西 明男1  |
| LL99 | 南 唐男45           | `南唐男38` | 西 逍男17 | 南 唐男49                     | 中 丐男61 |
