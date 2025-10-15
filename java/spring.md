# 学习思路

## 前置知识

设计模式 

## 注意事项

1. 不要关注细节: 先整体脉络
2. 看注释 (接口 类 方法)
3. 见名知意
4. 大胆猜测， 小心验证
5. 画图 (时序图 结构图 总结图)
6. 坚持 多难


# 说明

基于 github 5.3.x分支

https://github.com/spring-projects/spring-framework/tree/6.2.x

# spring 是什么

## 模块

1. 核心容器: Beans, Core, Context, SpEL
    - Ioc/DI: 控制反转,也叫依赖注入
2. Spring-AOP, Aspects
3. Spring Data Access(数据访问): 
    - spring-jdbc
    - spring-tx
    - spring-orm
    - spring-jms
    - spring-oxm
4. Spring Web
    - Websocket
    - Servlet
    - Web
    - Portlet


## 事务 @Transactional

引入
```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
</dependency>
```

### 事务传播属性: propagation 


### 隔离级别: isolation

# 导入项目

## gradle jdk 版本问题

```
spring-framework-6.2.x/buildSrc/src/main/java/org/springframework/build/TestConventions.java:58: error: ')' expected
			if (existingOptions instanceof JUnitPlatformOptions junitPlatformOptions) {
```

**如何解决**

spring6.2.x gradle 使用的是jdk16+, 到**setting->gradle:GradleJVM 修改为16+**

