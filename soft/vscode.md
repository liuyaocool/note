# 网页版vscode

## 下载

1. 查看cpu架构: `dpkg --print-architecture`
2. https://github.com/coder/code-server/releases 中找到适合自己机器的版本下载

## 安装运行

> 注：最好不要以root用户运行。网页客户端可以打开终端，以root运行会获得root权限

### deb

1 安装: `sudo dpkg -i code-server_xxx_amd64.deb`

2 运行: `code-server >vscode.log 2>&1 &`

3 修改样式: 

```bash
# 进入目录
cd /usr/lib/code-server/
cd lib/vscode/out/vs/

# ---------- 按需修改样式 ----------
sudo vi workbench/workbench.web.main.css

sudo vi code/browser/workbench/workbench.html
# ----------- 找到如下一行 添加样式版本号 ---------
## <link data-name="vs/workbench/workbench.web.main" rel="stylesheet" href="{{WORKBENCH_WEB_BASE_URL}}/out/vs/workbench/workbench.web.main.css?v=1.0">
```

### tar

1. 安装: `tar -zxvf code-server_xxx_amd64.deb`
2. 运行: ``

## 配置

`vim ~/.config/code-server/config.yaml`

```yaml
bind-addr: 0.0.0.0:8080
auth: password
password: 登录密码
cert: false
```

## 运行

# 插件

## SFTP(Natizyskunk)

**config**

`vim .vscode/sftp.json`

```json
[{
    "name": "maliit-keyboard",
    "context": "maliit-keyboard",
    "host": "192.168.3.10",
    "port": 22,
    "username": "liuyao",
    "remotePath": "/home/liuyao/mypro/malit-keyboard",
    "ignore": [".vscode", ".git", ".DS_Store", ".idea"],
    "uploadOnSave": true,
    "privateKeyPath": "~/.ssh/id_ed25519"
}, {
    "name": "mypro",
    "context": "mypro",
    "host": "192.168.3.10",
    "port": 22,
    "username": "liuyao",
    "remotePath": "/home/liuyao/mypro",
    "ignore": [".vscode", ".git", ".DS_Store", ".idea"],
    "uploadOnSave": true,
    "privateKeyPath": "~/.ssh/id_ed25519"
}]

```

# settings.json 设置

## windows

```json
{
    // 新标签打开文件
    "workbench.editor.enablePreview": false,
    // 新窗口打开新项目
    "window.openFoldersInNewWindow": "on",
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.fontFamily": "'Source Code Pro'",
    // 这两项禁用 alt按键聚焦到菜单栏
    "window.titleBarStyle": "custom",
    "window.customMenuBarAltFocus": false,
    "workbench.colorTheme": "Default Dark+",
    "redhat.telemetry.enabled": true,
    "workbench.startupEditor": "none"
}
```

配置终端

![](/soft/img/vscode-msys2.png)

## linux

```json
{
    // 新标签打开文件
    "workbench.editor.enablePreview": false,
    // 新窗口打开新项目
    "window.openFoldersInNewWindow": "on",
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.fontFamily": "'Source Code Pro'",
    "terminal.integrated.defaultProfile.linux": "zsh",
    "terminal.integrated.profiles.linux": {
        "bash": {
            "path": "bash",
            "icon": "terminal-bash"
        },
        "zsh": {
            "path": "zsh"
        }
    },
    // 这两项禁用 alt按键聚焦到菜单栏
    "window.titleBarStyle": "custom",
    "window.customMenuBarAltFocus": false,
    "workbench.colorTheme": "Default Dark+",
    "redhat.telemetry.enabled": true,
    "workbench.startupEditor": "none"
}
```

# Snippets 代码提示

## rust.json

```json
{
    "test":{
        "prefix": "test",
        "body": [
            "#[test]",
            "fn ${fn}() {",
            "\t${body}",
            "}"
        ],
        "description": "test func"
    },
    "testmod":{
        "prefix": "testmod",
        "body": [
            "#[cfg(test)]",
            "pub mod test_${modname} {",
            "\t${body}",
            "}"
        ],
        "description": "test func"
    }
}
```

## javascript.json

