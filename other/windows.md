# Win7

## 禁用win按键打开菜单

1.   Win + R , 输入 regedit
2. 在注册表编辑器中, 导航到以下路径: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout` 
3. 创建禁用Win键的项: Keyboard Layout 键下右键，选择 New -> Binary Value。
4. 将新创建的二进制值命名为 Scancode Map。
5. 双击 Scancode Map，进入编辑模式。在编辑框中输入以下16进制数值：
    - ` 00000000 00000000 03000000 00005BE0 00000000 `  这个值的含义是将左Win键映射为一个不存在的键码（0xE0）, 从而禁用它.
    - ` 00000000 00000000 03000000 00005CE0 00000000 `  右Win键可以通过此值禁用
6. 保存并重启：

## 程序列表

- [win7破解程序kmspico](https://resource.liuyao.link/file/kmspico.exe)
- [chrome 支持win7](https://bigfile.61linux.com/win7/chrome.exe)
- [.net 4](https://bigfile.61linux.com/win7/dnet4.exe)
- [百度拼音3.1](https://bigfile.61linux.com/win7/BaiduPinyin3.1.exe)

# win10

## 关闭系统更新

1. 使用“服务”管理工具
    - `Win+R`, 输入 `services.msc`，按Enter。
    - 在服务窗口中，找到 `Windows Update` 服务，右键选择`属性`。
    - 属性窗口中，启动类型设置为`禁用`，然后点击`停止`来停止当前更新服务。
    - 点击 `应用` 和 `确定` 以保存设置。
2. 使用组策略编辑器（仅限 Windows 10 Pro 和 Enterprise）
    - `Win+R`，输入`gpedit.msc`，按Enter。
    - 在本地组策略编辑器中，依次展开：`计算机配置 > 管理模板 > Windows 组件 > Windows 更新`。
    - 找到并双击`配置自动更新`，选择`已禁用`，然后点击`应用`和`确定`。
    - 找到并双击`指定Intranet Microsoft更新服务位置`，选择`已启用`，将左下角三个服务器都设置为`127.0.0.1`，然后点击`应用`和`确定`。
3. 使用注册表编辑器
    - 按 Win + R 打开运行窗口，输入 regedit 并按 Enter。
    - 导航到：HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU（如果没有 WindowsUpdate 和 AU 文件夹，你需要手动创建）。
    - 在右侧窗格中，右键单击空白区域，选择 新建 > DWORD (32 位) 值。
    - 将新值命名为 NoAutoUpdate，然后将其值设置为 1。
    - 关闭注册表编辑器并重启计算机。