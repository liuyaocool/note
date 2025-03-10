# 脚本示例

## ~/bin/autossh127

```bash
#!/bin/bash
if [[ $# < 2 ]]; then
    echo "Usage: $0 <port:remote> <port:local>"
    exit 1
fi
autossh -M $(~/bin/getport 8000 9000) -NR $1:127.0.0.1:$2 -i ~/.ssh/id_ed25519 root@autossh.liuyao.link -p 275
```

## ~/bin/getport

```bash
#!/bin/bash
if [[ $# < 2 ]]; then
    echo "Usage: $0 <port:start <port:end>"
    exit 1
fi
for port in $(seq $1 $2); do
    if ! ss -tuln | grep -q ":$port "; then
        echo $port
        exit 1
    fi
done
```