# virt虚拟机中开发

## 真机调试配置

nat模式无法在虚拟机中连接

### 有线网络配置

使用桥接网络， 但wifi不支持桥接网络

### wifi网络配置

**1. 网卡开启4addr (WDS)**: 主要用于无线分布式系统(WDS)和桥接场景
```bash
sudo iw dev wlan0 set 4addr on  # 启用4地址模式
sudo ip link set wlan0 down     # 先禁用接口
sudo ip link set wlan0 up       # 重新启用
```
**2. virt修改网卡配置为**

![](/huawei/img/virt-net.png)

## 连接

DevEco Studio -> Tools -> IP Connection 即可连接