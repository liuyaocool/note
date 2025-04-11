# 脚本

## 缩略图

`vim ~/bin/imgzip`

```bash
#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Usage: $0 img_path"
    exit 1
fi
ffmpeg -i "${1}" -q 6 -vf "scale=260:-1" "${1}.jpg"
```

## 视频转换为mp4

`vim ~/bin/tomp4`

```bash
#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Usage: $0 video_path"
    exit 1
fi
ffmpeg -i "${1}" -c:v copy -y "${1}.mp4"
```

## m3u8 下载

`vim ~/bin/m3u8down`

```bash
#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <m3u8_link> <video_name>"
    exit 1
fi

echo $1 > $2
ffmpeg -i $1 -c copy "$2"
```