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
    dir=$(dirname "$file")/icon
    name=$(basename "$file")
    name=${name%.*}
    mkdir -p $dir
    ffmpeg -i "${file}" -q 6 -vf "scale=260:-1" "${dir}/${name}.jpg"
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
for file in "$@"; do
    # codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nokey=1:noprint_wrappers=1 "${file}")
    # 去除可能的换行符
    # codec=$(echo "$codec" | tr -d '\n')
    codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 "$file" | head -n 1)
    # %.*: 去除后缀
    output="${file%.*}.h264.mp4"
    echo "......检测到编码 $codec, 转换为h.264"
    case "$codec" in
        h264|avc)
            ffmpeg -i "$file" -c:v copy -c:a copy -movflags +faststart "$output"
            ;;
        hevc|h265)
            ffmpeg -i "$file" -c:v libx264 -crf 18 -preset slow -c:a aac "$output"
            ;;
        *)
            ffmpeg -i "$file" -c:v libx264 -crf 20 -preset slow -c:a aac "$output"
#            ffmpeg -i "$file" -c:v libaom-av1 -crf 16 -b:v 0 -row-mt 1 -cpu-used 8 -c:a aac -movflags +faststart "${output}"
            ;;
    esac
done
```

## 获得视频编码信息

```bash
#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Usage: $0 video_path"
    exit 1
fi
for file in "$@"; do
    # ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1
    v_code=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 "$file")
    a_code=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$file")
    # ffprobe -v error -show_entries format=bit_rate -of default=noprint_wrappers=1:nokey=1 sw-136.ts
    v_rate=$(ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "$file")
    va_code=$(ffprobe -v error -show_entries stream=codec_type,codec_name -of csv=p=0 "$file")
    echo ${file}
    echo "  --audio code: ${a_code}"
    echo "  --video code: ${v_code}"
    echo "  --video rate: ${v_rate} bps"
done
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