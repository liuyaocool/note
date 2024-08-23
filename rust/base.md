# 换源

- 清华源(稀疏索引,推荐) : https://mirrors.tuna.tsinghua.edu.cn/help/crates.io-index/
- 清华源: https://mirrors.tuna.tsinghua.edu.cn/help/crates.io-index.git/
- 中科大源: https://mirrors.ustc.edu.cn/help/crates.io-index.html

```bash
# 链接文件 以兼容所有版本
cd ~/.cargo && ln -s config config.toml
```

# vscode 插件

- "rust-analyzer" by "rust-lang.org"
- "Better TOML" by "bungcip": toml 高亮


# Cargo

## 依赖查询

` https://crates.io `

## 命令说明

- `cargo run`: 运行项目
- `cargo build`: 下载依赖 编译
- `cargo update`: 更新依赖

## 文件 Cargo.toml

```toml
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

#依赖, cargo build 会自动下载 0.8.x 下的最新版, 版本号会写入Cargo.lock文件
[dependencies]
rand = "0.8.5"
```

## 文件 Cargo.lock

```lock
version = 3

[[package]]
name = "rand"
version = "0.8.5"
source = "registry+https://github.com/rust-lang/crates.io-index"
checksum = "34af8d1a0e25924bc5b7c43c079c942339d8f0a8b57c39049bef581b46327404"
dependencies = [
 "libc",
 "rand_chacha",
 "rand_core",
]
```