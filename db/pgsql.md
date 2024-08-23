# podman 启动

官方文档: https://hub.docker.com/_/postgres

```bash
podman pull postgres:13.16

# 启动
#    -e PGDATA=/var/lib/postgresql/data/pgdata \
# 默认用户, 不指定创建postgres
#    -e POSTGRES_USER=myuser \
# 默认db, 不指定创建postgres
#    -e POSTGRES_DB=mydb \
# 映射 配置路径
#    -v ${local_path}/config:/etc/postgresql \
podman run -d \
    --name my_postgres_container \
    # 映射 端口
    -p 8561:5432 \
    # 映射 数据路径
    -v ${local_path}/data:/var/lib/postgresql/data \
    # 设置密码
    -e POSTGRES_PASSWORD=123456 \
    postgres:13.16

# 停止
podman stop my_postgres_container
# 删除容器
podman rm my_postgres_container
```

> 注: 删除容器 重新创建容器， 如果映射数据路径 且路径内有原始数据， 那么重新设置的密码不会生效

```bash
# 连接
psql -h host -p port -U user
\c database_name

# 这里必须用 ; 结尾， 否则不会执行
select * from table_name; 

```
