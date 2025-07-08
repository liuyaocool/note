# zsh

## 配置文件 

`vi .zshrc`

```bash
# 终端没有颜色
# 'foot': unknown terminal type
# vim 错乱
# tty zsh-autosuggestions没颜色
export PATH=$PATH:~/bin
export TERM=xterm-256color
export EDITOR=/usr/bin/vim
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="agnoster"
# ZSH_THEME="robbyrussell"

DISABLE_MAGIC_FUNCTIONS=true

plugins=(git zsh-autosuggestions)

# 关闭自动更新
zstyle ':omz:update' mode disabled
source $ZSH/oh-my-zsh.sh

alias gs="git status"
alias gu="git pull"
alias gd="git diff"
```

## 美化 ohmyzsh


```bash
git clone https://github.com/ohmyzsh/ohmyzsh.git
# 执行
./tools/install.sh
# 安装路径 ~/.oh-my-zsh/

# 修改主题
vim ~/.zshrc
## ---------- 修改 ----------
ZSH_THEME="agnoster"
## ---------- end ----------

```
**修改主题：agoster**

```bash
vi ~/.oh-my-zsh/themes/agnoster.zsh-theme
## ------------- 修改 ------
# Context: user@hostname (who am I and where am I)
prompt_context() {
  if [[ "$USERNAME" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
    # xxx 修改显示格式
  fi
}
```

**修改主题：rkj-repos**

```bash
vi ~/.oh-my-zsh/themes/rkj-repos.zsh-theme
## ------------ 修改 ---------
PROMPT=$'%{$fg_bold[blue]%}┌─[%{$fg_bold[green]%}%n%b %b%{$fg[yellow]%}'%D{"%m/%d %I:%M:%S"}%b$'%{$fg_bold[blue]%}]%{$reset_color%} - %{$fg_bold[blue]%}[%{$fg_bold[default]%}%~%{$fg_bold[blue]%}]
%{$fg_bold[blue]%}└─[%{$fg_bold[magenta]%}%?$(retcode)%{$fg_bold[blue]%}] <$(mygit)$(hg_prompt_info)>%{$reset_color%} '
## ------------- end ---------
```

**自动转义问题**

```bash
cat ~/.oh-my-zsh/lib/misc.zsh
# 有一行 if [[ $DISABLE_MAGIC_FUNCTIONS != true ]]; then

vi ~/.zshrc
    ## ------ 在 source 前加一行 -------
    DISABLE_MAGIC_FUNCTIONS=true
    source $ZSH/oh-my-zsh.sh
    ## -------- end ------------------
```

## 插件1: 自动补全插件

```bash
# https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh
vi ~/.zshrc
    # 添加变量
    export TERM=st-256color
    # 修改 
    plugins=(
        git
        zsh-autosuggestions
    )
```

# ranger 文件浏览器

## 安装

1. https://github.com/ranger/ranger 下载源码
2. `ln -s ranger/ranger.py ~/bin/ra`
3. `ranger --copy-config=all`
4. 启用图片预览 `vim ~/.config/ranger/rc.conf`
    ```conf
    set preview_images true
    set preview_images_method sixel
    ```
5. 启用视频预览 `vi ~/.config/ranger/scope.sh`, 找到video取消注释

## 图片预览(Xorg) --ueberzug

st终端预览图片：
- https://github.com/seebye/ueberzug
- https://github.com/ranger/ranger/wiki/Image-Previews#with-ueberzug

```sh
# 安装库
doas emerge --ask  x11-libs/libXres

# 源码安装
doas ./setup.py install

ranger --copy-config=all

vi ~/.config/ranger/rc.conf
# --------修改-------
set preview_images true
set preview_images_method ueberzug
# ------------------
```

## 图片预览(wayland) --sixel

see: https://github.com/ranger/ranger/issues/723#issuecomment-701025904

- foot terminal: https://codeberg.org/dnkl/foot

```sh
# install dependies
doas emerge --ask libsixel imagemagic
# source code install ranger, use github `pythod xxx` install
```

## 视频预览

see https://github.com/ranger/ranger/wiki/Video-Previews

```sh
vi ~/.config/ranger/scope.sh
## ------ find handle_image, Uncomment next ------
  # Video
  video/*)
      # Thumbnail
      ffmpegthumbnailer -i "${FILE_PATH}" -o "${IMAGE_CACHE_PATH}" -s 0 && exit 6
      exit 1;;

```

## 配置

~/.config/ranger/  几个文件说明

- commonds.py 添加自己的命令
- rc.conf：配置，快捷键配置
- rifle.cong：文件默认程序
- scope.sh：文件预览方式

## 指令

| 操作        | 说明                             |
| ----------- | -------------------------------- |
| 空格        | 选中/去选中                      |
| :bulkrename | 批量重命名选中文件               |
| :delete     | 删除                             |
| shift + s   | 进入终端的当前路径               |
| yy          | 复制选中文件（夹）               |
| pp          | 粘贴                             |
| v           | 反选（若当前为选中，则选中所有） |
| dD          | 删除                             |
| zh          | 显示隐藏文件（夹）               |
| /           | 查找                             |
| [   ]       | 切换上级文件夹                 |


# Vim

## 配置

`vim ~/.vimrc` && `sudo vim /root/.vimrc`

配置root文件 避免sudo的时候配置不生效

