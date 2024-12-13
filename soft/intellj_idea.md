
# Linux 开启 Wayland

version: 2024.xx+

` vim 安装目录/bin/idea64.vmoptions ` 添加

```
-Dawt.toolkit.name=WLToolkit
```

# color scheme

- [java](file/idea/java.icls)


# keymap

```
Editor Actions
    Move Caret to Line End                  --> alt right
    Move Caret to Line End with Selection   --> alt shift right
    Move Caret to Line Start                --> alt left
    Move Caret to Line Start with Selection --> alt shift left
Main menu
    File                                --> alt f
    Navigate
        Navigate in File
            Next Method                 --> alt down
            Previous Method             --> alt up
            Go to Declaration or Usages     --> ctrl up
            Go to Implementation(s)         --> ctrl down
            File Structure                  --> ctrl 0
        Goto By Name Actions
            Go to File...               --> Ctrl+P
    Build
        Build Project   --> alt s
    Code
        Generate...     --> alt g
    Run
        Debug...       --> alt d
        Run...         --> alt r
        Debuggins Actions
            Evaluate Expression..       --> alt e
    Window
        Editor Tabs
            Close Tab   --> ctrl w
Tool Windows
    Terminal            --> alt t
#    Structure           --> ctrl 0
Plugins
    FTP/SFTP Connectivity
        Upload Current Remote File  -> alt s
    Git
    	Branches...		--> alt b
Other
    Touchbar
        Default
            Select Run/Debug Configuration  --> alt w
```

# Settings

## View

```
View
    Appearance
        Main Menu   --> OFF
        Navigation Bar  --> OFF
        ToolBar     --> ON

```

## File -> Settings

```
Appearance & behavior
    System Settings
        -> Reopen projects on startup  --> close
Editor
    General 
        -> 取消勾选 Copy as Rich Text, 只复制文本, 不带标签
    Code Style
        Java
            -> "Code Generation" -> "Comment Code" --> 只保留 "Add a space at line comment start"
```

# 插件

1. MyBatisX
2. Lombok：实体类瘦身
3. Rainbow Brackets：彩虹括号(FFFA00  01FF10  F80000  00EAFF  FF8646)，部分功能免费
4. Grep Console：控制台筛选 设置颜色(INFO:004810  WARN:645700  ERROR:430000)

# 异常

## 分辨率异常

`vim 安装目录/bin/idea.properties`

```properties
sun.java2d.uiScale.enabled=false
```