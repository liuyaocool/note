# 联网

## 不能联网

```bash
sudo ip link set <网卡名> up
sudo dhcpcd
```

**开机自启**

```bash
# ubuntu server 24.0.2
# 重新安装dhcpcd
sudo apt install dhcpcd
# 开机启动
sudo systemctl enable dhcpcd
```

# 启动慢

## 问题1

卡在 `Job systemd-networkd-wait-online.service/start running()`

**解决**

`vim /etc/systemd/system/network-online.target.wants/systemd-networkd-wait-online.service`

```bash
# Service下添加一行
[Service]
TimeoutStartSec=5Sec
```