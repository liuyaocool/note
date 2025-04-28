# podman 启动

官方文档: https://hub.docker.com/_/postgres

## 命令

```bash
#!/bin/bash
image=postgres:13.16
name=ly_pgsql
port=8561
password=111111
postgre_path=~/data/postgre
data_path=${postgre_path}/data
export https_proxy=

#    -e PGDATA=/var/lib/postgresql/data/pgdata \
# 默认用户, 不指定创建postgres
#    -e POSTGRES_USER=myuser \
# 默认db, 不指定创建postgres
#    -e POSTGRES_DB=mydb \
# 映射 配置路径
#    -v ${local_path}/config:/etc/postgresql \
if [ $(podman ps | grep -w ${name} | wc -l) -gt 0 ]; then
	echo "container is running"
elif [ $(podman ps -a | grep -w ${name} | wc -l) -gt 0 ]; then
	echo start...
	podman start ${name}
else
	echo run...
	podman run -d \
	   --name ${name} \
	   -p ${port}:5432 \
	   -v ${data_path}:/var/lib/postgresql/data \
	   -e POSTGRES_PASSWORD=${password} \
	   ${image}
fi
```

```bash
# 停止
podman stop ly_pgsql
# 删除容器
podman rm ly_pgsql
```

> 注: 删除容器 重新创建容器， 如果映射数据路径 且路径内有原始数据， 那么重新设置的密码不会生效

## podman-compose

- `./podman_compose.py -f compose.yaml up -d`

```yaml
version: '3.8'
services:
  postgres:
    container_name: ly_pgsql17
    image: postgres:17.4
    # restart: unless-stopped
    restart: always
    environment:
      POSTGRES_PASSWORD: 111111
    ports:
      - "8561:5432"
    volumes:
      - ~/data/postgre17/data:/var/lib/postgresql/data
```

# 使用

```bash
# 连接
psql -h host -p port -U user

# 这里必须用 ; 结尾， 否则不会执行
select * from table_name; 
```

## psql 指令

- `\?`: 查看所有元指令
- `\c database_name`: 切换库
- `\q`: 退出
- `\d table_name`: 查看表结构
- `\dt`: 列出所有表
- `\l`: 列出所有库
- `\di`: 列出所有索引
- `\du`: 列出所有角色
