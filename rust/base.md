# 安装 & 教程

- [官网入门](https://rust-lang.org/zh-CN/learn/get-started/)
- 产看版本: `rustc -V`


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

## 快速创建项目

- 没有创建文件夹: `cargo new <项目明(项目文件夹名)>`
- 已经创建文件夹: 进入目录执行 `cargo init`

## 目录结构

```


```

## 依赖

- 查询: [https://crates.io](https://crates.io)
- 添加: `cargo add xxxx` (上方网站中查询)

## 命令说明

- `cargo run`: 运行项目
- `cargo build`: 下载依赖 编译
- `cargo update`: 更新依赖

## Cargo.toml

```toml
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

#依赖, cargo build 会自动下载 0.8.x 下的最新版, 版本号会写入Cargo.lock文件
[dependencies]
rand = "0.8.5"
```

## Cargo.lock

记录项目依赖的确切版本号， 不建议删除

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

# 语法

## 基础语法

### 宏
```rust
// !: 宏
println!("hello world");
```

### 声明变量

- 语法: `let 变量名(: 类型) = xxx`, 类型可省略, rust会自动推断
- `let` 不可变， 通过let重定义可重新赋值
- `let mut` 可变
- `const` 常量

### 基础数据类型

```
整数类型
 长度(bit)  带符号   无符号
     8      i8      u8
    16      i16     u16
    32      i32     u32
    64      i64     u64
   128      i128    u128
  arch      isize   usize

整数字面值: 
  数制       示例           加类型后缀示例
 16进制      0xff            0xffu8
 10进制      10_0000         10_0000u8
  8进制      0o77            0o77u8
  2进制      0b0101_1010     0b0101_1010u8
 byte(u8)    b'A'            不支持
```

```rust
// 常量
const FIXEF_ATTR:i32 = 10_0000;
println!("fixed attr is {}", FIXEF_ATTR);

// 不可变 通过let 重定义可重新赋值
let _cover = 12;
let _cover = 13;
let _cover = _cover + 2;
println!("cover is {}", _cover);

let hex8 = 0b0101_1010u8;
let hex16 = 0xffu16;
println!("hex8 = {}", hex8);
println!("hex16 = {}", hex16);

// 浮点类型: f32 f64
let f3: f32 = 12.2;
let f6: f64 = 125.1234;
println!("f3 = {}", f3);
println!("f6 = {}", f6);
let f36 = f3 as f64; // 数据类型转换

// 布尔: bool
let t = true;
let f: bool = false;
println!("t = {}", t);
println!("f = {}", f);

// 字符: char
let c1 = 'a';
let c2 = '☆';
let c3 = '✓';
println!("c1 = {}", c1);
println!("c2 = {}", c2);
println!("c3 = {}", c3);
```

### 元组
```rust
let tup: (i32, u32, f32) = (12, 123, 12.1);
println!("tup = ({} {} {})", tup.0, tup.1, tup.2);
// 解构元组
let (x, y, x) = tup;
println!("x={} y={} z={}", x, y, z);
```

### 数组

```rust
// 数组
let arr1:[u32; 3] = [1, 2, 3];
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
println!("a[0] = {}", arr1[0]);
println!("aa[7] = {}", arr2[7]);

// 遍历数组
print!("arr2 = ");
for ele in arr2.iter() {
    print!("{} ", ele);
}
println!();

```

### 函数

```rust
fn main() {
    // 函数
    let fn1 = 32;
    print_a(fn1);

    let x1 = 12;
    let fn2 = {
        let x1 = 61;
        x1 + 100
    };
    println!("x1 = {}; fn2 = {}", x1, fn2); // 161

    // let fn3 = {
    //     let x1 = 61;
    //     x1 + 100; // -> ()
    // };
    // println!("fn3 = {}", fn3); // fn3 = ()

    let add = int_add(12, 22);
    println!("add = {}", add);

    // range: 标准库提供, 指定 区间 [), rev()函数反转
    print!("1~19: ");
    for ele in (1..19).rev() {
        print!("{} ", ele);
    }
    println!();
}

fn print_a(a: i32) {
    println!("print_a -> a = {}", a);
}

fn int_add(a: i32, b: i32) -> i32 {
    // 最后一行表达式就是返回值， 不用加return
    a + b
}

// 接受固定长度数组
fn print_list(list: [i32; 10]) {

}

// 接受可变长度数组
fn print_list2(list: &[i32]) {

}

```

### if-else

```rust
let add = 33;

if add < 34 {
    println!("add < 34");
}else if add == 34 {
    println!("add == 34");
} else {
    println!("add >= 34");
}

// if 是一个表达式， 可以放到“=”右边
// 三元表达式
let add_ = if add %3 == 0 { "add % 3" } else { "add !% 3" };
println!("add_ = {}", add_);
```

### 循环

```rust
// loop
let mut i = 0;
let loopc = loop {
    i += 1;
    if i > 10 {
        break i * 2;
    }
};
println!("i={} loopc={}", i, loopc); // --> i=11 loopc=22

// while
while i < 30 {
    i += 1;
}
println!("while i = {}", i);

// for
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for ele in arr2.iter() {
    println!("arr2 {} ", ele);
}

// Range左闭右开 + for 循环， rev反转函数
for n in (1..10).rev() {
    println!("range {}", n);
}
```

## 高级语法

### 结构体

```rust
struct User {
    age: i8,
    has_bar: bool,
    name: String,
}
let u1 = User {
    age: 18,
    name: String::from("张三"),
    has_bar: true,
};
println!("name={}", u1.name);

let u2 = User {
    name: String::from("李四"),
    ..u1 // 其他属性copy u1
};
println!("u2 name={} age={} bar={}", u2.name, u2.age, u2.has_bar);
```

### 元组结构体

```rust
struct Color(pub u8, pub u8, pub u8, pub u8);

let black = Color(0, 0, 0, 1);
println!("black=[{}, {}, {}, {}]", black.0, black.1, black.2, black.3);
```

### 枚举

```rust

```

### 字符串

```rust
fn main() {
    // &str: 字符串切片， 不可变， 静态数据
    let data: &str = "hello world";
    
    // String: 可变， 拥有所有权

    // to_string 将切片转换为String
    let s: String = data.to_string();
    let s1: String = "hello".to_string();
    let s2: String = String::from("world");

    let s3: String = s1 + "_" + &s2 + "_" + &s;

    let s4: String = format!("{}-{}-{}", s, s2, String::from("value"));
}
```

### async await

**await：等待异步任务完成, 必须在async{}代码块中**

```rust
async fn main() {
    let listener = TcpListener::bind("0.0.0.0:8303").await;
}
```

### 异常 -> ?

- 错误传播， 类似`throw Exception`, 需要在函数返回值中添加 `Result/Option`
- async{}块不可用, 因为返回的是`()`, 如 `tokio::spawn(async move {});`

```rust
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("0.0.0.0:8303").await?;
}
```

### Result Option

```rust
// Option：表示可能有值，也可能没有值
enum Option<T> {
    Some(T),      // 有值
    None,         // 没有值
}

// Result：表示操作可能成功，也可能失败
enum Result<T, E> {
    Ok(T),        // 成功，包含值
    Err(E),       // 失败，包含错误信息
}
```

### drop机制

- 资源自动清理的核心机制， 它确保当值离开作用域时，相关的资源（内存、文件句柄、网络连接、锁等）被正确释放。
- Drop 是 Rust 的一个 trait（特征），定义了值被清理时应该执行的操作。
- Drop 的调用时机， 在有所有权的作用域结束的时候被调用。

### 闭包

### turbofish语法

`args[2].parse::<i32>()`

### unsafe

需要程序员保证安全的代码快， rust不提供安全保证了， FFI是其主要使用场景

## 所有权

> 栈地址: 本地变量表

所有权： rust独有， 无需GC即可保证内存安全

1. 每个值都有一个变量， 此变量为这个值的所有者
2. 每个值同时只能有一个所有者
3. 当所有者超出作用域(scope), 该值被删除

### 变量与所有权

```rust
fn main() {
    // 变量作用域
    {
        let a = "hello"; // a从这里开始有效
        println!("{}", a);
    } // 离开代码块后 内部的变量就失效了
    // rust 如果某个值的拥有者走出作用域, 这个值会被立刻释放, drop函数

    println!("------ 移动 ------");
    let s1 = String::from("hello");
    println!("s1={} 栈={:p} 堆={:p}", s1, &s1, s1.as_ptr());
    let s2 = s1; // s1被移动到s2，s1失效
    // println!("s1={} s1栈地址={:p}", s1, &s1); // 编译报错
    println!("move s2={} 栈={:p} 堆={:p}", s2, &s2, s2.as_ptr());

    println!("------ 克隆 ------");
    let s1 = String::from("hello");
    println!("s1={} 栈={:p} 堆={:p}", s1, &s1, s1.as_ptr());
    let s2 = s1.clone();
    println!("clone s1={} 栈={:p} 堆={:p}", s1, &s1, s1.as_ptr());
    println!("clone s2={} 栈={:p} 堆={:p}", s2, &s2, s2.as_ptr());
}
```

### 函数与所有权

```rust
fn main() {
    // 对象： 封装类型
    let s1 = String::from("hello");
    ow_str(s1); // s1所有权转移给了函数
    // println!("{}", s1); // 编译报错

    // 标量： 基础类型
    let n = 5;
    ow_base(n); // 基础类型在函数传递的时候是复制操作 
    println!("n={}", n);

    let s1 = String::from("hello");
    println!("s1={} 栈={:p} 堆={:p}", s1, &s1, s1.as_ptr());
    let s2 = ow_str2(s1); // s1堆空间被函数转移回来
    // println!("s1={} 栈={:p} 堆={:p}", s1, &s1, s1.as_ptr());  // s1已经转移给函数， 这里报错
    println!("s2={} 栈={:p} 堆={:p}", s2, &s2, s2.as_ptr());
}

fn ow_base(num: i32) {
    println!("num={}", num);
}

fn ow_str(str: String) {
    println!("str={} 栈={:p} 堆={:p}", str, &str, str.as_ptr());
} // str离开作用域， 被释放

fn ow_str2(str: String) -> String {
    println!("str2={} 栈={:p} 堆={:p}", str, &str, str.as_ptr());
    str // 这里返回了， 所有权转移
} 
```

### 借用

- 不获得所有权
- 语法: `&T`, 只读借用 如
    ```rust
    fn main() {
        let buf = [0; 1024];
        print_buf(&buf); 
    }
    fn print_buf(buf: &[u8; 1024]){
    } 
    ```
- 可变借用 `&mut T`
    ```rust
    fn main() {
        let mut buf = [0; 1024];
        print_buf(&mut buf); 
    }
    fn print_buf(buf: &mut [u8; 1024]){
    }
    ```

## 线程

### 创建



### 移动

```rust
move
```
