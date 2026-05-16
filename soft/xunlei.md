# linux 容器化运行迅雷

- 运行
    ```bash
    podman run -d \
        --name=xunlei \
        --net=host \
        --privileged \
        -v ~/xunlei:/xunlei/downloads \
        -v ~/xunlei/config:/xunlei/data \
        --restart=unless-stopped \
        docker.io/cnk3x/xunlei:latest
    ```
- 登录
- 群晖邀请码: '迅雷牛通'