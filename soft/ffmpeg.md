# 脚本

## 缩略图

`vim ~/bin/imgicon`

```bash
#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Usage: $0 img_path"
    exit 1
fi
for file in "$@"; do
    ffmpeg -i "${file}" -q 6 -vf "scale=260:-1" "${file}icon.jpg"
done
```

## 压缩图片

`vim ~/bin/imgzip`

```bash
#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Usage: $0 img_path"
    exit 1
fi
for file in "$@"; do
    ffmpeg -i "${file}" -q:v 10 "${file}.jpg"
done
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