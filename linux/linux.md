
# 常用命令

## 比较文件

` md5sum file1 file2 `

## scp

- 单文件
    - 上传: ` scp local_file linux_user@ip:linux_folder（/filename） `
    - 下载: ` scp linux_user@linux_ip:linux_file local_folder `
- 多文件
    - 上传: ` scp local_file1 local_file2 ... linux_user@ip:linux_folder `
- 文件夹
    - 上传: ` scp -v -r local_folder linux_user@ip:linux_folder `
    - 上传到相同目录下: ``` scp -r ./folder/ root@ip:`pwd` ``` // tab按键与esc按键之间那个
    - 下载: ` scp -r linux_user@linux_ip:linux_folder local_folder `
    

## 监控

- 磁盘: `iostat`(sysstat), `iotop`
- cpu、内存: `htop`
- 系统基础信息: `neofetch`

# 装机

## 分区

### linux 已有系统 分割磁盘

1. 从Live USB启动
2. 安装GParted
    ```bash
    # archlinux
    sudo pacman -S gparted
    ```
3. 打开: ` sudo gparted `
4. 找到目标磁盘 右键 -> Resize/Move

## 烧录

`dd if=/home/xxx.iso of=/dev/sdc status=progress`

# 防火墙

## firewall

- `firewall-cmd --get-active-zones` 查看网络区域
- `firewall-cmd --zone=区域(常用public) --list-ports` 查看开放的端口列表           
- `firewall-cmd --query-port=3306/tcp` 查看防火墙某个端口是否开放           
- `firewall-cmd --zone=区域 --add-port=3306/tcp --permanent` 开放端口            
- `firewall-cmd --zone=区域 --add-port=40000-45000/tcp --permanent` 开放一段端口           
- `firewall-cmd --reload` 重启防火墙
- `systemctl start/stop/status firewalld` 防火墙操作

