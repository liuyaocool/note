# java -jar 参数说明

格式: `java -[jvm参数] -jar xxx.jar --[应用参数]`

## jvm参数

| 参数                 | 说明         | 示例                      |
| -------------------- | ------------ | ------------------------- |
| -Xms                 | 初始堆大小   | -Xms512m                  |
| -Xmx                 | 最大堆大小   | -Xmx2g                    |
| -Xss                 | 线程栈大小   | -Xss256k                  |
| -XX:MaxMetaspaceSize | 元空间最大值 | -XX:MaxMetaspaceSize=256m |

## 应用参数

| 参数                          | 说明                        | 实例                                                |
| ----------------------------- | --------------------------- | --------------------------------------------------- |
| **--spring.config.location**  | spring boot指定本地配置文件 | --spring.config.location=file:/path/application.yml |
| --spring.config.name          | 指定配置文件名              | --spring.config.name=myconfig                       |
| --spring.profiles.active      | 激活的 profile              | --spring.profiles.active=prod                       |
| --server.port                 | 服务端口                    | --server.port=8443                                  |
| --server.servlet.context-path | 上下文路径                  | --server.servlet.context-path=/api                  |
| 。。。                        |                             |                                                     |

## demo

### javarun

```bash
#!/bin/bash
if [[ $# < 1 ]]; then
    echo "Usage: $0 <port:start <port:end>"
    exit 1
fi
java \
    -Xms128M -Xmx1024M \
    -XX:+HeapDumpOnOutOfMemoryError \
    -XX:+PrintGCDetails \
    -jar ${1}/main.jar \
    --spring.config.location=file:${1}/application.yml &
```

### run-db

```bash
#!/bin/bash
# abPath=$(cd `dirname $0`;pwd)
abPath=`readlink -f $0`
abPath=${abPath%/*}
log_path=/tmp/local-utils-bs/logs

cd ${abPath}
mkdir -p $log_path
java \
	-Xms128M -Xmx1024M \
	-XX:+HeapDumpOnOutOfMemoryError \
	-XX:+PrintGCDetails \
	-jar ${abPath}/bsUtils-0.0.1-SNAPSHOT.jar \
	2>&1 >> $log_path/console.log &
```
