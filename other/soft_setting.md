
# google chrome

## 快捷键

- ctrl+w ：关闭标签
- ctrl+e ：搜索引擎
- ctrl+r ：刷新标签
- ctrl+l ：选中标签地址栏
- ctrl+t ：打开新标签

## 插件

- Dark Reader：网站黑暗主题

# Vim

`:%s/,/\r/g` -- 替换全文 “,” --> “换行” 
- %s  --全文查找
- /   --分割符
- ,   --要替换的字符
- \r  --替换成这个字符，这里替换为换行
- /g  --全局替换

分屏

- :sp  --上下切分
- :vsp  --左右切分
- :e filepath   --切分窗口打开文件
- ctrl+ww    --切换窗口
- n+yy    --复制
- p    --粘贴

多列模式 

- ctrl+v            --进入多列模式，方向键选中
- shitf+i -> esc    --多列模式下 添加文本，esc应用
- d                 --多列模式下删除选中文本

# Firefox

## 禁用 Alt键 打开菜单栏

1. 地址栏输入 about:config
2. 搜索 `ui.key.menuAccessKeyFocuses` 并将其关闭

# VSCodium

## 修改microsoft插件源

`vi /opt/vscodium-bin/resources/app/product.json`

**修改**

```json
"extensionsGallery": {
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "itemUrl": "https://marketplace.visualstudio.com/items"
}
```

## 插件推荐

- sftp(Natizyskunk  natan-fourie.fr)