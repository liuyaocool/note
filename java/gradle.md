# 目录结构

```bash
.
├── build.gradle # 同 maven pom.xml
├── buildSrc # 定义项目全局插件、任务、。。。
│   ├── build.gradle
│   └── src
│       └── main
│           └── groovy
│               └── MyPlugin02.groovy
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle # 配置子项目 子模块
├── src
│   ├── main
│   └── test
└── SubPro01 # 子项目
    ├── build.gradle
    └── src
        ├── main
        └── test
```


# build.gradle

等价于 maven中的pom.xml

```groovy
plugins {
    id 'java'
}

group = 'org.springframework'
version = '1.0-SNAPSHOT'

// maven仓库顺序
repositories {
    mavenLocal() 
    mavenCentral()
}

dependencies {
    testImplementation platform('org.junit:junit-bom:5.10.0')
    testImplementation 'org.junit.jupiter:junit-jupiter'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
    implementation("com.mysql:mysql-connector-j:9.4.0")
}

// 中文乱码
tasks.withType(JavaCompile) {
    options.encoding = "UTF-8"
}

test {
    useJUnitPlatform()
}
```

## dependencies

```groovy
dependencies {
    testImplementation platform('org.junit:junit-bom:5.10.0')
    testImplementation 'org.junit.jupiter:junit-jupiter'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
    // 引包 最常用, 不可传递， 仅内部可用
    implementation("com.mysql:mysql-connector-j:9.4.0")
    // project 当前项目子模块
    implementation(project(":SubPro01"))
    // 编译时 不会打包到项目中， 最常见如servlet api, 项目部署到容器(自带运行时)
    compileOnly("com.mysql:mysql-connector-j:9.4.0")\
    // 可传递
    api(project(":spring-core"))
}


```

## mavenLocal()

> ~~默认本地位置: `~/.gradle/caches/modules-2/files-2.1`~~  
> ~~配置环境变量: `GRADLE_USER_HOME=~/.m2/repository`, 此变量只是把 .gradle/ 换个路径~~  
> 此配置可直接使用, 默认查找maven本地仓库 `~/.m2/repository` 位置

## tasks 任务

```groovy
// t1~t4 (已废弃)
task("t1", {
    group("custom")
    println "task 1 create"
})
task t2 {
    group("custom")
    println "task 2 create"
}
tasks {
    task t3 {
        group("custom")
    }
}
t3.dependsOn t1
tasks.create("t4") {
    dependsOn 't2'
    group("custom")
}
// 新语法 (推荐)
tasks.register("t5") {
    // 配置代码
    group = "custom"
    description = "This is task t5"
    println "task 5 create"
    // 动作代码
    doFirst {
        println "t5 first"
    }
    doLast {
        println "t5 last"
    }
}
3.times {idx ->
    tasks.register("tt${idx}") {
        group = "custom"
        println "tt${idx}"
    }
}
tasks.register('t6') {
    group = "custom"
    dependsOn t5, t7
    println "task 6 create"
}
tasks {
    tasks.register('t7') {
        group = "custom"
        println "task 7 create"
    }
}
// 修改内置任务
clean.doFirst {
    println("clean first")
}

tasks.named("clean").get().doLast {
    println("clean last")
}
```

> 任务执行时机: 

## plugins

### 发布到本地maven仓库

```groovy
plugins {
    id 'java-library'
    id 'maven-publish'
}
publishing {
    // config action
    publications {
        maven(MavenPublication) {
            from components.java
        }
    }
    // to local maven lib
    repositories {
        mavenLocal()
    }
}
```

### 自定义插件

```groovy
class MyPlugin01 implements Plugin<Project> {
    @Override
    void apply(Project project) {
        project.tasks.register("myPluginTask01") {
            doLast {
                println("custom plugin 01")
            }
        }
    }
}

apply plugin:MyPlugin01
```


# settings.gradle

配置项目中的子项目

```groovy
rootProject.name = 'mygradletest'
include 'SubPro01' 
```


# buildSrc/

build.gradle中定义的只能在当前文件中使用, 但buildSrc/ 下的可全局使用

## build.gradle

> 此文件可指定当前项目使用java or groovy

```groovy
apply plugin:'groovy'
```

## MyPlugin02.groovy

```groovy
import org.gradle.api.Plugin
import org.gradle.api.Project

class MyPlugin02 implements Plugin<Project>{
    @Override
    void apply(Project target) {
        target.tasks.register("myPlugin02") {
            doLast {
                println("custom plugin 02")
            }
        }
    }
}
```

> 引用: 模块build.gradle中加入`apply plugin:MyPlugin02`

# 版本冲突

## 自动解决

- maven: **最短路径优先原则**
- gradle: **最高版本原则**

## 手动解决

```groovy
implementation("org.springframework.boot:spring-boot-starter:4.0.0-M3") {
    exclude group: "org.springframework.boot", module:"spring-boot-starter-logging"
}
```

## 不做冲突解决

```groovy
configurations.all {
    resolutionStrategy {
        failOnVersionConflict()
    }
}
```

## 强制指定版本

```groovy
configurations.all {
    resolutionStrategy {
        force "org.springframework.boot:spring-boot-starter-logging:4.0.0-M2"
    }
}
```

# 多项目构建

## 根项目

### settings.gradle

```groovy
rootProject.name = 'mygradletest'
include 'SubPro01'
include 'SubPro02'
include 'SubPro03'
```

### build.gradle

```groovy
// 所有项目配置 根+子
allprojects {
    // apply plugin: 'java'  // 传统方式，仍然可用但可能已过时
    pluginManager.apply('java')
    group = 'org.springframework'
    version = '2.0'
    // 此语法失效了
    // plugins {
    //     id 'java'
    // }
}
// 仅仅给子项目配置
subprojects {
    repositories {
        mavenLocal()
        mavenCentral()
    }
    dependencies {
        testImplementation platform('org.junit:junit-bom:5.10.0')
        testImplementation 'org.junit.jupiter:junit-jupiter'
        testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
    }
}
```

## 子项目 build.gradle

```groovy
description = "Spring Web"

apply plugin: "kotlin"
apply plugin: "kotlinx-serialization"

dependencies {
    // 引用当前项目其他模块
    compileOnly(project(":SubPro01"))
}
```