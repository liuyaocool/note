# 美化终端

- [On My Posh](https://ohmyposh.dev/docs/themes)

# zsh

## 配置文件 

- `.zshrc`
- https://github.com/liuyaocool/nixos/blob/main/config_home/zshrc

## ohmyzsh(美化)

[官方网址](https://github.com/ohmyzsh/ohmyzsh.git)

```bash
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
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

[安装教程](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

```bash
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

- `vim ~/.vimrc` && `sudo vim /root/.vimrc`
- 配置root文件 避免sudo的时候配置不生效
- https://github.com/liuyaocool/nixos/blob/main/config_home/vimrc

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
```

## rime 输入引擎设置

- 配置使用
    - `~/.config/fcitx5/profile`
    - https://github.com/liuyaocool/nixos/blob/main/config/fcitx5/profile
    > - [Groups/0/Items/0] 中Name设置为rime, 如果是keyboard-xxx则需要修改
    > - 修改配置文件 ~/.config/fcitx5/profile 前，先退出fcitx5, 因为fcitx5退出时会覆盖profile
    > - 修改其他配置文件可以不用退出 fcitx5 输入法，重启生效
- 修改默认英文输入
    - `~/.local/share/fcitx5/rime/default.custom.yaml` 或 `/usr/share/rime-data/default.yaml`
    - https://github.com/liuyaocool/nixos/blob/main/local_share/fcitx5/rime/default.custom.yaml
- 符号直接上屏; 设置shift按键功能，快捷键
    - `~/.local/share/fcitx5/rime/luna_pinyin_simp.custom.yaml` 或 `/usr/share/rime-data/luna_pinyin.custom.yaml`
    - https://github.com/liuyaocool/nixos/blob/main/local_share/fcitx5/rime/luna_pinyin_simp.custom.yaml

## 皮肤

- 主题存放路径
    - `~/.local/share/fcitx5/themes/`
    - https://github.com/liuyaocool/nixos/tree/main/local_share/fcitx5/themes
    - 核心文件: theme.conf
- 应用主题
    - `~/.config/fcitx5/conf/classicui.conf`
    - https://github.com/liuyaocool/nixos/blob/main/config/fcitx5/conf/classicui.conf

## wayland chrome support

```sh
/usr/bin/google-chrome-stable --ozone-platform-hint=wayland --gtk-version=4 
chromium --gtk-version=4
```

# foot 终端 (Wayland)

- ` ~/.config/foot/foot.ini `
- https://github.com/liuyaocool/nixos/blob/main/config/foot/foot.ini

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

# sublime text

- 安装
    - 个人修改版,解压可直接运行： [sublime text 4134](https://bigfile.liuyao.link/linux/sublime_text_4134.zip)
    - 官方下载手动修改： [see blog](https://blog.csdn.net/yelon_/article/details/130831525)
        1. [下载](https://download.sublimetext.com/sublime-text_build-4143_amd64.deb)
        2. 修改`软件根目录/sublime_text`, 在[HexEd.it](https://hexed.it/)(或自定)中 打开并替换`80 78 05 00 0F 94 C1`为`C6 40 05 01 48 85 C9`
- 配置
    - https://github.com/liuyaocool/nixos/tree/main/config/sublime-text/Packages/User