```json
{
    "fori+":{
        "prefix": "fori+",
        "body": [
            "for (let ${i} = ${start}; ${i} < ${len}; ${i}++) {",
            "\t${body}",
            "}"
        ]
    },
    "fori-":{
        "prefix": "fori-",
        "body": [
            "for (let ${i} = ${len}-1; ${i} >= ${end}; ${i}--) {",
            "\t${body}",
            "}"
        ]
    },
    "if":{
        "prefix": "iff",
        "body": [
            "if (${statement}) {",
            "\t${body}",
            "}"
        ]
    },
    "case":{
        "prefix": "cass",
        "body": [
            "case '${p}'",
            "\t${body}",
            "\tbreak;"
        ]
    },
    "default":{
        "prefix": "def",
        "body": [
            "default:",
            "\t${body}",
            "\tbreak;"
        ]
    },
    "function":{
        "prefix": "funce",
        "body": [
            "function ${name}(e) {",
            "\t${body}",
            "}"
        ]
    }
}
```

# keybindings

## linux/windows

```json
[
    {
        "key": "alt+t",
        "command": "workbench.action.terminal.toggleTerminal",
        "when": "terminal.active"
    },
    {
        "key": "ctrl+`",
        "command": "-workbench.action.terminal.toggleTerminal",
        "when": "terminal.active"
    },
    {
        "key": "shift+enter",
        "command": "editor.action.insertLineAfter",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+enter",
        "command": "-editor.action.insertLineAfter",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+d",
        "command": "editor.action.copyLinesDownAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+shift+alt+down",
        "command": "-editor.action.copyLinesDownAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "home",
        "command": "-editor.action.goToTopHover",
        "when": "editorHoverFocused"
    },
    {
        "key": "alt+right",
        "command": "editor.action.goToBottomHover",
        "when": "editorHoverFocused"
    },
    {
        "key": "end",
        "command": "-editor.action.goToBottomHover",
        "when": "editorHoverFocused"
    },
    {
        "key": "alt+left",
        "command": "cursorHome",
        "when": "textInputFocus"
    },
    {
        "key": "home",
        "command": "-cursorHome",
        "when": "textInputFocus"
    },
    {
        "key": "shift+alt+left",
        "command": "cursorHomeSelect",
        "when": "textInputFocus"
    },
    {
        "key": "shift+home",
        "command": "-cursorHomeSelect",
        "when": "textInputFocus"
    },
    {
        "key": "alt+right",
        "command": "cursorEnd",
        "when": "textInputFocus"
    },
    {
        "key": "end",
        "command": "-cursorEnd",
        "when": "textInputFocus"
    },
    {
        "key": "shift+alt+right",
        "command": "cursorEndSelect",
        "when": "textInputFocus"
    },
    {
        "key": "shift+end",
        "command": "-cursorEndSelect",
        "when": "textInputFocus"
    },
    {
        "key": "ctrl+up",
        "command": "editor.action.goToDeclaration"
    },
    {
        "key": "ctrl+alt+left",
        "command": "workbench.action.navigateBack",
        "when": "canNavigateBack"
    },
    {
        "key": "ctrl+alt+-",
        "command": "-workbench.action.navigateBack",
        "when": "canNavigateBack"
    },
    {
        "key": "ctrl+alt+right",
        "command": "workbench.action.navigateForward",
        "when": "canNavigateForward"
    },
    {
        "key": "ctrl+shift+-",
        "command": "-workbench.action.navigateForward",
        "when": "canNavigateForward"
    },
    {
        "key": "ctrl+alt+right",
        "command": "-workbench.action.moveEditorToNextGroup"
    },
    {
        "key": "alt+1",
        "command": "workbench.view.explorer",
        "when": "viewContainer.workbench.view.explorer.enabled"
    },
    {
        "key": "ctrl+shift+e",
        "command": "-workbench.view.explorer",
        "when": "viewContainer.workbench.view.explorer.enabled"
    },
    {
        "key": "alt+1",
        "command": "-workbench.action.openEditorAtIndex1"
    },
    {
        "key": "ctrl+r",
        "command": "editor.action.startFindReplaceAction",
        "when": "editorFocus || editorIsOpen"
    },
    {
        "key": "ctrl+h",
        "command": "-editor.action.startFindReplaceAction",
        "when": "editorFocus || editorIsOpen"
    },
    {
        "key": "ctrl+r",
        "command": "-workbench.action.openRecent"
    },
    {
        "key": "tab",
        "command": "-acceptSelectedSuggestion",
        "when": "suggestWidgetHasFocusedSuggestion && suggestWidgetVisible && textInputFocus"
    }
]
```