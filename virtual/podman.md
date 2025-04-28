# 常用操作

- 搜索镜像: 右键打开 [Docker Hub(https://hub.docker.com/)](https://hub.docker.com/)
- 查看所有容器: `podman ps -a`
- 查看运行容器: `podman ps`
- 停止容器: `podman stop ${name}`
- 启动容器: `podman start ${name}`
- 删除容器: `podman rm ${name}`
- 查看镜像: `podman images`
- 删除镜像: `podman rmi ${image_id}`
- 下载镜像: `podman pull ${name:version}`


# DockerHub

## 版本说明

- slim: 最小安装包
- bullseye / bookworm: 正在开发但尚未稳定版本


# 配置文件

https://docs.podman.io/en/latest/markdown/podman-search.1.html

- `/etc/containers/registries.conf`
- `~/.config/containers/registries.conf`

> 注: 阿里云加速已经不开放了， 这里只能代理加速官方源了

**官方**

```conf
unqualified-search-registries = [
    'docker.io' 
]

[[registry]]
prefix="docker.io/library"
location="docker.io/library"
```


**这个可用**

> 目前已不可用

```
unqualified-search-registries = ["docker.io"] 

[[registry]] 
prefix = "docker.io" 
location="1dr5t5mc.mirror.aliyuncs.com"
```

**这个报错 ??**
```
unqualified-search-registries = ['aliyuncs.com', 'docker.io', 'quay.io', 'registry.fedoraproject.org']

# 阿里云加速镜像站
[[registry]]
prefix="aliyuncs.com"
location="xxx.mirror.aliyuncs.com/library"

[[registry]]
prefix="docker.io"
location="mirror.gcr.io"

[[registry]]
prefix="docker.io/library"
location="docker.io/library"
# 原版配置 但无法拉取镜像
#location="quay.io/libpod" 

[[registry]]
location="localhost:5000"
insecure=true
```


# 相关脚本

## 搜索

```bash
#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <name> <params not format>"
    echo "Such as: $0 nginx --limit 10"
    exit 1
fi

# 获取终端的宽度
terminal_width=$(tput cols)
# 计算第一列的宽度
column1_width=$(( terminal_width - 30 ))  # 假设后两列的宽度为 30

printf "%-${column1_width}s %-10s %-10s\n" "Name" "Stars" "Official"
printf "%*s\n" $terminal_width | tr ' ' '-'

# $@ 获得所有参数
podman search $@ --filter stars=1 --format "{{.Name}}\t{{.Stars}}\t{{.Official}}"  | \
awk -v col1_width="$column1_width" 'BEGIN { FS="\t" } {printf "%-*s %-10s %-10s\n", col1_width, $1, $2, $3}' | \
sort -k2rn
```

# podman-compose

## 安装

- `git clone https://github.com/containers/podman-compose.git`
- `./podman_compose.py -f compose.yaml up -d`

## 语法

```yaml
version: '3.8'
services:
  mysql:
    container_name: ly_mysql8
    image: mysql:8.4.5
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 111111
      MYSQL_DATABASE: mysql
      MYSQL_USER: mysql
      MYSQL_PASSWORD: 111111
    ports:
      - "8562:3306"
    volumes:
    #   - ~/data/mysql8/conf:/etc/mysql/conf.d
      - ~/data/mysql8/data:/var/lib/mysql
    command: 
      - "--character-set-server=utf8mb4"
      - "--collation-server=utf8mb4_unicode_ci"

# 配置会自动将本地同目录映射到容器同目录: - mysql8_data:/var/lib/mysql
# volumes:
#   mysql8_data:
#   pg17_data:
```