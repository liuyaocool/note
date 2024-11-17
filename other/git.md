# 配置ssh代理

` vi ~/.ssh/config`

```
Host qqvps
    HostName qqvps.xxx.xxx
    Port 22
    User root
    DynamicForward 1080
Host github.com
  HostName github.com
  User git
  ProxyCommand nc -x 127.0.0.1:1080 %h %p
```

> 1080 为本地端口
>
> 此配置添加完成后 需要执行 `	ssh -N qqvps  ` 才能连接远程， 从而实现外网搭桥


# 常用命令

```bash
# 检出远程分支到本地
git checkout -b <本地分支名> <远程分支名>

# ??
git push <remote_name> <local_branch_name>:<remote_branch_name>

# 撤销最后一次提交 且删除本地修改
git reset --hard HEAD~1

# 撤销最后一次提交 但保留本地修改
git reset --soft HEAD~1

# 创建一个新的 完全初始的本地
git checkout --orphan 分支名

# 添加文件到git提交列表
git add . # 当前目录及子目录
git add nginx/nginx.conf # 单个文件/目录

# 切换分支
git switch <本地分支名>

# 删除本地已提交分支
git branch -d <本地分支名>

# 提交
git commit -m "提交信息"

# 推送新分支到远程
git push --set-upstream origin release1

# 从本地提交列表 回退到修改列表
git restore --staged filepath
# 删除本地修改
git restore filepath

```