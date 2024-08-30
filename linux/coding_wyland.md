# 查询 支持的接口

Wayland取代X11系统，创立了高效的本地图形协议栈。内部采用接口机制，图形服务通过各接口提供。所以第一步就是连接wayland服务器，并轮询服务器提供那些接口。

```c
#include <wayland-client.h>
#include <stdio.h>
#include <unistd.h>

static void on_global_added(void *data,
                            struct wl_registry *wl_registry,
                            uint32_t name,
                            const char *interface,
                            uint32_t version) {
    fprintf(stderr, "Global added: %s, v %d (name %d)\n", interface, version, name);
}

static void on_global_removed(void *data,
                            struct wl_registry *wl_registry,
                            uint32_t name)
{
    fprintf(stderr, "Global Removed: (name %d)\n", name);
}

struct wl_registry_listener s_registryListener = {
    on_global_added,
    on_global_removed
};

int main() {
    //get wayland display
    struct wl_display *display = wl_display_connect(0);
    if (!display) return 1;
    //get registry
    struct wl_registry *reg = wl_display_get_registry(display);
    if (!reg) return 1;
    //poll
    wl_registry_add_listener(reg, &s_registryListener, NULL);
    wl_display_roundtrip(display);
    wl_display_disconnect(display);
    return 0;
}
```

# 创建窗口

Wayland中，窗口用surface表示。要想创建一个显示hello world!的窗口，首先得了解xdg_wm_base接口。

XDG是cross-desktop group（跨桌面组织)提出的接口，xdg_wm_base是唯一全局定义的XDG接口，可以用他创建其他XDG接口。

XDG提供两种窗口(surface), 一种是"toplevel", 即应用程序的顶层(主)窗口。另一种是"popup", 如上下文菜单，下拉菜单，提升框等等。

作为顶层窗口的字窗口. 这些XDG接口定义在`/usr/share/wayland-protocols/stable/xdg-shell/xdg-shell.xml`里，要想使用的话，首先需要用wayland-scanner将其转化为C语言定义文件:

` wayland-scanner client-header /usr/share/wayland-protocols/stable/xdg-shell/xdg-shell.xml xdg-shell-protocol.h `

## Makefile

将其加入Makefile的话，需要用pkg-config对wayland-scanner和wayland-protocol定位:

```Makefile
WAYLAND_SCANNER         = $(shell pkg-config --variable=wayland_scanner wayland-scanner)
WAYLAND_PROTOCOLS_DIR   = $(shell pkg-config wayland-protocols --variable=pkgdatadir)
XDG_SHELL_PROTOCOL      = $(WAYLAND_PROTOCOLS_DIR)/stable/xdg-shell/xdg-shell.xml

BUILD_DIR               = build
SOURCES                 = hello.c xdg-shell-protocol.c

all: helloworld
    echo "done"

clean:
    rm -rf ${BUILD_DIR}

helloworld: $(SOURCES) xdg-shell-client-protocol.h
    gcc -o ${BUILD_DIR}/$@ $(SOURCES) -lwayland-client

xdg-shell-client-protocol.h:
    $(WAYLAND_SCANNER) client-header $(XDG_SHELL_PROTOCOL) ${BUILD_DIR}/$@

xdg-shell-protocol.c:
    $(WAYLAND_SCANNER) private-code $(XDG_SHELL_PROTOCOL) ${BUILD_DIR}/$@

```

## coding

xdg_wm_base接口可以通过xdg_wm_base_get_xdg_surface请求窗口一个xdg_surface. 函数定义如下:

`struct xdg_surface * xdg_wm_base_get_xdg_surface(struct xdg_wm_base *xdg_wm_base, struct wl_surface *surface);`

但它需要一个wl_surface结构。这个结构由wl_compositor接口的

