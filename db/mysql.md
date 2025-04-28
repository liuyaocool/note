# podman启动

## podman-compose

- `./podman_compose.py -f compose.yaml up -d`

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

# 索引

MySQL官方对索引的定义为：索引（Index）是帮助MySQL高效获取数据的数据结构。可以得到索引的本质： **索引是数据结构** 。InnoDB存储引擎支持以下几种常见的索引：**B+树索引**、**全文索引**、**哈希索引**，其中比较关键的是B+树索引

## 为什么HashMap不适合做索引？

![](/db/img/mysql_hash_index.png)

1. hash表只能匹配是否相等，**不能实现范围查找**
2. 当需要按照索引进行**order by**时，hash值没办法支持排序
3. **组合索引**可以支持部分索引查询，如(a,b,c)的组合索引，查询中只用到了a和b也可以查询的，如果使用hash表，组合索引会将几个字段合并hash，没办法支持部分索引
4. 当数据量很大时，**hash冲突**的概率也会非常大

## B+Tree

B+树索引就是传统意义上的索引，这是目前关系型数据库系统中查找最常用和最为有效的索引。B+树索引的构造类似于二叉树，根据键值（Key Value）快速找到数据。注意B+树中的B不是代表二叉(binary)，而是代表平衡(balance)，因为B+树是从最早的平衡二叉树演化而来，但是B+树不是一个二叉树。

为什么不用B树

1. 索引的时候 B树数据在枝干上，会返回数据, 这样每次磁盘I/O读取的时候(4k) 会返回更少的索引
2. B+树 数据在叶子上 且是排序的， 范围查找会更方便

## 聚集索引/聚簇索引

## 辅助索引/二级索引