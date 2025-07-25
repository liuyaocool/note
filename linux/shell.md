# 脚本示例

## firewall

### add tcp port

```bash
#!/bin/bash

usage() {
    echo "Error($?), usage: $0 <port(-port)/tcp,udp>"
    exit 1
}
# 捕获 ERR 信号（命令失败时触发）
trap usage ERR

# 检查参数个数
if [ $# -lt 1 ]; then
    usage
fi

sudo firewall-cmd --zone=public --add-port=${1} --permanent
echo reloading...
sudo firewall-cmd --reload
```

### remove tcp port

```bash
#!/bin/bash

usage() {
    echo "Error($?), usage: $0 <port(-port)/tcp,udp>"
    exit 1
}
# 捕获 ERR 信号（命令失败时触发）
trap usage ERR

# 检查参数个数
if [ $# -lt 1 ]; then
    usage
fi

sudo firewall-cmd --zone=public --remove-port=${1} --permanent
echo reloading...
sudo firewall-cmd --reload
```

### list

```bash
#!/bin/bash
sudo firewall-cmd --zone=public --list-ports
```


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

## status_set

```bash
#!/bin/bash

network_card=eno1
pid_path=
pid_path_pre=/tmp/statusline
mkdir -p ${pid_path_pre}
sta_cpu=${pid_path_pre}/sta_cpu
sta_mem=${pid_path_pre}/sta_mem
sta_thread=${pid_path_pre}/sta_thread
sta_net=${pid_path_pre}/sta_net

is_running() {
    if [ -f "${pid_path}" ] && (( $(ps -p $(cat ${pid_path}) | wc -l) > 1 )); then
        # running
	echo 1
    else
        echo 0
    fi
}

get_net_speed() {
    a=$1
    i=0
    sufs=("B" "K" "M" "G" "P")
    # bc: judge double number
    while [ $(echo "${a} > 1024" | bc) -eq 1 ]; do
        # sed 's/^\./0./' -- 保证至少显示一个个位数
        a=$(echo "scale=1; ${a} / 1024" | bc | sed 's/^\./0./')
        i=$((i+1))
    done
    a=${a}${sufs[$i]}
    ## add length to fixed 7
    dif=$((7 - $(expr length "${a}")))
    for (( i = 0; i < dif; i++ )); do
        a=" ${a}"
    done
    echo "${2}${a}"
}

# add_len 7 "123B"
add_len() {
    ## add $2 length to fixed $1
    a=$2
    dif=$((${1} - $(expr length "${a}")))
    for (( i = 0; i < dif; i++ )); do
        a=" ${a}"
    done
    echo "${a}"
}

pid_path=${pid_path_pre}/pid_cpu
if [ $(is_running) == 0 ]; then
	cpu_total_prev=0
	cpu_idle_prev=0
	for((;;)); do
		# name user    nice system  idle     iowait irq    softirq steal guest   guest_nice
		# cpu0 4617100 11   2835888 60064038 52079  281777 162624  0     1953941 0
		# ---数字都是 系统启动累计到当前时间
		# user     用户态的运行时间，不包含nice值为负的进程。
		# system   核心态的运行时间。
		# nice     nice 值为负的进程所占用的CPU时间。
		# idle     除IO等待时间以外的其它等待时间。
		# iowait   IO等待时间(since 2.5.41)。
		# irq      硬中断时间(since 2.6.0-test4)。
		# softirq  软中断时间(since2.6.0-test4)。
		# stealstolen which is the time spent in otheroperating systems when running in a virtualized environment(since 2.6.11)。
		# guest       whichis the time spent running a virtual CPU  for  guest operating systems under the control ofthe Linux kernel(since 2.6.24)。
        a=(`cat /proc/stat | head -1`) # line
        b=$((a[1]+a[2]+a[3]+a[4]+a[5]+a[6]+a[7]+a[8]+a[9]+a[10])) # total
        # c: usage %
        c=$(printf "%.1f" `echo "scale=5;100-$((a[4]-cpu_idle_prev))/$((b-cpu_total_prev))*100"|bc`)
        c=$([ `echo "$c<10" | bc` -eq 1 ] && echo -n " ${c}" || echo -n "${c}")
        cpu_total_prev=${b}
        cpu_idle_prev=${a[4]}
        echo "C ${c}%" > ${sta_cpu}
        sleep 2
	done &
	echo $! > ${pid_path}
	echo cpu calc pid: $!
fi

pid_path=${pid_path_pre}/pid_mem
if [ $(is_running) == 0 ]; then
	for((;;)); do
        a=(`free -m | grep Mem`)
        b=$(printf "%.2f" `echo "scale=5;${a[2]}/1024"|bc`) # memory used
        c=$(printf "%.1f" `echo "scale=5;${a[1]}/1024"|bc`) # memory all
        d=$(printf "%.1f" `echo "scale=5;${a[6]}/1024"|bc`) # memory available
        echo "M ${b}/${c}G" > ${sta_mem}
        sleep 2
	done &
	echo $! > ${pid_path}
	echo memory calc pid: $!
fi

# 计算进程 线程数
pid_path=${pid_path_pre}/pid_thread
if [ $(is_running) == 0 ]; then
	for((;;)); do
		a=$(ps -aux | wc -l)
		b=$(ps -eT | wc -l)
        echo "${a}p ${b}t" > ${sta_thread}
		sleep 1
	done &
	echo $! > ${pid_path}
	echo process and thread calc pid: $!
fi

# 计算网速
pid_path=${pid_path_pre}/pid_net
if [ $(is_running) == 0 ]; then
    rx_prev=0  # download
    tx_prev=0  # upload
	for((;;)); do
        a=(` ip -s link show ${network_card} | grep -A 3  "RX:"`)
        rx=${a[7]}
        tx=${a[20]}
        rx=$(get_net_speed $((rx-rx_prev)))
        tx=$(get_net_speed $((tx-tx_prev)))
        rx_prev=${a[7]}
        tx_prev=${a[20]}
	   echo "$(add_len 7 ${tx})↑ $(add_len 7 ${rx})↓" > ${sta_net}
        sleep 1
	done &
	echo $! > ${pid_path}
	echo network speed calc pid: $!
fi
```

## status_get

```bash

#!/bin/bash
sta=/tmp/statusline/sta_
echo -ne "[`cat ${sta}thread`] [`cat ${sta}net`] [`cat ${sta}cpu`] [`cat ${sta}mem`]  $(date '+%u %m/%d %H:%M:%S')"
```

## cloudflare

### api

- ZONE_ID: DNS点开，拉到底，右下角
- DNS_RECORD_ID: 
    - doc: `https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/batch/`
    - shell: `curl -X GET "https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records" -H "Authorization: Bearer API_TOKEN"`
- API_TOKEN: `https://dash.cloudflare.com/profile/api-tokens`
- 认证请求头: 
    - 官方文档方法失败， 这个成功 `Authorization: Bearer $API_TOKEN`
    - 在这找到: https://dash.cloudflare.com/profile/api-tokens 点help

### 修改dns记录

https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/edit/

```bash
#!/bin/bash

ZONE_ID=
DNS_RECORD_ID=
API_TOKEN=

ip=`curl -s "https://my.ip.cn/json/"`
ip=$(jq -r '.data.ip' <<< "$ip")

curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$DNS_RECORD_ID \
    -X PATCH \
    -H "Authorization: Bearer $API_TOKEN" \
    -d "{\"name\": \"home13\", \"ttl\": 1, \"type\": \"A\", \"content\": \"${ip}\", \"proxied\": false}"
```