```bash
set mouse=          " 关闭鼠标指针
syntax on           " 语法高亮
set tabstop=4       " 设置制表符宽度为 4
set shiftwidth=4    " 设置自动缩进宽度为 4
" set expandtab       " 将制表符扩展为空格
" 关闭文件类型检测的自动注释 粘贴会自动加上#
autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o
```

## 格式化代码

1. 下载 `https://gitee.com/liuyao_cool/vim-autoformat/tree/master/plugin` 下的文件
2. 将 `*.vim` 复制到 `~/.vim/plugin` 下
3. 重新 `vim` 一个文件, 输入 `:Autoformat` 即可格式化代码


# 输入法-fcitx5

## 安装

https://fcitx-im.org/wiki/Compiling_fcitx5

```sh
# 安装
doas emerge --ask app-i18n/fcitx app-i18n/fcitx-rime fcitx-gtk fcitx-qt

# 环境变量
export INPUT_METHOD=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx

# 配置rime为默认输入法
vi .config/fcitx5/profile
## --------- 修改 ------------------------
[Groups/0]
DefaultIM=rime

[Groups/0/Items/0]
Name=rime
## ---------------------------------
```

**注意:**
- [Groups/0/Items/0] 中Name设置为rime, 如果是keyboard-xxx则需要修改
- 修改配置文件 ~/.config/fcitx5/profile 时，请务必退出fcitx5, 因为fcitx5退出时会覆盖profile；
- 修改其他配置文件可以不用退出 fcitx5 输入法，重启生效。


## rime 输入引擎设置

**设置shift按键功能，快捷键**

```sh
vi /usr/share/rime-data/default.yaml
# ----------- 修改 -----------
ascii_composer:
  switch_key:
    Shift_L: commit_code
    Shift_L: commit_code

# or ？？
cd ~/.config/fcitx/rime
# ---- 文件内容 ----
schema_list:
  # 找到本文件 同目录下的 luna_pinyin_simp.schema.yaml 配置文件进行配置
  - schema: luna_pinyin_simp
```

**修改默认英文输入**

```sh
# 修改简体字默认为英文
vi /usr/share/rime-data/luna_pinyin_simple.schema.yaml
# ------------ 修改 ----------
switchs:
  - name: ascii_mode
    reset: 1 # 这一行默认使用下标为1的 
    states: [ 中[34m~V~G, 西[34m~V~G ]
```

## 皮肤

good theme: https://github.com/thep0y/fcitx5-themes-candlelight

```bash
# 主题存放路径
cd ~/.local/share/fcitx5/themes/
vim theme_name/theme.conf
# --- 自定义主题 ---

# 应用主题
vim ~/.config/fcitx5/conf/classicui.conf
  # 垂直候选列表
  Vertical Candidate List=False
  # 按屏幕 DPI 使用
  PerScreenDPI=True
  Font="华康翩翩体W5P 13"
  # 主题， 存放路径下的目录名
  Theme=spring
```

## wayland chrome support

```sh
/usr/bin/google-chrome-stable --ozone-platform-hint=wayland --gtk-version=4 
chromium --gtk-version=4
```

# 输入法-fcitx4

## 安装

```sh
# 1. 安装程序
doas emerge --ask app-i18n/fcitx app-i18n/fcitx-rime app-i18n/fcitx-configtool

# 2. 配置环境变量
vi ~/.xinitrc
# ------ 加入 -------
fcitx &
export XMODIFIERS="@im=fcitx"
export QT_IM_MODULE=fcitx
export GTK_IM_MODULE=fcitx

# 3. 配置rime输入法
fcitx-configtool
# 选择rime输入法，删除默认输入法，shift可切换中英文

# 快捷键设置
vi .config/fcitx/rime/build/default.yaml
# -- 修改 switcher.hotkeys

fcitx -d --replace
```

## 皮肤

```sh
# 全局
cp -r /自己皮肤目录 /usr/share/fcitx/skin
doas vi /usr/share/fcitx/configdesc/fcitx-classic-ui.desc
# --- fcitx-classic-ui.desc ----
[ClassicUI/SkinType]
DefaultValue=自己皮肤目录（目录名 非全路径 如：lyskin）
Description=自己皮肤名字

# 自定义
cp -r /自己皮肤目录 ~/config/fcitx/skin
vi ~/.config/fcitx/conf/fcitx-classic-ui.config
## --------- fcitx-classic-ui.config ----------
SkinType=lyskin（目录名 非全路径 如：lyskin）

# 重新部署
fcitx -r
```

# foot 终端 (Wayland)

## 配置

` ~/.config/foot/foot.ini `

```ini
# font=Fantasque Sans Mono:size=8, Joypixels:size=7:charset=1f000-1f644
font=Source Code Pro:size=10

[mouse]
hide-when-typing=yes

[colors]
alpha=0.7
background=000000
foreground=d1ba74

# folder
regular4=d2e327

# zsh-autosuggestions
bright0=8C979F
```

# Wine

## wine 与 staging

- wine: 稳定版
- wine staging: 开发版

## 安装

1. arch linux 安装: `sudo pacman -S wine`
2. 初始化配置: `winecfg`
2. 安装软件运行: `wine /path/xxx.exe`
3. 打开程序: 默认会创建 .desktop文件
  - 如果没有创建，找到安装目录，运行: `wine 启动程序.exe`
5. 卸载软件: `wine uninstaller`， 找到软件进行卸载

# 常用软件全名

- nc: openbsd-netcat
