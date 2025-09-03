
**todo 缓慢输出中。。**


# 设计原则

## 1. 单一职责原则：粒度小，功能单一的类

**官方定义**

一个类或者模块只负责完成一个职责（或者功能）。

**通俗解释**

在类的设计中 我们不要设计大而全的类，而是要设计粒度小、功能单一的类.

例如

```java
public class User {
    private String userId;
    private String username;
    // 如果地区属性 没有其他地方使用，此类就符合单一职责
    // 如果有其他地方使用, 如Company中包含地址信息， 则不符合
    // 是否符合 根据具体业务确定
    private String province;
    private String city;
    private String district;
}
```

## 2. 开闭原则(所有设计模式最核心目标)：对扩展开放，对修改关闭

**官方定义: 念一遍就行了**

在面向对象编程领城中，开闭原则规定软件中的对象、类、模块和函数对扩展应该是开放的：得对手修改是封闭的。这意味着应该用抽象定义结构，用具体实现扩展细节，以此确保软件系统开发和维护过程的可靠性。

**通俗解释**

定义： `对扩展开放，对修改关闭`

优点：

1. 新老逻辑解耦，需求发生改变不会影响老业务的逻辑
2. 改动成本最小，只需要追加新逻辑，不需要改的老逻辑
3. 提供代码的稳定性和可扩展性

**实现:** 定义接口, 上层逻辑调用接口, 而底层具体实现是可以替换、扩展的

## 3. 里氏替换原则：看接口就知道其实现类要做什么

**官方定义**

如果S是T的子类型，对于S类型的任意对象，如果将他们看作是T类型的对象，则对象的行为也理应与期望的行为一致。

**通俗解释**

- **什么是替换：** 前提是多态
  ```java
  // 此方法的参数可以替换为所有实现Runnable接口的实现类, 则此方法的扩展性就提高了
  void start(Runnable r);
  ```
- **什么是期望的行为一致的替换：** 在不了解派生类的情况下，仅通过接口或基类的方法，即可清楚的知道方法的行为，而不管哪种派生类的实现、都与接口或基类方法的期望行为一致。
  ```java
  // 这三个类期望执行一个线程， 而在调用start(Runnable r)的时候，这三个类的真实行为也应该是执行一个线程
  class A implements Runnable{}
  class B implements Runnable{}
  class C implements Runnable{}
  ```

## 4. 接口隔离原则：接口为上层业务拆分

**官方定义**

客户端不应该被迫依赖于它不使用的方法。该原则还有另外一个定义：一个类对另一个类的依赖应该建立在最小的接口上

**通俗解释**

要为各个类建立它们需要的专用接口，而不要试图去建立一个很庞大的接口供所有依赖它的类去调用。

```java
// 多接口 同一个实现类， 这样可以将专门的接口提供给特定业务层
public UserServiceImpl implements UserQueryService, UserModifyService {

}
```

##  5. 依赖倒置原则：面向抽象编程

**官方定义**

依赖倒置原则 (Dependence Inversion Principle，DIP)是指在设计代码架构时，高层模块不应该依赖于底层模块，二者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。

**通俗解释**

由于在软件设计中，细节具有多变性，而抽象层则相对稳定，因此以抽象为基础搭建起来的架构要比以细节为基础搭建起来的架构要稳定得多。
![在这里插入图片描述](/java/img/dp/01.png)

**PK：控制反转 依赖注入**

- 依赖倒置：是一种通用设计原则,主要用来指导框架层面的设计
- 控制反转：它是一种框架设计常用的模式,但不是具体方法
- 依赖注入：依赖注入是实现控制反转的手段,它是一种具体的编码技巧.


## 6. 迪米特法则：最少知识，强调多使用中间人

**官方定义**

迪米特法则又叫最少知识原则（LKP： Least Knowledge Principle），指的是一个类/模块对其他的类/模块有越少的了解越好。

**通俗解释**

不该有直接依赖关系的类之间，不要有依赖；有依赖关系的类之间，尽量只依赖必要的接口。

## 7. ? 组合、聚合原则：少继承，多注入

新对象中使用一些已有的对象，使之成为新对象的一部分。就是说要尽量使用合成和聚合，而不是通过继承关系到达复用的目的。

# 01. 创建型-单例模式: 唯一

## 1. 饿汉

## 2. 懒汉
```java
public class Singleton implements Serializable{

    private static volatile Singleton instance;

    private Singleton() { }

    public static Singleton getInstance() {
        if (null == instance) {
            synchronized (Singleton.class) {
                if (null == instance) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
    
    // 此方法可解决反序列化对单例的破坏，具体原因可看源码 ois.readObject();
    private Object readResolve() {
        return instance;
    }
    
    public static void main(String[] args) throws Exception{
        String pathname = "Singleton.obj";
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(pathname));
        oos.writeObject(Singleton.getInstance());
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(new File(pathname)));
        Singleton o = (Singleton) ois.readObject();
        System.out.println(o == Singleton.getInstance());
    }
}

```

## 3. 静态内部类

```java
public class Singleton {
    private Singleton() {
    	// 可避免反射对单例的破坏
        if (null != SingletonHandler.instance) {
        	throw new RuntimeException("单例类不允许被多次实例化");
        }
    }
    public static Singleton getInstance() {
        return SingletonHandler.instance;
    }
    private static class SingletonHandler {
        private static Singleton instance = new Singleton();
    }
}
```

## 4. 枚举单例

```java
public enum Singleton {

    INSTANCE;

    public static Singleton getInstance(){
        return Singleton.INSTANCE;
    }
	// 反射不能破坏枚举类型单例
    public static void main(String[] args) throws Exception {
        Class<Singleton> clz = Singleton.class;
        Constructor<Singleton> con = clz.getDeclaredConstructor(String.class, int.class);
        // 这一行会报错： “IllegalArgumentException: Cannot reflectively create enum objects”
        // 即 枚举方式可以避免反射对单例的破坏
        Singleton ni = con.newInstance("INSTANCE", 0);
        System.out.println(ni);
    }
    // 反序列化也不能破坏枚举类型单例
    // 在序列化的时候仅仅是将效类对豪的name 属性输出到了结果中，反序列化的时候，就会通过Enum的 valueof方法 来根据名字去查找对应枚举.
    public static void main(String[] args) throws Exception {
        String pathname = "Singleton.obj";
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(pathname));
        oos.writeObject(Singleton.getInstance());
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(new File(pathname)));
        System.out.println(ois.readObject() == Singleton.getInstance());// true
    }
}
```

# 02. 创建型-工厂方法模式: 复用

## 简单工厂模式：静态方法通过参数返回不同实例

简单工厂不是一种设计模式，反而比较像是一种编程习惯。简单工厂模式又叫做静态工厂方法模式,它是**通过使用静态方法接收不同的参数来返回不同的实例对象**.

**实现方式：** 定义一个工厂类，根据传入的参数不同返回不同的实例，被创建的实例具有共同的父类或接口。

**适用场景：**

1. 需要创建的对象较少。
2. 客户端不关心对象的创建过程。

**结构**

- 抽象产品：定义了产品的规范，描述了产品的主要特性和功能。
- 具体产品：实现或者继承抽象产品的子类

**优点**

1. 封装了创建对象的过程,可以通过参数直接获取对象.把对象的创建和业务逻辑分开,避免了可能会修改客户代码的问题.
2. 如果要实现新产品,直接修改工厂类,不需要再源代码中进行修改,降低了客户端修改代码的可能性,更加容易扩展.

**缺点**

1. 在增加新产品的时候还是要修改工厂类的代码,`违背了开闭原则`.


## 工厂方法模式：用工厂封装对象创建的过程

封装对象创建的过程，提升创建对象方法的可复用性。

**主要角色：**

- 抽象工厂：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法来创建产品。
- 具体工厂：主要是实现抽象工厂中的抽象方法，完成具体产品的创建。
- 抽象产品：定义了产品的规范，描述了产品的主要特性和功能。
- 具体产品：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应。

**UML图：**
![在这里插入图片描述](/java/img/dp/02.png)

# 03. 创建型-抽象工厂: 产品族

## 概述

抽象工厂模式(Abstract Factory Pattern)**原始定义**：提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。

比工厂方法模式抽象程度更高，工厂方法`(1：1)`模式每一个具体工厂只生产一种具体产品，抽象工厂`(1：n)`中一个具体工厂产生一组产品(`产品族`)，产品族中每一个产品都分属于某一产品`继承等级结构`。

![](/java/img/dp/factory03.jpg)

- **产品等级结构**: 即产品的`继承结构`。 如一个抽象类是电视机， 其子类有海尔电视机、海信电视机、TCL电视机， 则抽象电视机与具体品牌的电视机之间构成了一个产品等级结构， 抽象电视机是父类，而具体品牌的电视机是其子类。
- **产品族**: 产品族是指`由同一个工厂生产的，位于不同产品等级结构中的一组产品`。 如海尔电器工厂生产的海尔电视机、 海尔电冰箱， 海尔电视机位于电视机产品等级结构中， 海尔电冰箱位于电冰箱产品等级结构中。

> 抽象工厂模式为创建一组对象提供了解决方案。 与工厂方法模式相比， **抽象工厂模式中的具体工厂不只是创建一种产品,而是负责创建一个产品族**  
如上图中， 海尔工厂(即**海尔产品族**)包括(海尔电视、海尔冰箱、海尔空调)

抽象工厂模式的主要角色如下：

- **抽象工厂(Abstract Factory）**： 它声明了一种用于`创建一族产品`的方法,每一个方法对应一种产品.
- **具体工厂Concrete Factory）**： 主要是实现抽象工厂中的多个抽象方法，完成`具体产品的创建`.
- **抽象产品(Product）**： 定义了`产品规范`，描述了产品的主要特性和功能，抽象工厂模式有多个抽象产品。
- **具体产品(ConcreteProduct）**： 实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间是多对一的关系。

**优点**

1. 对于不同产品系列有比较多共性特征时，可以使用抽象工厂模式，有助于提升组件的复用性.
2. 当需要提升代码的扩展性并降低维护成本时，把对象的创建和使用过程分开，能有效地将代码统一到一个级别上
3. 解决跨平台带来的兼容性问题

**缺点**

1. 增加新的产品等级结构麻烦， 需要对原有结构进行较大的修改， 甚至需要修改抽象层代码， 这显然会带来较大不变， `违背了开闭原则`

> 在理解抽象工厂模式原理时， 一定要牢牢记住`如何找到某一个类产品的正确共性功能`这个重点。

## 实现

![](/java/img/dp/factory04.png)

```java
// 抽象工厂
public interface AppliancesFactory {
    AbstractTV createTV();
    AbstractFreezer createFreezer();
}
```
```java
// 具体工厂
public class HairFactory implements AppliancesFactory {
    @Override
    public AbstractTV createTV() {
        return new HairTV();
    }
    @Override
    public AbstractFreezer createFreezer() {
        return new HairFreezer();
    }
}
public class HisenseFactory implements AppliancesFactory {
    @Override
    public AbstractTV createTV() {
        return new HisenseTV();
    }
    @Override
    public AbstractFreezer createFreezer() {
        return new HisenseFreezer();
    }
}
```
```java
// 抽象产品
public interface AbstractFreezer {}
public interface AbstractTV {}
```
```java
// 具体产品
public class HairFreezer implements AbstractFreezer {}
public class HisenseFreezer implements AbstractFreezer {}
public class HairTV implements AbstractTV {}
public class HisenseTV implements AbstractTV {}
```
```java
// 客户端
@Getter
public class Client {

    private AbstractTV tv;
    private AbstractFreezer freezer;
    
    public Client(AppliancesFactory factory){
        //在客户端看来就是使用抽象工厂来生产家电
        this.tv = factory.createTV();
        this.freezer = factory.createFreezer();
    }
    
    public static void main(String[] args) {

        Client client = new Client(new HisenseFactory());
        AbstractTV tv = client.getTv();
        System.out.println(tv);

        AbstractFreezer freezer = client.getFreezer();
        System.out.println(freezer);
    }
}
```

# 04. 创建型-建造者模式: 复杂类

Builder Pattern也被称为**生成器模式**： 分离复杂对象的构建与表示， 使得同样的构建过程可以创建不同的表示。

- 为什么不用构造: 100个参数 每次可能只需要几个 总不能用构造器把不需要的90多个传空值吧
- 为什么不用set方法: 因为有时候 A参数的校验会用到B参数， 如果B参数后于A参数set， 那不就报错了，所以在最后 build()的时候校验就没这个问题了

**解决的问题**： 建造者模式可以将部件和其组装过程分开，一步一步创建一个复杂的对象。用户只需要指定复杂对象的类型就可以得到该对象，而无须知道其内部的具体构造细节。

## 原理

建造者模式包含以下4个角色 :

- **抽象建造者类（Builder）**：这个接口规定要实现复杂对象的哪些部分的创建，并不涉及具体的部件对象的创建。
- **具体建造者类（ConcreteBuilder）**：实现 Builder 接口，完成复杂产品的各个部件的具体创建方法。在构造过程完成后，提供一个方法,返回创建好的负责产品对象。
- **产品类（Product）**：要创建的复杂对象 (包含多个组成部件).
- **指挥者类（Director）**：调用具体建造者来创建复杂对象的各个部分，在指导者中不涉及具体产品的信息，只负责保证对象各部分完整创建或按某种顺序创建(客户端一般只需要与指挥者进行交互)。

![](/java/img/dp/builder01.jpg)

## 实现方式1

![](/java/img/dp/builder02.jpg)

**创建共享单车**

生产自行车是一个复杂的过程，它包含了车架，车座等组件的生产。而车架又有碳纤维，铝合金等材质的，车座有橡胶，真皮等材质。对于自行车的生产就可以使用建造者模式。

这里Bike是产品，包含车架，车座等组件；Builder是抽象建造者，MobikeBuilder和HelloBuilder是具体的建造者；Director是指挥者。类图如下：

### 具体产品

```java
@Getter
@Setter
public class Bike {
    //车架
    private String frame;
    //座椅
    private String seat;
}
```

### 构建者类

```java
public abstract class Builder {
    protected Bike mBike = new Bike();

    public abstract void buildFrame();
    public abstract void buildSeat();
    public abstract Bike createBike();
}

// 哈啰单车
public class HelloBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("碳纤维车架");
    }
    @Override
    public void buildSeat() {
        mBike.setSeat("橡胶车座");
    }
    @Override
    public Bike createBike() {
        return mBike;
    }
}
// 膜拜单车
public class MobikeBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("铝合金车架");
    }
    @Override
    public void buildSeat() {
        mBike.setSeat("真皮车座");
    }
    @Override
    public Bike createBike() {
        return mBike;
    }
}
```

### 指挥者类

```java
public class Director {

    private Builder mBuilder;

    public Director(Builder builder) {
        this.mBuilder = builder;
    }
    public Bike construct() {
        mBuilder.buildFrame();
        mBuilder.buildSeat();
        return mBuilder.createBike();
    }
}
```

### 客户端

```java
public class Client {
    public static void main(String[] args) {
        showBike(new HelloBuilder());
        showBike(new MobikeBuilder());
    }
    private static void showBike(Builder builder) {
        Director director = new Director(builder);
        Bike bike = director.construct();
        System.out.println(bike.getFrame());
        System.out.println(bike.getSeat());
    }
}
```

## 实现方式2

建造者模式除了上面的用途外，在开发中还有一个常用的使用方式，就是当一个类构造器需要传入很多参数时，如果创建这个类的实例，代码可读性会非常差，而且很容易引入错误，此时就可以利用建造者模式进行重构。

### 问题1: 构造方法创建复杂对象

构造方法如果参数过多,代码的**可读性和易用性都会变差**。 在使用构造函数时, **很容易搞错参数的顺序**, 传递进去错误的参数值, 导致很有隐蔽的BUG出现.

```java
public class RabbitMQClient1 {
    private String host = "127.0.0.1", exchange, queue;
    private int port = 5672, mode;
    // ...
    
    public RabbitMQClient1(String host, int port, int mode, String exchange, String queue, ...) {
        this.host = host;
        this.port = port;
        // this. ...

        if(mode == 1){ //工作队列模式不需要设计交换机,但是队列名称一定要有
            if(exchange != null)
                throw new RuntimeException("工作队列模式无需设计交换机");
            // ...
        }else if(mode == 2){ //路由模式必须设计交换机,但是不能设计队列
            if(exchange == null)
                throw new RuntimeException("路由模式下必须设置交换机");
            // ...
        }
        //其他验证方式,
    }

    // 测试
    public static void main(String[] args) {
        //每一种模式,都需要根据不同的情况进行实例化,构造方法会变得过于复杂.
        RabbitMQClient1 client1 = new RabbitMQClient1("192.168.52.123",5672,
                2,"sample-exchange",null,true,5000);
    }
}
```

### 问题2: set方法创建复杂对象

1. set方式设置对象属性时， 存在中间状态， 并且属性校验时有前后顺序约束， 逻辑校验的代码找不到合适的地方放置。
```java
Rectangle r = new Rectangle ();  //无效状态
r.setWidth(2);  //无效状态
r.setHeight(3);  //有效状态
```
2. set方法还破坏了“不可变对象”的密闭性： **对象创建好了， 就不能再修改内部的属性值**， 下面的client类就是典型的不可变对象， 创建好的连接对象不能再改动

```java
@Getter
@Setter
public class RabbitMQClient2 {
    private String host = "127.0.0.1", exchange, queue;
    private int port = 5672, mode, connectionTimeout = 1000;
    private boolean isDurable = true;

    //私有化构造方法
    private RabbitMQClient2() { }

    public void setExchange(String exchange) {
        if(mode == 1){ //工作队列模式不需要设计交换机,但是队列名称一定要有
            if(exchange != null)
                throw new RuntimeException("工作队列模式无需设计交换机");
            if(queue == null || queue.trim().equals(""))
                throw new RuntimeException("工作队列模式名称不能为空");
            if(isDurable == false)
                throw new RuntimeException("工作队列模式必须开启持久化");
        }else if(mode == 2){ //路由模式必须设计交换机,但是不能设计队列
            if(exchange == null)
                throw new RuntimeException("路由模式下必须设置交换机");
            if(queue != null)
                throw new RuntimeException("路由模式无须设计队列名称");
        }
        //其他验证方式,
        this.exchange = exchange;
    }

    public void setMode(int mode) {
        if(mode == 1){ //工作队列模式不需要设计交换机,但是队列名称一定要有
            if(exchange != null)
                throw new RuntimeException("工作队列模式无需设计交换机");
            if(queue == null || queue.trim().equals(""))
                throw new RuntimeException("工作队列模式名称不能为空");
            if(isDurable == false)
                throw new RuntimeException("工作队列模式必须开启持久化");
        }else if(mode == 2){ //路由模式必须设计交换机,但是不能设计队列
            if(exchange == null)
                throw new RuntimeException("路由模式下必须设置交换机");
            if(queue != null)
                throw new RuntimeException("路由模式无须设计队列名称");
        }
        this.mode = mode;
    }
    // 测试
    public static void main(String[] args) {
        RabbitMQClient2 client2 = new RabbitMQClient2();
        client2.setHost("192.168.52.123");
        client2.setQueue("queue");
        client2.setMode(1);
        client2.setDurable(true);
    }
}
```

### 建造者方式实现

使用建造者重写案例代码

```java
public class RabbitMQClient {
    // 私有构造方法
    // 步骤1: 目标类的构造方法需要传入Builder对象
    private RabbitMQClient(Builder builder) { }

    // 步骤3: Builder建造者对象提供内置的各种set方法,注意set方法返回的是builder对象本身
    @Setter
    @Accessors(chain = true)
    // 步骤2: Builder建造者类位于目标类内部,并且使用static修饰
    public static class Builder{
        //属性密闭性,保证对象不可变
        private String host = "127.0.0.1", exchange, queue;
        private int port = 5672, mode, connectionTimeout;
        private boolean isDurable = true;

        // 步骤4: Builder建造者类提供build()方法实现目标对象的创建
        public RabbitMQClient build(){
            //首先进行校验
            if(mode == 1){ //工作队列模式不需要设计交换机,但是队列名称一定要有
                if(exchange != null)
                    throw new RuntimeException("工作队列模式无需设计交换机");
                if(queue == null || queue.trim().equals(""))
                    throw new RuntimeException("工作队列模式名称不能为空");
                if(isDurable == false)
                    throw new RuntimeException("工作队列模式必须开启持久化");
            }else if(mode == 2){ //路由模式必须设计交换机,但是不能设计队列
                if(exchange == null)
                    throw new RuntimeException("路由模式下必须设置交换机");
                if(queue != null)
                    throw new RuntimeException("路由模式无须设计队列名称");
            }
            return new RabbitMQClient(this);
        }
    }
}
```

测试

```java
public class MainAPP {
    public static void main(String[] args) {
        //使用链式编程设置参数
        RabbitMQClient client = new RabbitMQClient.Builder()
            .setHost("192.168.52.123")
            .setMode(2)
            .setExchange("text-exchange")
            .setPort(5672)
            .setDurable(true)
            .build();
    }
}
```

## 总结

**1) 建造者模式与工厂模式区别** 

- 工厂模式是用来创建**不同但是相关类型的对象**（继承同一父类或者接口的一组子类）， 由给定的参数来决定创建哪种类型的对象。
- 建造者模式是用来创建**一种类型的复杂对象**， 通过设置不同的可选参数， “定制化”地创建不同的对象。

> 举例: 顾客走进一家餐馆点餐，我们利用工厂模式，根据用户不同的选择，来制作不同的食物，比
> 如披萨、汉堡、沙拉。对于披萨来说，用户又有各种配料可以定制，比如奶酪、西红柿、起
> 司，我们通过建造者模式根据用户选择的不同配料来制作披萨。



**2) 建造者模式的优缺点**

- 优点
  - **封装性很好**， 使用建造者模式可以有效的封装变化，在使用建造者模式的场景中，一般产品类和建造者类是比较稳定的，因此，将主要的业务逻辑封装在指挥者类中对整体而言可以取得比较好的稳定性。
  - **客户端不必知道产品内部组成的细节， 将产品本身与产品的创建过程解耦**， 使得相同的创建过程可以创建不同的产品对象。
  - **可以更加精细地控制产品的创建过程**， 将复杂产品的创建步骤分解在不同的方法中，使得创建过程更加清晰，也更方便使用程序来控制创建过程。
  - **很容易进行扩展**， 如果有新的需求，通过实现一个新的建造者类就可以完成，基本上不用修改之前已经测试通过的代码，因此也就不会对原有功能引入风险。符合开闭原则。
- 缺点
  - 所创建的产品一般具有较多的共同点，其组成部分相似，**如果产品之间的差异性很大，则不适合使用建造者模式**，因此其使用范围受到一定的限制。

  

**3) 应用场景**

- 建造者（Builder）模式创建的是复杂对象，其产品的各个部分经常面临着剧烈的变化，但将它们组合在一起的算法却相对稳定，所以它通常在以下场合使用。
  - 创建的对象较复杂，由多个部件构成，各部件面临着复杂的变化，但构件间的建造顺序是稳定的。
  - 创建复杂对象的算法独立于该对象的组成部分以及它们的装配方式，即产品的构建过程和最终的表示是独立的。


# 05. 创建型-原型模式: 克隆

定义: 原型模式(Prototype Design Pattern)用一个已经创建的实例作为原型，通过**复制该原型对象**来创建一个和原型对象相同的新对象。

>孙悟空的拔毛变小猴， 这种根据自己的形状复制出多个身外化身的技巧， 被称为原型模式。 **孙悟空就是原型对象**

![](/java/img/dp/builder03.jpg)

**主要解决的问题**

- 如果**创建对象的成本比较大**, 如对象中的数据是经过复杂计算才能得到, 或者从RPC接口， 或者数据库等较慢的IO中获取, 这种情况我们就可以使用原型模式, 从其他已有的对象中进行拷贝, 而不是每次都创建新对象, 进行一些耗时的操作.

## 原理

原型模式包含如下角色：

* 抽象原型类(Prototype)：它是声明克隆方法的接口,是所有具体原型类的公共父类,它可以是抽象类也可以是接口.
* 具体原型类(ConcretePrototype)：实现在抽象原型类中声明的克隆方法,在克隆方法中返回自己的一个克隆对象.
* 客户类(Client)：在客户类中,让一个原型对象克隆自身从而创建一个新的对象.由于客户类针对抽象原型类Prototype编程.因此用户可以根据需要选择具体原型类,系统具有较好的扩展性,增加或者替换具体原型类都比较方便.

![](/java/img/dp/builder04.jpg)

## 深克隆与浅克隆

### 浅克隆

引用类型不克隆，仍然指向原对象， Java中的Object类中提供了clone()就是浅克隆

```java
public class ConcretePrototype implements Cloneable {
    @Override
    protected ConcretePrototype clone() throws CloneNotSupportedException {
        return (ConcretePrototype)super.clone();
    }
}
```

### 深克隆

引用类型需要克隆，指向新克隆的对象。 如果想要进行深拷贝需要使用到**对象序列化流** （对象序列化之后， 再进行反序列化获取到的是不同对象）。 

```java
@Test
public void test() throws Exception {
    ConcretePrototype c1 = new ConcretePrototype();
    c1.setPerson(new Person("峰哥"));

    //创建对象序列化输出流
    ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("c.txt"));
    //将c1对象写到文件中
    oos.writeObject(c1);
    oos.close();

    //创建对象序列化输入流
    ObjectInputStream ois = new ObjectInputStream(new FileInputStream("c.txt"));
    //读取对象
    ConcretePrototype c2 = (ConcretePrototype) ois.readObject();
    Person p2 = c2.getPerson();
    p2.setName("凡哥");

    //判断p1与p2是否是同一个对象
    System.out.println("p1和p2是同一个对象?" + (p1 == p2));
}
```

> 注意：ConcretePrototype类和Person类**必须实现Serializable接口**，否则会抛NotSerializableException异常。

## 现成库

其实现在不推荐大家用Cloneable接口，实现比较麻烦，现在借助Apache Commons或者springframework可以直接实现：

- 浅克隆：`BeanUtils.cloneBean(Object obj);BeanUtils.copyProperties(S,T);`
- 深克隆：`SerializationUtils.clone(T object);` 

BeanUtils是利用反射原理获得所有类可见的属性和方法，然后复制到target类。
SerializationUtils.clone()就是使用我们的前面讲的序列化实现深克隆，当然你要把要克隆的类实现Serialization接口。

## 总结

**原型模式的优点**

1. 当创建新的对象实例较为复杂时,使用原型模式可以**简化对象的创建过程**, 通过复制一个已有实例可以提高新实例的创建效率.

   > 比如，在 AI 系统中，我们经常需要频繁使用大量不同分类的数据模型文件，在对这一类文件建立对象模型时，不仅会长时间占用 IO 读写资源，还会消耗大量 CPU 运算资源，如果频繁创建模型对象，就会很容易造成服务器 CPU 被打满而导致系统宕机。通过原型模式我们可以很容易地解决这个问题，当我们完成对象的第一次初始化后，新创建的对象便使用对象拷贝（在内存中进行二进制流的拷贝），虽然拷贝也会消耗一定资源，但是相比初始化的外部读写和运算来说，内存拷贝消耗会小很多，而且速度快很多

2. 原型模式提供了简化的创建结构,工厂方法模式常常需要有一个与产品类等级结构相同的工厂等级结构(具体工厂对应具体产品),而原型模式就不需要这样,原型模式的产品复制是通过封装在原型类中的克隆方法实现的,**无须专门的工厂类来创建产品**.

3. 可以使用深克隆的方式**保存对象状态**,使用原型模式将对象复制一份并将其状态保存起来,以便在需要的时候使用,比如恢复到某一历史状态,可以辅助实现撤销操作.

   > 在某些需要保存历史状态的场景中，比如，聊天消息、上线发布流程、需要撤销操作的程序等，原型模式能快速地复制现有对象的状态并留存副本，方便快速地回滚到上一次保存或最初的状态，避免因网络延迟、误操作等原因而造成数据的不可恢复。			

**原型模式缺点**

- 需要为每一个类配备一个克隆方法,而且该克隆方法位于一个类的内部,当对已有的类进行改造时需要修改源代码,违背了开闭原则.



**使用场景**

原型模式常见的使用场景有以下六种。

- 资源优化场景。也就是当进行对象初始化需要使用很多外部资源时，比如，IO 资源、数据文件、CPU、网络和内存等。

- 复杂的依赖场景。 比如，F 对象的创建依赖 A，A 又依赖 B，B 又依赖 C……于是创建过程是一连串对象的 get 和 set。

- 性能和安全要求的场景。 比如，同一个用户在一个会话周期里，可能会反复登录平台或使用某些受限的功能，每一次访问请求都会访问授权服务器进行授权，但如果每次都通过 new 产生一个对象会非常烦琐，这时则可以使用原型模式。

- 同一个对象可能被多个修改者使用的场景。 比如，一个商品对象需要提供给物流、会员、订单等多个服务访问，而且各个调用者可能都需要修改其值时，就可以考虑使用原型模式。

- 需要保存原始对象状态的场景。 比如，记录历史操作的场景中，就可以通过原型模式快速保存记录。

# 06. 结构型-代理模式: 中间商

## 定义 

在软件开发中,由于一些原因,客户端不想或不能直接访问一个对象,此时可以通过一个称为"代理"的**第三者来实现间接访问**.该方案对应的设计模式被称为代理模式.

代理模式(Proxy Design Pattern ) 原始定义是：让你能够提供对象的替代品或其占位符。代理控制着对于原对象的访问，并允许将请求提交给对象前后进行一些处理。

- 海外代购： 顾客 ----> 代购网站 ----> MetaQuest3

## 原理

* 抽象主题（Subject）类： 声明了真实主题和代理主题的共同接口,这样就可以保证任何使用真实主题的地方都可以使用代理主题,客户端一般针对抽象主题类进行编程。
* 代理（Proxy）类 ： 提供了与真实主题相同的接口，其内部含有对真实主题的引用(realSubject)，它可以在任何时候访问、控制或扩展真实主题的功能。
* 真实主题（Real Subject）类： 实现了抽象主题中的具体业务，是代理对象所代表的真实对象，是最终要引用的对象。

![](/java/img/dp/proxy01.jpg)

## 静态代理

**代理对象和目标对象实现一样的接口。**

- 优点：可以在不修改目标对象的前提下扩展目标对象的功能。
- 缺点：
  1. 冗余。由于代理对象要实现与目标对象一致的接口，会产生过多的代理类。
  2. 不易维护。一旦接口增加方法，目标对象与代理对象都要进行修改。

```java
//接口类： IUserDao
public interface IUserDao {
    void save();
}

//目标对象：UserDaoImpl
public class UserDaoImpl implements IUserDao {
    @Override
    public void save() {
        System.out.println("保存数据");
    }
}

//静态代理对象：UserDaoProxy 需要实现IUserDao接口
public class UserDaoProxy implements IUserDao {
    private IUserDao target;
    public UserDaoProxy(IUserDao target) {
        this.target = target;
    }
    @Override
    public void save() {
        System.out.println("开启事务"); //扩展额外功能
        target.save();
        System.out.println("提交事务");
    }
}

//测试类
public class TestProxy {
    @Test
    public void testStaticProxy(){
        //目标对象
        UserDaoImpl userDao = new UserDaoImpl();
        //代理对象
        UserDaoProxy proxy = new UserDaoProxy(userDao);
        proxy.save();
    }
}
```

## JDK动态代理

动态代理利用了JDK API,动态地在内存中构建代理对象,从而实现对目标对象的代理功能.动态代理又被称为JDK代理或接口代理.

静态代理与动态代理的区别:

1. 静态代理在**编译时就已经实现了**,编译完成后代理类是一个实际的class文件
2. 动态代理是在**运行时动态生成的**,即编译完成后没有实际的class文件,而是在运行时动态生成类字节码,并加载到JVM中.

```java
package dp.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * 代理工厂-动态生成代理对象
 * @author spikeCong
 * @date 2022/9/22
 **/
public class ProxyFactory implements InvocationHandler {

    //为目标对象生成代理对象
    public static synchronized Object getProxyInstance(Object target){
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(), //目标类使用的类加载器
                target.getClass().getInterfaces(), //目标对象实现的接口类型
                new ProxyFactory(target)
        );
    }

    private Object target; //维护一个目标对象

    public ProxyFactory(Object target) {
        this.target = target;
    }

    /**
     * invoke方法参数说明
     * @param proxy 代理对象
     * @param method 对应于在代理对象上调用的接口方法Method实例
     * @param args 代理对象调用接口方法时传递的实际参数
     * @return: java.lang.Object 返回目标对象方法的返回值,没有返回值就返回null
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("开启事务");
        try {
            //执行目标对象方法
            return method.invoke(target, args);
        } finally {
            System.out.println("提交事务");
        }
    }

    //测试
    public static void main(String[] args) {
        IUserDao target = new UserDaoImpl();
        System.out.println(target.getClass());//目标对象信息

        IUserDao proxy = (IUserDao) ProxyFactory.getProxyInstance(target);
        System.out.println(proxy.getClass()); //输出代理对象信息
        proxy.save(); //执行代理方法
    }
}
```

## cglib动态代理(三方库)

cglib (Code Generation Library ) 是一个第三方代码生成类库，运行时在内存中动态生成一个子类对象从而实现对目标对象功能的扩展。cglib 为没有实现接口的类提供代理，为JDK的动态代理提供了很好的补充。

![](/java/img/dp/proxy02.jpg)

- 最底层是字节码
- ASM是操作字节码的工具
- cglib基于ASM字节码工具操作字节码（即动态生成代理，对方法进行增强）
- SpringAOP基于cglib进行封装，实现cglib方式的动态代理

**代码**

```xml
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.3.0</version>
</dependency>
```

```java

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;
import java.lang.reflect.Method;

public class CglibProxy implements MethodInterceptor {
    public static Object getProxy(Object target) {
        //增强器类,用来创建动态代理类
        Enhancer en = new Enhancer();
        //设置代理类的父类字节码对象
        en.setSuperclass(target.getClass());
        //设置回调: 对于代理类上所有的方法的调用,都会调用CallBack,而Callback则需要实现intercept()方法进行拦截
        en.setCallback(new CglibProxy());
        //创建动态代理对象并返回
        return en.create();
    }
    /**
     * implements callback
     * @param o         proxy object
     * @param method
     * @param args
     * @param methodProxy proxy object method entity
     * @return
     * @throws Throwable
     */
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        System.out.println("proxy start");
        try {
            return methodProxy.invokeSuper(o, args);
        } finally {
            System.out.println("proxy end");
        }
    }
}

class UserService {
    public String getUserName() {
        return "julia";
    }

    public static void main(String[] args) {
        //目标对象
        UserService userService = new UserService();
        //代理对象
        UserService proxy = (UserService) CglibProxy.getProxy(userService);
        String userName = proxy.getUserName();
        System.out.println("用户信息: " + userName);
    }
}
```

## 三种对比

* jdk代理和CGLIB代理

  使用CGLib实现动态代理，CGLib底层采用ASM字节码生成框架，使用字节码技术生成代理类，在JDK1.6之前比使用Java反射效率要高。唯一需要注意的是，CGLib不能对声明为final的类或者方法进行代理，因为CGLib原理是动态生成被代理类的子类。

  在JDK1.6、JDK1.7、JDK1.8逐步对JDK动态代理优化之后，在调用次数较少的情况下，JDK代理效率高于CGLib代理效率，只有当进行大量调用的时候，JDK1.6和JDK1.7比CGLib代理效率低一点，但是到JDK1.8的时候，JDK代理效率高于CGLib代理。所以如果有接口使用JDK动态代理，**如果没有接口使用CGLIB代理**。

* 动态代理和静态代理: 接口增加方法 动态代理类可以做到不修改

  动态代理与静态代理相比较，最大的好处是接口中声明的所有方法都被转移到调用处理器一个集中的方法中处理（InvocationHandler.invoke）。这样，在接口方法数量比较多的时候，我们可以进行灵活处理，而不需要像静态代理那样每一个方法进行中转。

  如果接口增加一个方法，静态代理模式除了所有实现类需要实现这个方法外，所有代理类也需要实现此方法。增加了代码维护的复杂度。而动态代理不会出现该问题

## 优缺点

优点

- 代理模式在客户端与目标对象之间起到一个**中介**作用和**保护目标对象**的作用；
- 代理对象可以**扩展**目标对象的功能；
- 代理模式能将客户端与目标对象分离，在一定程度上**降低耦合度**；

缺点

* 增加了系统的复杂度；

## 使用场景 

* 功能增强

  当需要对一个对象的访问提供一些额外操作时,可以使用代理模式

* 远程（Remote）代理

  实际上，RPC 框架也可以看作一种代理模式，GoF 的《设计模式》一书中把它称作远程代理。通过远程代理，将网络通信、数据编解码等细节隐藏起来。客户端在使用 RPC 服务的时候，就像使用本地函数一样，无需了解跟服务器交互的细节。除此之外，RPC 服务的开发者也只需要开发业务逻辑，就像开发本地使用的函数一样，不需要关注跟客户端的交互细节。

* 防火墙（Firewall）代理

  当你将浏览器配置成使用代理功能时，防火墙就将你的浏览器的请求转给互联网；当互联网返回响应时，代理服务器再把它转给你的浏览器。

* 保护（Protect or Access）代理

  控制对一个对象的访问，如果需要，可以给不同的用户提供不同级别的使用权限。

content


# 07. 结构型-桥接模式

## 定义

桥接模式原理的核心是, 首先要识别出一个类所具有的的两个独立变化维度, 将它们设计为两个独立的继承等级结构, 为两个维度都提供抽象层, 并建立抽象耦合. 总结一句话就是: 抽象角色引用实现角色

> 比如我们拿毛笔举例, 尺寸和颜色是毛笔的两个维度
> - 尺寸是其固有的维度,所以抽象出一个毛笔类,而将各种尺寸的毛笔作为其子类,也就是下图的右侧抽象部分内容.
> - 颜色是毛笔的另一个维度, 它与毛笔之间存在一种设置的关系,因此可以提供一个抽象的颜色接口,将具体颜色作为该接口的子类.

![](/java/img/dp/bridge02.jpg)


# 08. 结构型-装饰器模式: 扩展

## 定义

装饰模式(decorator pattern) 的原始定义是, **动态的给一个对象添加一些额外的职责**. 就扩展功能而言,装饰器模式提供了一种比使用子类更加灵活的替代方案.

在软件设计中,装饰器模式是一种用于替代继承的技术,它通过一种无须定义子类的方式给对象动态的增加职责,使用对象之间的**关联关系取代类之间的继承关系**.

## 原理

![](/java/img/dp/decorator01.jpg)

- **抽象构件（Component）**： 它是**具体构件和抽象装饰类的共同父类**,声明了在具体构件中实现的业务方法.它引进了可以使客户端以一致的方式处理未被装饰的对象以及装饰之后的对象,实现客户端的透明操作
- **具体构件（Concrete Component）**： **被装饰者**， 它是抽象构件类的子类,用于**定义具体的构建对象**,实现了在抽象构建中声明的方法,装饰类可以给它增加额外的职责(方法).
- **抽象装饰（Decorator）**： 它也是抽象构件类的子类,用于**给具体构件增加职责**,但是具体职责在其子类中实现.它维护了一个指向抽象构件对象的引用,通过该引用可以调用装饰之前构件对象的方法,并通过其子类扩展该方法,以达到装饰的目的.
- **具体装饰（ConcreteDecorator）**： 它是抽象装饰类的子类,负责**向构件添加新的职责**.每一个具体装饰类都定义了一些新的行为,它可以调用在抽象装饰类中定义的方法,并可以增加新的方法用于扩充对象的行为.

## 代码

```java
/**
 * 抽象构件类
 **/
public abstract class Component {
    public abstract void operation();
}
/**
 * 具体构件类
 **/
public class ConcreteComponent extends Component {
    @Override
    public void operation() {
        //基础功能实现(复杂功能通过装饰类进行扩展)
    }
}
/**
 * 抽象装饰类-装饰者模式的核心
 **/
public class Decorator extends Component {
    //维持一个对抽象构件对象的引用
    private Component component;
    //注入一个抽象构件类型的对象
    public Decorator(Component component) {
        this.component = component;
    }
    @Override
    public void operation() {
        //调用原有业务方法(这里并没有真正实施装饰,而是提供了一个统一的接口,将装饰过程交给子类完成)
        component.operation();
    }
}
/**
 * 具体装饰类
 **/
public class ConcreteDecorator extends Decorator {
    public ConcreteDecorator(Component component) {
        super(component);
    }
    @Override
    public void operation() {
        super.operation(); // 原有业务方法
        addedBehavior(); // 新增业务方法
    }
    //新增业务方法
    public void addedBehavior(){
        //......
    }
}
```

## 应用示例-文件读写

此例中 EncryptionDataDecorator 中扩展了读写解密功能

![](/java/img/dp/decorator02.jpg)

## 优缺点

优点

1. 对于扩展一个对象的功能,装饰模式比继承更加灵活,**不会导致类的个数急剧增加**
2. 可以通过一种**动态的方式来扩展**一个对象的功能,通过配置文件可以在运行时选择不同的具体装饰类,从而实现不同的行为.
3. 可以对一个对象进行**多次装饰**,通过使用不同的具体装饰类以及这些装饰类的排列组合可以创造出很多不同行为的组合,得到更加强大的对象.
4. 具体构建类与具体装饰类可以**独立变化**,用户可以根据需要增加新的具体构建类和具体装饰类,原有类库代码无序改变,符合开闭原则.

缺点

1. 在使用装饰模式进行系统设计时将**产生很多小对象**,这些对象的区别在于它们之间相互连接的方式有所不同,而不是它们的类或者属性值不同,大量的小对象的产生势必会占用更多的系统资源,在一定程度上影响程序的性能.
2. 装饰器模式提供了一种比继承更加灵活、机动的解决方案,但同时也意味着**比继承更加易于出错**,排错也更加困难,对于多次装饰的对象,在调试寻找错误时可能需要逐级排查,较为烦琐

## 适用场景

1. 快速动态扩展和撤销一个类的功能场景。 比如，有的场景下对 API 接口的安全性要求较高，那么就可以使用装饰模式对传输的字符串数据进行压缩或加密。如果安全性要求不高，则可以不使用。

2. 不支持继承扩展类的场景。 比如，使用 final 关键字的类，或者系统中存在大量通过继承产生的子类。

# 09. 结构型-适配器模式: 兼容

## 定义

适配器模式(adapter pattern )的原始定义是：将类的接口转换为客户期望的另一个接口，适配器可以**让不兼容的两个类一起协同工作**。

适配器模式是用来做适配，它将不兼容的接口转换为可兼容的接口，让原本由于接口不兼容而不能一起工作的类可以一起工作。适配器模式有两种实现方式：

- **类适配器**: 使用**继承**关系来实现
- **对象适配器**: 使用**组合**关系来实现

## 原理

![](/java/img/dp/adapter01.jpg)
![](/java/img/dp/adapter02.jpg)

* **目标（Target）接口**：当前系统业务所期待的接口，它可以是抽象类或接口。
* **适配者（Adaptee）类**：适配者即被适配的角色,它是被访问和适配的现存组件库中的组件接口。
* **适配器（Adapter）类**：它是一个转换器，通过继承或引用适配者的对象，把适配者接口转换成目标接口，让客户按目标接口的格式访问适配者。

## 代码-类适配器: 继承

假设现有一台电脑目前只能读取SD卡的信息，这时我们想要使用电脑读取TF卡的内容, 就需要将TF卡加上卡套，转换成SD卡!

创建一个读卡器，将TF卡中的内容读取出来。

![](/java/img/dp/adapter03.jpg)

```java
/**
 * SD卡接口
 **/
public interface SDCard {
    String readSD();
    void writeSD(String msg);
}
/**
 * SD卡实现类
 **/
public class SDCardImpl implements SDCard {
    @Override
    public String readSD() {
        return "sd card reading data";
    }
    @Override
    public void writeSD(String msg) {
        System.out.println("sd card write data : " + msg);
    }
}
/**
 * TF卡接口
 **/
public interface TFCard {
    String readTF();
    void writeTF(String msg);
}
/**
 * TF卡实现类
 **/
public class TFCardImpl implements TFCard {
    @Override
    public String readTF() {
        return "tf card reading data";
    }
    @Override
    public void writeTF(String msg) {
        System.out.println("tf card write data : " + msg);
    }
}
/**
 * 定义适配器类(SD兼容TF)
 **/
public class SDAdapterTF extends TFCardImpl implements SDCard {
    @Override
    public String readSD() {
        System.out.println("adapter read tf card ");
        return readTF();
    }
    @Override
    public void writeSD(String msg) {
        System.out.println("adapter write tf card");
        writeTF(msg);
    }
}

public class Client {
    public static void main(String[] args) {
        Computer computer = new Computer();
        SDCard sdCard = new SDCardImpl();
        System.out.println(computer.read(sdCard));

        System.out.println("========================");
        SDAdapterTF adapterTF = new SDAdapterTF();
        System.out.println(computer.read(adapterTF));
    }
}
```


## 代码-对象适配器: 组合

实现方式：对象适配器模式可釆用将现有组件库中已经实现的组件引入适配器类中，该类同时实现当前系统的业务接口。

![](/java/img/dp/adapter04.jpg)

```java
public class SDAdapterTF implements SDCard{
    private TFCard tfCard;
    public SDAdapterTF(TFCard tfCard) {
        this.tfCard = tfCard;
    }
    @Override
    public String readSD() {
        System.out.println("adapter read tf card ");
        return tfCard.readTF();
    }
    @Override
    public void writeSD(String msg) {
        System.out.println("adapter write tf card");
        tfCard.writeTF(msg);
    }
}


public class Client {
    public static void main(String[] args) {
        Computer computer = new Computer();
        SDCard sdCard = new SDCardImpl();
        System.out.println(computer.read(sdCard));

        System.out.println("========================");
        TFCard tfCard = new TFCardImpl();
        SDAdapterTF adapterTF = new SDAdapterTF(tfCard);
        System.out.println(computer.read(adapterTF));
    }
}
```

## 优缺点

优点

1. 将目标类和适配者类**解耦**,通过引入一个适配器类来重用现有的适配者类,无序修改原有结构
2. 增加了类的**透明性和复用性**,将具体业务实现过程封装在适配者类中,对于客户端类而言是透明的,而且提高了适配者的复用性,同一个适配者类可以在多个不同的系统中复用.
3. **灵活性和扩展性**都非常好,通过使用配置文件可以很方便的更换适配器,也可以在不修改原有代码的基础上增加新的适配器类,符合开闭原则.

缺点

- 类适配器的缺点
  1. 对于Java等不支持多重继承的语言,一次最多**只能适配一个**适配者类,不能同时适配多个适配者
  2. 适配者类不能为最终类
- 对象适配器的缺点
  1. 与类适配器模式相比较,在该模式下要在适配器中置换适配者类的某些方法比较**麻烦**.


## 适用场景

- 统一多个类的接口设计时
  - 某个功能的实现依赖多个外部系统（或者说类）。通过适配器模式，将它们的接口适配为统一的接口定义
- 需要依赖外部系统时
  - 当我们把项目中依赖的一个外部系统替换为另一个外部系统的时候，利用适配器模式，可以减少对代码的改动
- 原有接口无法修改时或者原有接口功能太老旧但又需要兼容；
  - JDK1.0 Enumeration 到 Iterator 的替换,适用适配器模式保留 Enumeration 类，并将其实现替换为直接调用 Itertor.
- 适配不同数据格式时；
  - Slf4j 日志框架,定义打印日志的统一接口,提供针对不同日志框架的适配器

# 10. 结构型-外观模式: 统一

## 定义

外观模式( Facade Pattern)，也叫门面模式, 原始定义： 为子系统中的一组接口**提供统一的接口**。它定义了一个更高级别的接口，使子系统更易于使用。

外观模式，是一种通过为多个复杂的子系统提供一个一致的接口，而使这些子系统更加容易被访问的模式。该模式对外有一个统一接口，外部应用程序不用关心内部子系统的具体的细节，这样会大大降低应用程序的复杂度，提高了程序的可维护性。

门面模式有点类似之前讲到的迪米特法则（最少知识原则）和接口隔离原则：两个有交互的系统，**只暴露有限的必要的接口**

![](/java/img/dp/facade01.jpg)

门面类充当了系统中的**服务员**,它为多个业务类的调用提供了一个统一的入口,简化了类与类之间的交互,如果没有门面类,每个客户类需要和多个子系统之间进行复杂的交互,系统的耦合度将会很大.

## 原理

![](/java/img/dp/facade02.jpg)

* 外观（Facade）角色： 为多个子系统对外提供一个共同的接口。
    - 外观角色中可以知道多个相关的子系统中的功能和责任.在正常情况下,它将所有从客户端发来的请求委派到相应的子系统,传递给相应的子系统对象处理
* 子系统（Sub System）角色： 实现系统的部分功能，客户可以通过外观角色访问它。
    - 每一个子系统可以是一个类也可以是多个类的集合.每一个子系统都可以被客户端直接调用,或者被外观角色调用.子系统并不	知道外观的存在,对于子系统而言,外观角色仅仅是另一个客户端而已.

```java
public class SubSystemA {
    public void methodA(){
        //业务代码
    }
}
public class SubSystemB {
    public void methodB(){
        //业务代码
    }
}
public class SubSystemC {
    public void methodC(){
        //业务代码
    }
}

public class Facade {
    private SubSystemA obj1 = new SubSystemA();
    private SubSystemB obj2 = new SubSystemB();
    private SubSystemC obj3 = new SubSystemC();

    public void method(){
        obj1.methodA();
        obj2.methodB();
        obj3.methodC();
    }
}

public class Client {
    public static void main(String[] args) {
        Facade facade = new Facade();
        facade.method();
    }
}
```

## 代码-智能家电控制

通过智能音箱来控制室内的 灯、电视、空调.本来每个设备都需要进行独立的开关操作,现在通过智能音箱完成对这几个设备的统一控制. 

![](/java/img/dp/facade03.jpg)

```java
public class Light {
    public void on(){
        System.out.println("打开灯......");
    }
    public void off(){
        System.out.println("关闭灯......");
    }
}
public class TV {
    public void on(){
        System.out.println("打开电视......");
    }
    public void off(){
        System.out.println("关闭电视......");
    }
}
public class AirCondition {
    public void on(){
        System.out.println("打开空调......");
    }
    public void off(){
        System.out.println("关闭空调......");
    }
}

public class SmartAppliancesFacade {
    private Light light;
    private TV tv;
    private AirCondition airCondition;
    public SmartAppliancesFacade() {
        this.light =new Light();
        this.tv = new TV();
        this.airCondition = new AirCondition();
    }
    public void say(String message){
        if(message.contains("打开")){
            on();
        }else if(message.contains("关闭")){
            off();
        }else{
            System.out.println("对不起没有听清楚您说什么! 请重新再说一遍");
    }
    //起床后 语音开启 电灯 电视 空调
    private void on() {
        System.out.println("起床了!");
        light.on();
        tv.on();
        airCondition.on();
    }
    //睡觉前 语音关闭 电灯 电视 空调
    private void off() {
        System.out.println("睡觉了!");
        light.off();
        tv.off();
        airCondition.off();
    }
}

public class Client {
    public static void main(String[] args) {
        //创建外观对象
        SmartAppliancesFacade facade = new SmartAppliancesFacade();

        facade.say("打开家电");
        facade.say("关闭家电");
    }
}
```

## 优缺点

优点:

1. 它对客户端**屏蔽了子系统组件**,减少了客户端所需要处理的对象数目,并使子系统使用起来更加的容易.通过引入外观模式,客户端代码将变得很简单,与之关联的对象也很少.
2. 它实现了子系统与客户端之间的**松耦合**关系,这使得子系统的变化不会影响到调用它的客户端,只需要调整外观类即可
3. **子系统间相互独立**, 一个子系统的修改对其他子系统没有任何影响,而子系统内部变化也不会影响到外观对象. 

缺点

1. 不能很好的控制客户端直接使用子系统类,如果客户端访问子系统类做太多的限制则**减少了可变性和灵活性**.
2. 如果设计不当,增加新的子系统可能需要修改外观类的源代码,**违背了开闭原则**.

## 适用场景

- 简化复杂系统。 比如，当我们开发了一整套的电商系统后（包括订单、商品、支付、会员等系统），我们不能让用户依次使用这些系统后才能完成商品的购买，而是需要一个门户网站或手机 App 这样简化过的门面系统来提供在线的购物功能。
- 减少客户端处理的系统数量。 比如，在 Web 应用中，系统与系统之间的调用可能需要处理 Database 数据库、Model 业务对象等，其中使用 Database 对象就需要处理打开数据库、关闭连接等操作，然后转换为 Model 业务对象，实在是太麻烦了。如果能够创建一个数据库使用的门面（其实就是常说的 DAO 层），那么实现以上过程将变得容易很多。
- 让一个系统（或对象）为多个系统（或对象）工作。 比如，线程池 ThreadPool 就是一个门面模式，它为系统提供了统一的线程对象的创建、销毁、使用等。
- 联合更多的系统来扩展原有系统。 当我们的电商系统中需要一些新功能时，比如，人脸识别，我们可以不需要自行研发，而是购买别家公司的系统来提供服务，这时通过门面系统就能方便快速地进行扩展。
- 作为一个简洁的中间层。 门面模式还可以用来隐藏或者封装系统中的分层结构，同时作为一个简化的中间层来使用。比如，在秒杀、库存、钱包等场景中，我们需要共享有状态的数据时（如商品库存、账户里的钱），在不改变原有系统的前提下，通过一个中间的共享层（如将秒杀活动的商品库存总数统一放在 Redis 里），就能统一进行各种服务（如，秒杀详情页、商品详情页、购物车等）的调用。

# 11. 结构型-组合模式: 树

我们很容易将“组合模式”和“组合关系”搞混。组合模式最初只是用于解决树形结构的场景，更多的是处理对象组织结构之间的问题。而组合关系则是通过将不同对象封装起来完成一个统一功能.

## 定义

组合模式(Composite Pattern) 的定义是：**将对象组合成树形结构**以表示整个部分的层次结构.组合模式可以让用户统一对待单个对象和对象的组合.

> 比如: windows操作系统中的目录结构,其实就是树形目录结构,通过tree命令实现树形结构展示. 

```bash
 w108  ~/我的书籍  tree
.
├── 代码重构
│   ├── 重构.pdf
│   └── 代码整洁之道.pdf
├── 设计模式
│   ├── 大话设计模式.pdf
│   └── 图解设计模式.pdf
└── 红楼梦.pdf
```

在上图中包含了文件夹和文件两类不同元素,其中在文件夹中可以包含文件,还可以继续包含子文件夹.子文件夹中可以放入文件,也可以放入子文件夹. 文件夹形成了一种容器结构(树形结构),递归结构.

![](/java/img/dp/composite02.jpg)

接着我们再来思考虽然文件夹和文件是不同类型的对象,但是他们有一个共性,就是 **都可以被放入文件夹中**. 其实文件和文件夹可以被当做是同一种对象看待.

**组合模式其实就是将一组对象(文件夹和文件)组织成树形结构**,以表示一种'部分-整体' 的层次结构,(目录与子目录的嵌套结构). 组合模式让客户端可以统一单个对象(文件)和组合对象(文件夹)的处理逻辑(递归遍历).

组合模式更像是一种**数据结构和算法**的抽象,其中数据可以表示成树这种数据结构,业务需求可以通过在树上的递归遍历算法来实现. 

## 原理

![](/java/img/dp/composite03.jpg)

* **抽象根节点（Component）**：**定义系统各层次对象的共有方法和属性**，可以预先定义一些默认行为和属性。
    - 在该角色中可以包含所有子类共有行为的声明和实现.在抽象根节点中定义了访问及管理它的子构件的方法,如增加子节点、删除子节点、获取子节点等.
* **树枝节点（Composite）**：定义树枝节点的行为，存储子节点，组合树枝节点和叶子节点形成一个树形结构。
    - 树枝节点可以包含树枝节点,也可以包含叶子节点,它其中有一个集合可以用于存储子节点,实现了在抽象根节点中定义的行为.包括那些访问及管理子构件的方法,在其业务方法中可以递归调用其子节点的业务方法.
* **叶子节点（Leaf）**：叶子节点对象，其下再无分支，是系统层次遍历的最小单位。
    - 在组合结构中叶子节点没有子节点,它实现了在抽象根节点中定义的行为.

## 代码实现

组合模式的关键在于定义一个抽象根节点类,它既可以代表叶子,又可以代表树枝节点,客户端就是针对该抽象类进行编程,不需要知道它到底表示的是叶子还是容器,可以对其进行统一处理.

树枝节点对象和抽象根节点类之间建立了一个聚合关联关系,在树枝节点对象中既可以包含叶子节点,还可以继续包含树枝节点,以此实现递归组合,形成一个树形结构.

```java
/**
 * 抽象根节点: 对于客户端而言将针对抽象编程,无需关心其具体子类是容器构件还是叶子构件.
 **/
public abstract class Component {
    public abstract void add(Component c); //增加成员
    public abstract void remove(Component c); //删除成员
    public abstract Component getChild(int i); //获取成员
    public abstract void operation(); //业务方法
}
/**
 * 叶子节点: 叶子节点中不能包含子节点
 **/
public class Leaf extends Component {
    @Override
    public void add(Component c) {
    }
    @Override
    public void remove(Component c) {
    }
    @Override
    public Component getChild(int i) {
        return new Leaf();
    }
    @Override
    public void operation() {
    }
}
/**
 * 树枝节点: 容器对象,可以包含子节点
 **/
public class Composite extends Component {
    private ArrayList<Component> list = new ArrayList<>();
    @Override
    public void add(Component c) {
        list.add(c);
    }
    @Override
    public void remove(Component c) {
        list.remove(c);
    }
    @Override
    public Component getChild(int i) {
        return (Component) list.get(i);
    }
    @Override
    public void operation() {
        //在树枝节点中的业务方法,将递归调用其他节点中的operation() 方法
        for (Component component : list) {
            component.operation();
        }
    }
}
```

## 应用实例

下面我们通过一段程序来演示一下组合模式的使用. 程序的功能是列出某一目录下所有的文件和文件夹.类图如下: 

![](/java/img/dp/composite04.jpg)

我们按照下图的表示,进行文件和文件夹的构建.

```bash
root
├── bin
│   ├── vi
│   └── test
├── tmp
└── usr
    └── mysql
        ├── my.conf
        └── test.db
```

```java
/**
 * Entry抽象类,表示目录条目(文件+文件夹)的抽象类, 用来定义File类和Directory类的共性内容
 **/
public abstract class Entry {
    public abstract String getName(); //获取文件名
    public abstract int getSize(); //获取文件大小
    //添加文件夹或文件
    public abstract Entry add(Entry entry);
    //显示指定目录下的所有信息
    public abstract void printList(String prefix);
    @Override
    public String toString() {
        return getName() + "(" +getSize() + ")";
    }
}
/**
 * File类 叶子节点,表示文件
 **/
public class File extends Entry {
    @Getter private String name; //文件名
    @Getter private int size; //文件大小
    public File(String name, int size) {
        this.name = name;
        this.size = size;
    }
    @Override
    public Entry add(Entry entry) {
        return null;
    }
    @Override
    public void printList(String prefix) {
        System.out.println(prefix + "/" + this);
    }
}
/**
 * Directory 树枝节点,表示文件夹
 **/
public class Directory extends Entry{
    @Getter private String name;
    //文件夹与文件的集合
    private ArrayList<Entry> directory = new ArrayList();
    public Directory(String name) {
        this.name = name;
    }
    /**
     * 获取文件大小
     *      1.如果entry对象是File类型,则调用getSize方法获取文件大小
     *      2.如果entry对象是Directory类型,会继续调用子文件夹的getSize方法,形成递归调用.
     */
    @Override
    public int getSize() {
        int size = 0;
        //遍历或者去文件大小
        for (Entry entry : directory) {
            size += entry.getSize();
        }
        return size;
    }
    @Override
    public Entry add(Entry entry) {
        directory.add(entry);
        return this;
    }
    //显示目录
    @Override
    public void printList(String prefix) {
        System.out.println("/" + this);
        for (Entry entry : directory) {
            entry.printList("/" + name);
        }
    }
}
// 测试
public class Client {
    public static void main(String[] args) {
        Directory rootDir = new Directory("root")
                .add(new Directory("bin")
                        .add(new File("vi",10000))
                        .add(new File("test",20000)))
                .add(new Directory("tmp"))
                .add(new Directory("usr")
                        .add(new Directory("mysql")
                                .add(new File("my.cnf",30))
                                .add(new File("test.db",25000))));

        rootDir.printList("");
    }
}
```

## 分类

* 透明组合模式

    透明组合模式中，抽象根节点角色中声明了所有用于管理成员对象的方法，比如在示例中 `Component` 声明了 `add`、`remove` 、`getChild` 方法，这样做的好处是确保**所有的构件类都有相同的接口**。透明组合模式也是组合模式的标准形式。

    透明组合模式的缺点是**不够安全**，因为叶子对象和容器对象在本质上是有区别的，叶子对象不可能有下一个层次的对象，即不可能包含成员对象，因此为其提供 add()、remove() 等方法是没有意义的，这在编译阶段不会出错，但在运行阶段如果调用这些方法可能会出错（如果没有提供相应的错误处理代码）

    ![](/java/img/dp/composite05.jpg)

* 在安全组合模式中，

    在抽象构件角色中没有声明任何用于管理成员对象的方法，而是在树枝节点类中声明并实现这些方法。安全组合模式的缺点是不够透明，因为叶子构件和容器构件具有不同的方法，且容器构件中那些用于管理成员对象的方法没有在抽象构件类中定义，因此客户端不能完全针对抽象编程，必须有区别地对待叶子构件和容器构件。
    
    ![](/java/img/dp/composite06.jpg)

## 优缺点

优点

* 组合模式可以**清楚地定义分层次的复杂对象**，表示对象的全部或部分层次，它让客户端忽略了层次的差异，方便对整个层次结构进行控制。
* 客户端可以**一致地使用一个组合结构或其中单个对象**，不必关心处理的是单个对象还是整个组合结构，简化了客户端代码。
* 在组合模式中**增加**新的树枝节点和叶子**节点**都很**方便**，无须对现有类库进行任何修改，符合“开闭原则”。
* 组合模式为树形结构的面向对象实现**提供了一种灵活的解决方案**，通过叶子节点和树枝节点的递归组合，可以形成复杂的树形结构，但对树形结构的控制却非常简单。

缺点

- 使用组合模式的前提在于，你的业务**场景**必须能够表示成树形结构。所以，组合模式的应用场景也 比较局限，它并不是一种很常用的设计模式。

## 适用场景

- 处理一个树形结构，比如，公司人员组织架构、订单信息等；
- 跨越多个层次结构聚合数据，比如，统计文件夹下文件总数；
- 统一处理一个结构中的多个对象，比如，遍历文件夹下所有 XML 类型文件内容。

# 12. 结构型-享元模式: 共享

## 定义

享元模式 (flyweight pattern) 的原始定义是：摒弃了在每个对象中保存所有数据的方式，通过共享多个对象所共有的相同状态，从而让我们能在有限的内存容量中载入更多对象。

从这个定义中你可以发现，享元模式要解决的核心问题就是**节约内存空间**，使用的办法是找出相似对象之间的共有特征，然后复用这些特征。所谓“享元”，顾名思义就是**被共享的单元**。

> 比如: 一个文本字符串中存在很多重复的字符,如果每一个字符都用一个单独的对象来表示,将会占用较多的内存空间,我们可以使用享元模式解决这一类问题.  
> <img src="/java/img/dp/flyweight01.jpg" alt="image" style="zoom: 50%;" /> 

享元模式通过共享技术实现相同或者相似对象的重用,在逻辑上每一个出现的字符都有一个对象与之对应,然而在物理上他们却是共享同一个享元对象.

## 原理

享元模式的结构较为复杂,通常会结合工厂模式一起使用,在它的结构图中包含了一个享元工厂类.

<img src="/java/img/dp/flyweight02.jpg" alt="image" style="zoom: 50%;"/>

* **抽象享元角色（Flyweight）**：通常是一个接口或抽象类，在抽象享元类中声明了具体享元类公共的方法，这些方法可以向外界提供享元对象的内部数据（内部状态），同时也可以通过这些方法来设置外部数据（外部状态）。

    享元（Flyweight）模式中存在以下两种状态：

    1. 内部状态，即不会随着环境的改变而改变的可共享部分。
    2. 外部状态，指随环境改变而改变的不可以共享的部分。享元模式的实现要领就是区分应用中的这两种状态，并将外部状态外部化。

* **可共享的具体享元（Concrete Flyweight）角色** ：它实现了抽象享元类，称为享元对象；在具体享元类中为内部状态提供了存储空间。通常我们可以结合单例模式来设计具体享元类，为每一个具体享元类提供唯一的享元对象。

* **非共享的具体享元（Unshared Flyweight)角色** ：并不是所有的抽象享元类的子类都需要被共享，不能被共享的子类可设计为非共享具体享元类；当需要一个非共享具体享元类的对象时可以直接通过实例化创建。

* **享元工厂（Flyweight Factory）角色** ：负责创建和管理享元角色。当客户对象请求一个享元对象时，享元工厂检査系统中是否存在符合要求的享元对象，如果存在则提供给客户；如果不存在的话，则创建一个新的享元对象。
  
## 代码实现

```java
/**
 * 抽象享元类 可以是一个接口也可以是一个抽象类,作为所有享元类的公共父类, 主要作用是提高系统的可扩展性.
 **/
public abstract class Flyweight {
    public abstract void operation(String extrinsicState);
}
/**
 * 可共享-具体享元类 中要将内部状态和外部状态分开处理,内部状态作为具体享元类的成员变量,而外部状态通过注入的方式添加到具体享元类中.
 **/
public class ConcreteFlyweight extends Flyweight {
    //内部状态 intrinsicState作为成员变量,同一个享元对象的内部状态是一致的
    private String intrinsicState;
    public ConcreteFlyweight(String intrinsicState) {
        this.intrinsicState = intrinsicState;
    }
    /**
     * 外部状态在使用时由外部设置,不保存在享元对象中,即使是同一个对象
     * @param extrinsicState  外部状态,每次调用可以传入不同的外部状态
     */
    @Override
    public void operation(String extrinsicState) {
        //实现业务方法
        System.out.println("=== 享元 内部" + intrinsicState +",外部:" + extrinsicState);
    }
}
/**
 * 非共享具体享元类,不复用享元工厂内部状态,但是是抽象享元类的子类或实现类
 **/
public class UnsharedConcreteFlyweight extends Flyweight {
    private String intrinsicState;
    public UnsharedConcreteFlyweight(String intrinsicState) {
        this.intrinsicState = intrinsicState;
    }
    @Override
    public void operation(String extrinsicState) {
        System.out.println("===不共享 内部: " + intrinsicState +", 外部: " + extrinsicState);
    }
}
/**
 * 享元工厂类
 *      管理一个享元对象类的缓存池。它会存储享元对象之间需要传递的共有状态，比如，按照大写英文字母来作为状态标识，这种只在享元对象之间传递的方式就叫内部状态。同时，它还提供了一个通用方法 getFlyweight()，主要通过内部状态标识来获取享元对象。
 *  作用: 作为存储享元对象的享元池.用户获取享元对象时先从享元池获取,有则返回,没有创建新的
 *  享元对象返回给用户,并在享元池中保存新增的对象.
 **/
public class FlyweightFactory {
    //定义一个HashMap用于存储享元对象,实现享元池
    private Map<String,Flyweight> pool = new HashMap();
    public FlyweightFactory() {
        //添加对应的内部状态
        pool.put("A",new ConcreteFlyweight("A"));
        pool.put("B",new ConcreteFlyweight("B"));
        pool.put("C",new ConcreteFlyweight("C"));
    }
    //根据内部状态来进行查找
    public Flyweight getFlyweight(String key){
        //对象存在,从享元池直接返回
        if(pool.containsKey(key)){
            System.out.println("===享元池中存在,直接复用,key:" + key);
            return pool.get(key);
        }else{
            //如果对象不存在,先创建一个新的对象添加到享元池中,然后返回
            System.out.println("===享元池中不存在,创建并复用,key:" + key);
            Flyweight fw = new ConcreteFlyweight(key);
            pool.put(key,fw);
            return fw;
        }
    }
}
```

## 应用实例

<img src="/java/img/dp/flyweight03.jpg" alt="image" style="zoom: 50%;"/>

五子棋中有大量的黑子和白子,它们的形状大小都是一样的,只是出现的位置不同,所以一个棋子作为一个独立的对象存储在内存中,会导致大量的内存的浪费,我们使用享元模式来进行优化.

<img src="/java/img/dp/flyweight04.jpg" alt="image" style="zoom: 50%;"/>

```java
/**
 * 抽象享元类: 五子棋类
 **/
abstract class GobangFlyweight {
    public abstract String getColor();
    public void display() {
        System.out.println("棋子颜色: " + this.getColor());
    }
}
/**
 * 共享享元类-白色棋子
 **/
class WhiteGobang extends GobangFlyweight{
    @Override
    public String getColor() {
        return "白色";
    }
}
/**
 * 共享享元类-黑色棋子
 **/
class BlackGobang extends GobangFlyweight {
    @Override
    public String getColor() {
        return "黑色";
    }
}
/**
 * 享元工厂类-生产围棋棋子,使用单例模式进行设计
 **/
 class GobangFactory {
    private static Map<String,GobangFlyweight> pool;
    //设置共享对象的内部状态,在享元对象中传递
    private GobangFactory() {
        pool = new HashMap<>();
        GobangFlyweight black = new BlackGobang(); //黑子
        GobangFlyweight white = new WhiteGobang(); //白子
        pool.put("b",black);
        pool.put("w",white);
    }
    //返回享元工厂类唯一实例
    public static GobangFactory getInstance() {
        return SingletonHolder.INSTANCE;
    }
    //静态内部类-单例
    private static class SingletonHolder{
        private static final GobangFactory INSTANCE = new GobangFactory();
    }
    //通过key获取集合中的享元对象
    public GobangFlyweight getGobang(String key){
        return pool.get(key);
    }
}

public class Client {
    public static void main(String[] args) {
        //获取享元工厂对象
        GobangFactory instance = GobangFactory.getInstance();
        //获取3颗黑子
        GobangFlyweight b1 = instance.getGobang("b");
        GobangFlyweight b2 = instance.getGobang("b");
        GobangFlyweight b3 = instance.getGobang("b");
        System.out.println("判断两颗黑子是否相同: " + (b1 == b2));
        //获取2颗白子
        GobangFlyweight w1 = instance.getGobang("w");
        GobangFlyweight w2 = instance.getGobang("w");
        System.out.println("判断两颗白子是否相同: " + (w1 == w2));
        //显示棋子
        b1.display();
        b2.display();
        b3.display();
        w1.display();
        w2.display();
    }
}
```

三颗黑子(两颗白子)对象比较之后内存地址都是一样的.说明它们是同一个对象.在实现享元模式时使用了单例模式和简单工厂模式,保证了享元工厂对象的唯一性,并提供工厂方法向客户端返回享元对象.

## 优缺点

优点

- 极大**减少内存中相似或相同对象数量**，节约系统资源，提供系统性能
    > 比如，当大量商家的商品图片、固定文字（如商品介绍、商品属性）在不同的网页进行展示时，通常不需要重复创建对象，而是可以使用同一个对象，以避免重复存储而浪费内存空间。由于通过享元模式构建的对象是共享的，所以当程序在运行时不仅不用重复创建，还能减少程序与操作系统的 IO 交互次数，大大提升了读写性能。
- 享元模式中的**外部状态相对独立**，且不影响内部状态

缺点

- 为了使对象可以共享，需要将享元对象的部分状态外部化，分离内部状态和外部状态，使程序**逻辑复杂**

## 适用场景

- 一个系统有大量相同或者相似的对象，造成内存的大量耗费。

    注意: 在使用享元模式时需要维护一个存储享元对象的享元池，而这需要耗费一定的系统资源，因此，应当在需要多次重复使用享元对象时才值得使用享元模式。

- 在 Java 中，享元模式一个常用的场景就是，使用数据类的**包装类对象的valueOf()** 方法。比如，使用 Integer.valueOf() 方法时，实际的代码实现中有一个叫 IntegerCache 的静态类，它就是一直缓存了 -127 到 128 范围内的数值，如下代码所示，你可以在 Java JDK 中的 Integer 类的源码中找到这段代码。

    ```java
    public class Test1 {
        public static void main(String[] args) {
            Integer i1 = 127;
            Integer i2 = 127;
            System.out.println("i1和i2对象是否是同一个对象？" + (i1 == i2));
    
            Integer i3 = 128;
            Integer i4 = 128;
            System.out.println("i3和i4对象是否是同一个对象？" + (i3 == i4));
        }
    }
    // Integer.class 传入的值在-128 - 127 之间,直接从缓存中返回
    public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }
    ```

    可以看到 `Integer` 默认先创建并缓存 `-128 ~ 127` 之间数的 `Integer` 对象，当调用 `valueOf` 时如果参数在 `-128 ~ 127` 之间则计算下标并从缓存中返回，否则创建一个新的 `Integer` 对象。

    其实享元模式本质上就是找到对象的不可变特征，并缓存起来，当类似对象使用时从缓存中读取，以达到节省内存空间的目的。


# 行为型模式(11种)

行为型模式用于描述程序在运行时复杂的流程控制，即描述多个类或对象之间怎样相互协作共同完成单个对象都无法单独完成的任务，它涉及算法与对象间职责的分配。

行为型模式分为类行为模式和对象行为模式，前者采用继承机制来在类间分派行为，后者采用组合或聚合在对象间分配行为。由于组合关系或聚合关系比继承关系耦合度低，满足“合成复用原则”，所以对象行为模式比类行为模式具有更大的灵活性。


# 14. 类行为型-模板方法模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 22. 类行为型-解释器模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 13. 对象行为型-观察者模式

## 定义

观察者模式(observer pattern)的原始定义是：定义对象之间的**一对多依赖关系**，这样当一个对象改变状态时，它的所有依赖项都会自动得到通知和更新。

解释一下上面的定义: 观察者模式它是用于建立一种对象与对象之间的依赖关系,一个对象发生改变时将自动通知其他对象,其他对象将相应的作出反应. 

应用场景非常广泛

现在我们常说的基于事件驱动的架构，其实也是观察者模式的一种最佳实践。当我们观察某一个对象时，对象传递出的每一个行为都被看成是一个事件，观察者通过处理每一个事件来完成自身的操作处理。  

生活中也有许多观察者模式的应用,比如 汽车与红绿灯的关系,'红灯停,绿灯行',在这个过程中交通信号灯是汽车的观察目标,而所有等红灯的汽车都是观察者.

> 在观察者模式中发生改变的对象称为**观察目标**,而被通知的对象称为**观察者**,一个观察目标可以应对多个观察者,而且这些观察者之间可以没有任何相互联系,可以根据需要增加和删除观察者,使得系统更易于扩展.
>
> 观察者模式的别名有发布-订阅(Publish/Subscribe)模式,模型-视图(Model-View)模式、源-监听(Source-Listener) 模式等

## 原理

观察者模式结构中通常包括: **观察目标**和**观察者**两个继承层次结构.

<img src="/java/img/dp/observer02.jpg" alt="image" style="zoom: 50%;"/>

- **Subject 抽象主题（抽象被观察者）**：抽象主题角色把所有观察者对象保存在一个集合里，每个主题都可以有任意数量的观察者，抽象主题提供一个接口，可以增加和删除观察者对象。
- **ConcreteSubject 具体主题（具体被观察者）**：该角色将有关状态存入具体观察者对象，在具体主题的内部状态发生改变时，给所有注册过的观察者发送通知。
- **Observer 抽象观察者**：是观察者的抽象类，它定义了一个更新接口，使得在得到主题更改通知时更新自己。
- **ConcrereObserver 具体观察者**：实现抽象观察者定义的更新接口，以便在得到主题更改通知时更新自身的状态。在具体观察者中维护一个指向具体目标对象的引用,它存储具体观察者的有关状态,这些状态需要与具体目标保持一致.

## 代码实现

```java
// ======================== 观察者 ==============
/**
 * 抽象观察者
 **/
public interface Observer {
    //update方法: 为不同观察者的更新(响应)行为定义相同的接口,不同的观察者对该方法有不同的实现
    public void update();
}
/**
 * 具体观察者
 **/
public class ConcreteObserverOne implements Observer {
    @Override
    public void update() {
        //获取消息通知,执行业务代码
        System.out.println("ConcreteObserverOne 得到通知!");
    }
}
/**
 * 具体观察者
 **/
public class ConcreteObserverTwo implements Observer {
    @Override
    public void update() {
        //获取消息通知,执行业务代码
        System.out.println("ConcreteObserverTwo 得到通知!");
    }
}
// ======================== 被观察者 ==============
/**
 * 抽象目标类
 **/
public interface Subject {
     void attach(Observer observer);
     void detach(Observer observer);
     void notifyObservers();
}
/**
 * 具体目标类
 **/
public class ConcreteSubject implements Subject {
    //定义集合,存储所有观察者对象
    private ArrayList<Observer> observers = new ArrayList<>();
    //注册方法,向观察者集合中增加一个观察者
    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }
    //注销方法,用于从观察者集合中删除一个观察者
    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }
    //通知方法
    @Override
    public void notifyObservers() {
        //遍历观察者集合,调用每一个观察者的响应方法
        for (Observer obs : observers) {
            obs.update();
        }
    }
}

// ======================== 测试类 ==============
public class Client {
    public static void main(String[] args) {
        //创建目标类(被观察者)
        ConcreteSubject subject = new ConcreteSubject();
        //注册观察者类,可以注册多个
        subject.attach(new ConcreteObserverOne());
        subject.attach(new ConcreteObserverTwo());
        //具体主题的内部状态发生改变时，给所有注册过的观察者发送通知。
        subject.notifyObservers();
    }
}
```

## 应用实例

实现一个**买房摇号**的程序.摇号结束,要通过**短信告知**用户摇号结果,还需要向MQ中**保存**用户本次摇号的信息.

### 未使用设计模式

```java
/**
 * 模拟买房摇号服务
 **/
public class DrawHouseService {
    //摇号抽签
    public String lots(String uId){
        if(uId.hashCode() % 2 == 0){
            return "恭喜ID为: " + uId + " 的用户,在本次摇号中中签! !";
        }else{
            return "很遗憾,ID为: " + uId + "的用户,您本次未中签! !";
        }
    }
}
@Getter
@Setter
public class LotteryResult {
    private String uId; // 用户id
    private String msg; // 摇号信息
    private Date dataTime; // 业务时间
}
/**
 * 开奖服务接口
 **/
public interface LotteryService {
    //摇号相关业务
    public LotteryResult lottery(String uId);
}
/**
 * 开奖服务
 **/
public class LotteryServiceImpl implements LotteryService {
    //注入摇号服务
    private DrawHouseService houseService = new DrawHouseService();
    @Override
    public LotteryResult lottery(String uId) {
        //摇号
        String result = houseService.lots(uId);
        //发短信
        System.out.println("发送短信通知用户ID为: " + uId + ",您的摇号结果如下: " + result);
        //发送MQ消息
        System.out.println("记录用户摇号结果(MQ), 用户ID:" +  uId + ",摇号结果:" + result);

       	return new LotteryResult(uId,result,new Date());
    }
}

@Test
public void test1(){
    LotteryService ls = new LotteryServiceImpl();
    String result  = ls.lottery("1234567887654322");
    System.out.println(result);
}
```

**1 ) 使用观察者模式进行优化**

上面的摇号业务中,摇号、发短信、发MQ消息是一个顺序调用的过程,但是除了摇号这个核心功能以外, 发短信与记录信息到MQ的操作都不是主链路的功能,需要单独抽取出来,这样才能保证在后面的开发过程中保证代码的可扩展性和可维护性.

<img src=".\img\107.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

- 事件监听

```java
/**
 * 事件监听接口
 * @author spikeCong
 * @date 2022/10/11
 **/
public interface EventListener {

    void doEvent(LotteryResult result);
}

/**
 * 短信发送事件
 * @author spikeCong
 * @date 2022/10/11
 **/
public class MessageEventListener implements EventListener {

    @Override
    public void doEvent(LotteryResult result) {
        System.out.println("发送短信通知用户ID为: " + result.getuId() +
                ",您的摇号结果如下: " + result.getMsg());
    }
}

/**
 * MQ消息发送事件
 * @author spikeCong
 * @date 2022/10/11
 **/
public class MQEventListener implements EventListener {

    @Override
    public void doEvent(LotteryResult result) {
        System.out.println("记录用户摇号结果(MQ), 用户ID:" +  result.getuId() +
                ",摇号结果:" + result.getMsg());
    }
}
```

事件处理

```java
/**
 * 事件处理类
 * @author spikeCong
 * @date 2022/10/11
 **/
public class EventManager {

    public enum EventType{
        MQ,Message
    }

    //监听器集合
    Map<Enum<EventType>, List<EventListener>> listeners = new HashMap<>();

    public EventManager(Enum<EventType>... operations) {
        for (Enum<EventType> operation : operations) {
            this.listeners.put(operation,new ArrayList<>());
        }
    }

    /**
     * 订阅
     * @param eventType 事件类型
     * @param listener  监听
     */
    public void subscribe(Enum<EventType> eventType, EventListener listener){
        List<EventListener> users = listeners.get(eventType);
        users.add(listener);
    }

    /**
     * 取消订阅
     * @param eventType 事件类型
     * @param listener  监听
     */
    public void unsubscribe(Enum<EventType> eventType,EventListener listener){
        List<EventListener> users = listeners.get(eventType);
        users.remove(listener);
    }

    /**
     * 通知
     * @param eventType 事件类型
     * @param result    结果
     */
    public void notify(Enum<EventType> eventType, LotteryResult result){
        List<EventListener> users = listeners.get(eventType);
        for (EventListener listener : users) {
            listener.doEvent(result);
        }
    }
}
```

摇号业务处理

```java
/**
 * 开奖服务接口
 * @author spikeCong
 * @date 2022/10/11
 **/
public abstract class LotteryService{

    private EventManager eventManager;

    public LotteryService(){
        //设置事件类型
        eventManager = new EventManager(EventManager.EventType.MQ, EventManager.EventType.Message);
        //订阅
        eventManager.subscribe(EventManager.EventType.Message,new MessageEventListener());
        eventManager.subscribe(EventManager.EventType.MQ,new MQEventListener());
    }

    public LotteryResult lotteryAndMsg(String uId){
        LotteryResult result = lottery(uId);
        //发送通知
        eventManager.notify(EventManager.EventType.Message,result);
        eventManager.notify(EventManager.EventType.MQ,result);

        return result;
    }

    public abstract LotteryResult lottery(String uId);
}

/**
 * 开奖服务
 * @author spikeCong
 * @date 2022/10/11
 **/
public class LotteryServiceImpl extends LotteryService {

    //注入摇号服务
    private DrawHouseService houseService = new DrawHouseService();

    @Override
    public LotteryResult lottery(String uId) {
        //摇号
        String result = houseService.lots(uId);

        return new LotteryResult(uId,result,new Date());
    }
}
```

测试

```java
@Test
public void test2(){
    LotteryService ls = new LotteryServiceImpl();
    LotteryResult result  = ls.lotteryAndMsg("1234567887654322");
    System.out.println(result);
}
```

## 优缺点 ## 适用场景

### 6.1.5 观察者模式总结

**1) 观察者模式的优点**

* 降低了目标与观察者之间的耦合关系，两者之间是抽象耦合关系。
* 被观察者发送通知，所有注册的观察者都会收到信息【可以实现广播机制】

**2) 观察者模式的缺点** 

* 如果观察者非常多的话，那么所有的观察者收到被观察者发送的通知会耗时
* 如果被观察者有循环依赖的话，那么被观察者发送通知会使观察者循环调用，会导致系统崩溃

**3 ) 观察者模式常见的使用场景**

- 当一个对象状态的改变需要改变其他对象时。比如，商品库存数量发生变化时，需要通知商品详情页、购物车等系统改变数量。
- 一个对象发生改变时只想要发送通知，而不需要知道接收者是谁。比如，订阅微信公众号的文章，发送者通过公众号发送，订阅者并不知道哪些用户订阅了公众号。
- 需要创建一种链式触发机制时。比如，在系统中创建一个触发链，A 对象的行为将影响 B 对象，B 对象的行为将影响 C 对象……这样通过观察者模式能够很好地实现。
- 微博或微信朋友圈发送的场景。这是观察者模式的典型应用场景，一个人发微博或朋友圈，只要是关联的朋友都会收到通知；一旦取消关注，此人以后将不会收到相关通知。
- 需要建立基于事件触发的场景。比如，基于 Java UI 的编程，所有键盘和鼠标事件都由它的侦听器对象和指定函数处理。当用户单击鼠标时，订阅鼠标单击事件的函数将被调用，并将所有上下文数据作为方法参数传递给它。

 **4 ) JDK 中对观察者模式的支持**

JDK中提供了Observable类以及Observer接口,它们构成了JDK对观察者模式的支持.

- `java.util.Observer` 接口: 该接口中声明了一个方法,它充当**抽象观察者**,其中声明了一个update方法.

  ```java
  void update(Observable o, Object arg);
  ```

- `java.util.Observable` 类: 充当观察目标类(被观察类) , 在该类中定义了一个Vector集合来存储观察者对象.下面是它最重要的 3 个方法。

  - void addObserver(Observer o) 方法：用于将新的观察者对象添加到集合中。

  * void notifyObservers(Object arg) 方法：调用集合中的所有观察者对象的 update方法，通知它们数据发生改变。通常越晚加入集合的观察者越先得到通知。


  * void setChange() 方法：用来设置一个 boolean 类型的内部标志，注明目标对象发生了变化。当它为true时，notifyObservers() 才会通知观察者。

用户可以直接使用Observer接口和Observable类作为观察者模式的抽象层,再自定义具体观察者类和具体观察目标类,使用JDK中提供的这两个类可以更加方便的实现观察者模式.


# 15. 对象行为型-策略模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 16. 对象行为型-职责链模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 17. 对象行为型-状态模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 18. 对象行为型-迭代器模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 19. 对象行为型-访问者模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 20. 对象行为型-备忘录模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 21. 对象行为型-命令模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景

# 23. 对象行为型-中介者模式

## 定义 ## 原理 ## 代码实现 ## 优缺点 ## 适用场景


## 6.2 模板方法模式

### 6.2.1 模板方法模式介绍

**模板方法模式(template method pattern)原始定义是：在操作中定义算法的框架，将一些步骤推迟到子类中。模板方法让子类在不改变算法结构的情况下重新定义算法的某些步骤。**

模板方法中的算法可以理解为广义上的业务逻辑,并不是特指某一个实际的算法.定义中所说的算法的框架就是模板, 包含算法框架的方法就是模板方法.

> 例如: 我们去医院看病一般要经过以下4个流程：挂号、取号、排队、医生问诊等，其中挂号、 取号 、排队对每个病人是一样的，可以在父类中实现，但是具体医生如何根据病情开药每个人都是不一样的，所以开药这个操作可以延迟到子类中实现。

​														<img src=".\img\108.jpg" alt="image-20220530160637842" style="zoom: 70%;" />	

模板方法模式是一种基于继承的代码复用技术,它是一种类行为模式. 模板方法模式其结构中只存在父类与子类之间的继承关系.

模板方法的作用主要是提高程序的复用性和扩展性:

- 复用指的是,所有的子类可以复用父类中提供的模板方法代码
- 扩展指的是,框架通过模板模式提供功能扩展点,让框架用户可以在不修改框架源码的情况下,基于扩展点定制化框架的功能.

### 6.2.2 模板方法模式原理

模板方法模式的定位很清楚，就是为了解决算法框架这类特定的问题，同时明确表示需要使用继承的结构。

<img src=".\img\109.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

模板方法（Template Method）模式包含以下主要角色：

- 抽象父类：定义一个算法所包含的所有步骤，并提供一些通用的方法逻辑。
- 具体子类：继承自抽象父类，根据需要重写父类提供的算法步骤中的某些步骤。

抽象类（Abstract Class）：负责给出一个算法的轮廓和骨架。它由一个模板方法和若干个基本方法构成。

* 模板方法：定义了算法的骨架，按某种顺序调用其包含的基本方法。

* 基本方法：是实现算法各个步骤的方法，是模板方法的组成部分。基本方法又可以分为三种：

  * 抽象方法(Abstract Method) ：一个抽象方法由抽象类声明、由其具体子类实现。

  * 具体方法(Concrete Method) ：一个具体方法由一个抽象类或具体类声明并实现，其子类可以进行覆盖也可以直接继承。

  * 钩子方法(Hook Method) ：在抽象类中已经实现，包括用于判断的逻辑方法和需要子类重写的空方法两种。

    一般钩子方法是用于判断的逻辑方法，这类方法名一般为isXxx，返回值类型为boolean类型。

### 6.2.3 模板方法模式实现

UML类图对应的代码实现

```java
/**
 * 抽象父类
 * @author spikeCong
 * @date 2022/10/12
 **/
public abstract class AbstractClassTemplate {

    void step1(String key){
        System.out.println("在模板类中 -> 执行步骤1");
        if(step2(key)){
            step3();
        }else{
            step4();
        }

        step5();
    }

    boolean step2(String key){
        System.out.println("在模板类中 -> 执行步骤2");
        if("x".equals(key)){
            return true;
        }
        return false;
    }

    abstract void step3();
    abstract void step4();

    void step5(){
        System.out.println("在模板类中 -> 执行步骤5");
    }

    void run(String key){
        step1(key);
    }

}

public class ConcreteClassA extends AbstractClassTemplate{


    @Override
    void step3() {
        System.out.println("在子类A中 -> 执行步骤 3");
    }

    @Override
    void step4() {
        System.out.println("在子类A中 -> 执行步骤 4");
    }
}

public class ConcreteClassB extends AbstractClassTemplate {

    @Override
    void step3() {
        System.out.println("在子类B中 -> 执行步骤 3");
    }

    @Override
    void step4() {
        System.out.println("在子类B中 -> 执行步骤 4");
    }
}

public class Test01 {

    public static void main(String[] args) {
        AbstractClassTemplate concreteClassA = new ConcreteClassA();
        concreteClassA.run("");

        System.out.println("===========");

        AbstractClassTemplate concreteClassB = new ConcreteClassB();
        concreteClassB.run("x");
    }
}

// 输出结果
在模板类中 -> 执行步骤1
在模板类中 -> 执行步骤2
在子类A中 -> 执行步骤 4
在模板类中 -> 执行步骤5
===========
在模板类中 -> 执行步骤1
在模板类中 -> 执行步骤2
在子类B中 -> 执行步骤 3
在模板类中 -> 执行步骤5
```

### 6.2.4 模板方法模式应用实例

P2P公司的借款系统中有一个利息计算模块,利息的计算流程是这样的:

1. 用户登录系统,登录时需要输入账号密码,如果登录失败(比如用户密码错误),系统需要给出提示
2. 如果用户登录成功,则根据用户的借款的类型不同,使用不同的利息计算方式进行计算
3. 系统需要显示利息.

```java
/**
 * 账户抽象类
 * @author spikeCong
 * @date 2022/10/12
 **/
public abstract class Account {

    //step1 具体方法-验证用户信息是否正确
    public boolean validate(String account,String password){
        System.out.println("账号: " + account + ",密码: " + password);
        if(account.equalsIgnoreCase("tom") &&
        password.equalsIgnoreCase("123456")){
            return true;
        }else{
            return false;
        }
    }

    //step2 抽象方法-计算利息
    public abstract void calculate();

    //step3 具体方法-显示利息
    public void display(){
        System.out.println("显示利息!");
    }

    //模板方法
    public void handle(String account,String password){
        if(!validate(account,password)){
            System.out.println("账户或密码错误!!");
            return;
        }
        calculate();
        display();
    }
}


/**
 * 借款一个月
 * @author spikeCong
 * @date 2022/10/12
 **/
public class LoanOneMonth extends Account{

    @Override
    public void calculate() {
        System.out.println("借款周期30天,利率为10%!");
    }
}

/**
 * 借款七天
 * @author spikeCong
 * @date 2022/10/12
 **/
public class LoanSevenDays extends Account{

    @Override
    public void calculate() {
        System.out.println("借款周期7天,无利息!仅收取贷款金额1%的服务费!");
    }

    @Override
    public void display() {
        System.out.println("七日内借款无利息!");
    }

}


public class Client {

    public static void main(String[] args) {

        Account a1 = new LoanSevenDays();
        a1.handle("tom","12345");

        System.out.println("==========================");

        Account a2 = new LoanOneMonth();
        a2.handle("tom","123456");
    }
}
```



### 6.2.5 模板方法模式总结

**优点：**

* 在父类中形式化的定义一个算法,而由它的子类来实现细节处理,在子类实现详细的处理代码时,并不会改变父类算法中步骤的执行顺序.

* 模板方法可以实现一种反向的控制结构,通过子类覆盖父类的钩子方法,来决定某一个特定步骤是否需要执行

* 在模板方法模式中可以通过子类来覆盖父类的基本方法,不同的子类可以提供基本方法的不同实现,更换和增加新的子类很方便,符合单一职责原则和开闭原则.

  

**缺点：**

* 对每个不同的实现都需要定义一个子类，这会导致类的个数增加，系统更加庞大，设计也更加抽象。
* 父类中的抽象方法由子类实现，子类执行的结果会影响父类的结果，这导致一种反向的控制结构，它提高了代码阅读的难度。

**模板方法模式的使用场景一般有：**

- 多个类有相同的方法并且逻辑可以共用时；
- 将通用的算法或固定流程设计为模板，在每一个具体的子类中再继续优化算法步骤或流程步骤时；
- 重构超长代码时，发现某一个经常使用的公有方法。



## 6.3 策略模式

### 6.3.1 策略模式概述

**策略模式(strategy pattern)的原始定义是：定义一系列算法，将每一个算法封装起来，并使它们可以相互替换。策略模式让算法可以独立于使用它的客户端而变化。**

其实我们在现实生活中常常遇到实现某种目标存在多种策略可供选择的情况，例如，出行旅游可以乘坐飞机、乘坐火车、骑自行车或自己开私家车等。

<img src=".\img\111.jpg" alt="image-20220530160637842" style="zoom: 100%;" /> 

在软件开发中,经常会遇到这种情况,开发一个功能可以通过多个算法去实现,我们可以将所有的算法集中在一个类中,在这个类中提供多个方法,每个方法对应一个算法, 或者我们也可以将这些算法都封装在一个统一的方法中,使用if...else...等条件判断语句进行选择.但是这两种方式都存在硬编码的问题,后期需要增加算法就需要修改源代码,这会导致代码的维护变得困难.

**比如网购，你可以选择工商银行、农业银行、建设银行等等，但是它们提供的算法都是一致的，就是帮你付款。**

<img src=".\img\110.jpg" alt="image-20220530160637842" style="zoom: 50%;" />

在软件开发中也会遇到相似的情况，当实现某一个功能存在多种算法或者策略，我们可以根据环境或者条件的不同选择不同的算法或者策略来完成该功能。

### 6.3.2 策略模式原理

在策略模式中可以定义一些独立的类来封装不同的算法,每一个类封装一种具体的算法,在这里每一个封装算法的类都可以被称为一种策略,为了保证这些策略在使用时具有一致性,一般会提供一个抽象的策略类来做算法的声明.而每种算法对应一个具体的策略类.

<img src=".\img\112.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

策略模式的主要角色如下：

* 抽象策略（Strategy）类：这是一个抽象角色，通常由一个接口或抽象类实现。此角色给出所有的具体策略类所需的接口。
* 具体策略（Concrete Strategy）类：实现了抽象策略定义的接口，提供具体的算法实现或行为。
* 环境或上下文（Context）类：是使用算法的角色,  持有一个策略类的引用，最终给客户端调用。

### 6.3.3 策略模式实现

策略模式的本质是通过Context类来作为中心控制单元，对不同的策略进行调度分配。

```java
/**
 * 抽象策略类
 * @author spikeCong
 * @date 2022/10/13
 **/
public interface Strategy {

    void algorithm();
}

public class ConcreteStrategyA implements Strategy {

    @Override
    public void algorithm() {
        System.out.println("执行策略A");
    }
}

public class ConcreteStrategyB implements Strategy {

    @Override
    public void algorithm() {
        System.out.println("执行策略B");
    }
}

/**
 * 环境类
 * @author spikeCong
 * @date 2022/10/13
 **/
public class Context {

    //维持一个对抽象策略类的引用
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    //调用策略类中的算法
    public void algorithm(){
        strategy.algorithm();
    }
}

public class Client {

    public static void main(String[] args) {


        Strategy strategyA  = new ConcreteStrategyA();
        Context context = new Context(strategyA); //可以在运行时指定类型,通过配置文件+反射机制实现
        context.algorithm();
    }
}
```

### 6.3.4 策略模式应用实例

面试问题: 如何用设计模式消除代码中的if-else

物流行业中，通常会涉及到EDI报文(XML格式文件)传输和回执接收，每发送一份EDI报文，后续都会收到与之关联的回执（标识该数据在第三方系统中的流转状态）。

这里列举几种回执类型：MT1101、MT2101、MT4101、MT8104，系统在收到不同的回执报文后，会执行对应的业务逻辑处理。我们就业回执处理为演示案例

**1 ) 不使用设计模式** 

- 回执类

```java
/**
 * 回执信息
 * @author spikeCong
 * @date 2022/10/13
 **/
public class Receipt {

    private String message; //回执信息

    private String type; //回执类型(MT1101、MT2101、MT4101、MT8104)

    public Receipt() {
    }

    public Receipt(String message, String type) {
        this.message = message;
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
```

- 回执生成器

```java
public class ReceiptBuilder {

    public static List<Receipt> genReceiptList(){
        //模拟回执信息
        List<Receipt> receiptList = new ArrayList<>();
        receiptList.add(new Receipt("MT1101回执","MT1011"));
        receiptList.add(new Receipt("MT2101回执","MT2101"));
        receiptList.add(new Receipt("MT4101回执","MT4101"));
        receiptList.add(new Receipt("MT8104回执","MT8104"));

        //......
        return receiptList;
    }

}
```

- 客户端

```java
public class Client {

    public static void main(String[] args) {

        List<Receipt> receiptList = ReceiptBuilder.genReceiptList();

        //循环判断
        for (Receipt receipt : receiptList) {
            if("MT1011".equals(receipt.getType())){
                System.out.println("接收到MT1011回执!");
                System.out.println("解析回执内容");
                System.out.println("执行业务逻辑A"+"\n");
            }else if("MT2101".equals(receipt.getType())){
                System.out.println("接收到MT2101回执!");
                System.out.println("解析回执内容");
                System.out.println("执行业务逻辑B"+"\n");
            }else if("MT4101".equals(receipt.getType())) {
                System.out.println("接收到MT4101回执!");
                System.out.println("解析回执内容");
                System.out.println("执行业务逻辑C"+"\n");
            }else if("MT8104".equals(receipt.getType())) {
                System.out.println("接收到MT8104回执!");
                System.out.println("解析回执内容");
                System.out.println("执行业务逻辑D");
            }

            //......
        }
    }
}
```

**2 ) 使用策略模式进行优化**

通过策略模式, 将所有的if-else分支的业务逻辑抽取为各种策略类,让客户端去依赖策略接口,保证具体策略类的改变不影响客户端.

- 策略接口

```java
/**
 * 回执处理策略接口
 * @author spikeCong
 * @date 2022/10/13
 **/
public interface ReceiptHandleStrategy {

    void handleReceipt(Receipt receipt);
}

```

- 具体策略类

```java
public class Mt1011ReceiptHandleStrategy implements ReceiptHandleStrategy {

    @Override
    public void handleReceipt(Receipt receipt) {
        System.out.println("解析报文MT1011: " + receipt.getMessage());
    }
}

public class Mt2101ReceiptHandleStrategy implements ReceiptHandleStrategy {

    @Override
    public void handleReceipt(Receipt receipt) {
        System.out.println("解析报文MT2101: " + receipt.getMessage());
    }
}

......
```

- 策略上下文类(策略接口的持有者)

```java
/**
 * 上下文类,持有策略接口
 * @author spikeCong
 * @date 2022/10/13
 **/
public class ReceiptStrategyContext {

    private ReceiptHandleStrategy receiptHandleStrategy;

    public void setReceiptHandleStrategy(ReceiptHandleStrategy receiptHandleStrategy) {
        this.receiptHandleStrategy = receiptHandleStrategy;
    }

    //调用策略类中的方法
    public void handleReceipt(Receipt receipt){
        if(receipt != null){
            receiptHandleStrategy.handleReceipt(receipt);
        }
    }
}
```

- 策略工厂

```java
public class ReceiptHandleStrategyFactory {

    public ReceiptHandleStrategyFactory() {
    }

    //使用Map集合存储策略信息,彻底消除if...else
    private static Map<String,ReceiptHandleStrategy> strategyMap;

    //初始化具体策略,保存到map集合
    public static void init(){
        strategyMap = new HashMap<>();
        strategyMap.put("MT1011",new Mt1011ReceiptHandleStrategy());
        strategyMap.put("MT2101",new Mt2101ReceiptHandleStrategy());
    }

    //根据回执类型获取对应策略类对象
    public static ReceiptHandleStrategy getReceiptHandleStrategy(String receiptType){
        return strategyMap.get(receiptType);
    }
}
```

- 客户端

```java
public class Client {

    public static void main(String[] args) {

        //模拟回执
        List<Receipt> receiptList = ReceiptBuilder.genReceiptList();


        //策略上下文
        ReceiptStrategyContext context = new ReceiptStrategyContext();

        //策略模式将策略的 定义、创建、使用这三部分进行了解耦
        for (Receipt receipt : receiptList) {
            //获取置策略
            ReceiptHandleStrategyFactory.init();
            ReceiptHandleStrategy strategy = ReceiptHandleStrategyFactory.getReceiptHandleStrategy(receipt.getType());
            //设置策略
            context.setReceiptHandleStrategy(strategy);
            //执行策略
            context.handleReceipt(receipt);
        }
    }
}
```

**经过上面的改造，我们已经消除了if-else的结构，每当新来了一种回执，只需要添加新的回执处理策略，并修改ReceiptHandleStrategyFactory中的Map集合。如果要使得程序符合开闭原则，则需要调整ReceiptHandleStrategyFactory中处理策略的获取方式，通过反射的方式，获取指定包下的所有IReceiptHandleStrategy实现类，然后放到字典Map中去.**

### 6.3.5 策略模式总结

**1) 策略模式优点：**

* 策略类之间可以自由切换

  由于策略类都实现同一个接口，所以使它们之间可以自由切换。

* 易于扩展

  增加一个新的策略只需要添加一个具体的策略类即可，基本不需要改变原有的代码，符合“开闭原则“

* 避免使用多重条件选择语句（if else），充分体现面向对象设计思想。

**2) 策略模式缺点：** 

* 客户端必须知道所有的策略类，并自行决定使用哪一个策略类。
* 策略模式将造成产生很多策略类，可以通过使用享元模式在一定程度上减少对象的数量。

**3) 策略模式使用场景**

* 一个系统需要动态地在几种算法中选择一种时，可将每个算法封装到策略类中。

  > 策略模式最大的作用在于分离使用算法的逻辑和算法自身实现的逻辑，这样就意味着当我们想要优化算法自身的实现逻辑时就变得非常便捷，一方面可以采用最新的算法实现逻辑，另一方面可以直接弃用旧算法而采用新算法。使用策略模式能够很方便地进行替换。

* 一个类定义了多种行为，并且这些行为在这个类的操作中以多个条件语句的形式出现，可将每个条件分支移入它们各自的策略类中以代替这些条件语句。

  > 在实际开发中，有许多算法可以实现某一功能，如查找、排序等，通过 if-else 等条件判断语句来进行选择非常方便。但是这就会带来一个问题：当在这个算法类中封装了大量查找算法时，该类的代码就会变得非常复杂，维护也会突然就变得非常困难。虽然策略模式看上去比较笨重，但实际上在每一次新增策略时都通过新增类来进行隔离，短期虽然不如直接写 if-else 来得效率高，但长期来看，维护单一的简单类耗费的时间其实远远低于维护一个超大的复杂类。

* 系统要求使用算法的客户不应该知道其操作的数据时，可使用策略模式来隐藏与算法相关的数据结构。

  > 如果我们不希望客户知道复杂的、与算法相关的数据结构,在具体策略类中封装算法与相关数据结构,可以提高算法的保密性与安全性.



**设计原则和思想其实比设计模式更加的普适和重要,掌握了代码的设计原则和思想,我们自然而然的就可以使用到设计模式,还有可能自己创建出一种新的设计模式.**

## 6.4 职责链模式

### 6.4.1 职责链模式介绍

**职责链模式(chain of responsibility pattern) 定义: 避免将一个请求的发送者与接收者耦合在一起,让多个对象都有机会处理请求.将接收请求的对象连接成一条链,并且沿着这条链传递请求,直到有一个对象能够处理它为止.**

在职责链模式中，多个处理器（也就是刚刚定义中说的“接收对象”）依次处理同一个请 求。一个请求先经过 A 处理器处理，然后再把请求传递给 B 处理器，B 处理器处理完后再 传递给 C 处理器，以此类推，形成一个链条。链条上的每个处理器各自承担各自的处理职 责，所以叫作职责链模式。

<img src=".\img\113.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

### 6.4.2 职责链模式原理

职责链模式结构

<img src=".\img\114.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

职责链模式主要包含以下角色:

* 抽象处理者（Handler）角色：定义一个处理请求的接口，包含抽象处理方法和一个后继连接(链上的每个处理者都有一个成员变量来保存对于下一处理者的引用,比如上图中的successor) 。
* 具体处理者（Concrete Handler）角色：实现抽象处理者的处理方法，判断能否处理本次请求，如果可以处理请求则处理，否则将该请求转给它的后继者。
* 客户类（Client）角色：创建处理链，并向链头的具体处理者对象提交请求，它不关心处理细节和请求的传递过程。

### 6.4.3 职责链模式实现

责任链模式的实现非常简单，每一个具体的处理类都会保存在它之后的下一个处理类。当处理完成后，就会调用设置好的下一个处理类，直到最后一个处理类不再设置下一个处理类，这时处理链条全部完成。

```java
public class RequestData {
    private String data;

    public RequestData(String data) {
        this.data = data;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}


/**
 * 抽象处理者类
 * @author spikeCong
 * @date 2022/10/14
 **/
public abstract class Handler {

    protected Handler successor = null;

    public void setSuccessor(Handler successor){
        this.successor = successor;
    }

    public abstract void handle(RequestData requestData);
}

public class HandlerA extends Handler {

    @Override
    public void handle(RequestData requestData) {
        System.out.println("HandlerA 执行代码逻辑! 处理: " + requestData.getData());

        requestData.setData(requestData.getData().replace("A",""));

        if(successor != null){
            successor.handle(requestData);
        }else{
            System.out.println("执行中止!");
        }
    }
}

public class HandlerB extends Handler {

    @Override
    public void handle(RequestData requestData) {
        System.out.println("HandlerB 执行代码逻辑! 处理: " + requestData.getData());

        requestData.setData(requestData.getData().replace("B",""));

        if(successor != null){
            successor.handle(requestData);
        }else{
            System.out.println("执行中止!");
        }
    }
}

public class HandlerC extends Handler {

    @Override
    public void handle(RequestData requestData) {
        System.out.println("HandlerC 执行代码逻辑! 处理: " + requestData.getData());

        requestData.setData(requestData.getData());

        if(successor != null){
            successor.handle(requestData);
        }else{
            System.out.println("执行中止!");
        }
    }
}

public class Client {

    public static void main(String[] args) {
        Handler h1 = new HandlerA();
        Handler h2 = new HandlerB();
        Handler h3 = new HandlerC();
        h1.setSuccessor(h2);
        h2.setSuccessor(h3);
        RequestData requestData = new RequestData("请求数据ABCDE");
        h1.handle(requestData);
    }

}
```

### 6.4.4 职责链模式应用实例

接下来我们模拟有一个双11期间,业务系统审批的流程,临近双十一公司会有陆续有一些新的需求上线,为了保证线上系统的稳定,我们对上线的审批流畅做了严格的控制.审批的过程会有不同级别的负责人加入进行审批(平常系统上线只需三级负责人审批即可,双十一前后需要二级或一级审核人参与审批),接下来我们就使用职责链模式来设计一下此功能.

<img src=".\img\116.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

**1) 不使用设计模式**

```java
/**
 * 审核信息
 * @author spikeCong
 * @date 2022/10/14
 **/
public class AuthInfo {

    private String code;

    private String info ="";

    public AuthInfo(String code, String... infos) {
        this.code = code;
        for (String str : infos) {
            info = this.info.concat(str +" ");
        }
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return "AuthInfo{" +
                "code='" + code + '\'' +
                ", info='" + info + '\'' +
                '}';
    }
}

/**
 * 模拟审核服务
 * @author spikeCong
 * @date 2022/10/14
 **/
public class AuthService {

    //审批信息 审批人Id+申请单Id
    private static Map<String,Date> authMap = new HashMap<String, Date>();

    /**
     * 审核流程
     * @param uId    审核人id
     * @param orderId  审核单id
     */
    public static void auth(String uId, String orderId){
        System.out.println("进入审批流程,审批人ID: " + uId);
        authMap.put(uId.concat(orderId),new Date());
    }

    //查询审核结果
    public static Date queryAuthInfo(String uId, String orderId){
        return authMap.get(uId.concat(orderId)); //key=审核人id+审核单子id
    }
}

public class AuthController {

    
    //审核接口
    public AuthInfo doAuth(String name, String orderId, Date authDate) throws ParseException {

        //三级审批
        Date date = null;
        //查询是否存在审核信息,查询条件: 审核人ID+订单ID,返回Map集合中的Date
        date = AuthService.queryAuthInfo("1000013", orderId);

        //如果为空,封装AuthInfo信息(待审核)返回
        if(date == null){
            return new AuthInfo("0001","单号: "+orderId,"状态: 等待三级审批负责人进行审批");
        }

        //二级审批
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 时间格式化
        //二级审核人主要审核双十一之前, 11-01 ~ 11-10号的请求,所以要对传入的审核时间进行判断
        //审核时间 大于 2022-11-01 并且  小于 2022-11-10,Date1.after(Date2),当Date1大于Date2时，返回TRUE,Date1.before(Date2)，当Date1小于Date2时，返回TRUE
        if(authDate.after(f.parse("2022-11-01 00:00:00")) && authDate.before(f.parse("2022-11-10 00:00:00"))){
            //条件成立,查询二级审核的审核信息
            date = AuthService.queryAuthInfo("1000012",orderId);
            
            //如果为空,还是待二级审核人审核状态
            if(date == null){
                return new AuthInfo("0001","单号: "+orderId,"状态: 等待二级审批负责人进行审批");
            }
        }

        //一级审批
        //审核范围是在11-11日 ~ 11-31日
        if(authDate.after(f.parse("2022-11-11 00:00:00")) && authDate.before(f.parse("2022-11-31 00:00:00"))){
            date = AuthService.queryAuthInfo("1000011",orderId);
            if(date == null){
                return new AuthInfo("0001","单号: "+orderId,"状态: 等待一级审批负责人进行审批");
            }
        }

        
       return new AuthInfo("0001","单号: "+orderId,"申请人:"+ name +", 状态: 审批完成!");
    }
}

public class Client {

    public static void main(String[] args) throws ParseException {

        AuthController controller = new AuthController();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = sdf.parse("2022-11-12 00:00:00");

        //设置申请流程

        //三级审核
        //1.调用doAuth方法,模拟发送申请人相关信息
        AuthInfo info1 = controller.doAuth("研发小周", "100001000010000", date);
        System.out.println("当前审核状态:  " + info1.getInfo());

        /**
         * 2.模拟进行审核操作, 虚拟审核人ID: 1000013
         * 调用auth() 方法进行审核操作, 就是向Map中添加一个 审核人ID和申请单ID
         */
        AuthService.auth("1000013", "100001000010000");
        System.out.println("三级负责人审批完成,审批人: 王工");

        System.out.println("===========================================================================");

        //二级审核
        //1.调用doAuth方法,模拟发送申请人相关信息
        AuthInfo info2 = controller.doAuth("研发小周", "100001000010000", date);
        System.out.println("当前审核状态:  " + info2.getInfo());

        /**
         * 2.模拟进行审核操作, 虚拟审核人ID: 1000012
         * 调用auth() 方法进行审核操作, 就是向Map中添加一个 审核人ID和申请单ID
         */
        AuthService.auth("1000012", "100001000010000");
        System.out.println("二级负责人审批完成,审批人: 张经理");

        System.out.println("===========================================================================");

        //一级审核
        //1.调用doAuth方法,模拟发送申请人相关信息
        AuthInfo info3 = controller.doAuth("研发小周", "100001000010000", date);
        System.out.println("当前审核状态:  " + info3.getInfo());

        /**
         * 2.模拟进行审核操作, 虚拟审核人ID: 1000012
         * 调用auth() 方法进行审核操作, 就是向Map中添加一个 审核人ID和申请单ID
         */
        AuthService.auth("1000011", "100001000010000");
        System.out.println("一级负责人审批完成,审批人: 罗总");
    }
}
```

**2 ) 职责链模式重构代码**

下图是为当前业务设计的责任链结构,统一抽象类AuthLink 下 有三个子类,将三个子类的执行通过编排,模拟出一条链路,这个链路就是业务中的责任链.

<img src=".\img\115.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

```java
/**
 * 抽象审核链类
 */
public abstract class AuthLink {

    protected Logger logger = LoggerFactory.getLogger(AuthLink.class);

    protected SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    protected String levelUserId;      //审核人ID
    protected String levelUserName;   //审核人姓名
    protected AuthLink next;          //持有下一个处理类的引用

    public AuthLink(String levelUserId, String levelUserName) {
        this.levelUserId = levelUserId;
        this.levelUserName = levelUserName;
    }

    //获取下一个处理类
    public AuthLink getNext() {
        return next;
    }

    //责任链中添加处理类
    public AuthLink appendNext(AuthLink next) {
        this.next = next;
        return this;
    }

    //抽象审核方法
    public abstract AuthInfo doAuth(String uId, String orderId, Date authDate);
}

/*
 * 一级负责人
 */
public class Level1AuthLink extends AuthLink {

    private Date beginDate = f.parse("2020-11-11 00:00:00");
    private Date endDate = f.parse("2020-11-31 23:59:59");

    public Level1AuthLink(String levelUserId, String levelUserName) throws ParseException {
        super(levelUserId, levelUserName);
    }

    @Override
    public AuthInfo doAuth(String uId, String orderId, Date authDate) {
        Date date = AuthService.queryAuthInfo(levelUserId, orderId);
        if (null == date) {
            return new AuthInfo("0001", "单号：", orderId, " 状态：待一级审批负责人 ", levelUserName);
        }
        AuthLink next = super.getNext();
        if (null == next) {
            return new AuthInfo("0000", "单号：", orderId, " 状态：一级审批完成", " 时间：", f.format(date), " 审批人：", levelUserName);
        }
        if (authDate.before(beginDate) || authDate.after(endDate)) {
            return new AuthInfo("0000", "单号：", orderId, " 状态：一级审批完成", " 时间：", f.format(date), " 审批人：", levelUserName);
        }
        return next.doAuth(uId, orderId, authDate);
    }
}

/**
 * 二级负责人
 */
public class Level2AuthLink extends AuthLink {

    private Date beginDate = f.parse("2020-11-11 00:00:00");
    private Date endDate = f.parse("2020-11-31 23:59:59");

    public Level2AuthLink(String levelUserId, String levelUserName) throws ParseException {
        super(levelUserId, levelUserName);
    }

    public AuthInfo doAuth(String uId, String orderId, Date authDate) {
        Date date = AuthService.queryAuthInfo(levelUserId, orderId);
        if (null == date) {
            return new AuthInfo("0001", "单号：", orderId, " 状态：待二级审批负责人 ", levelUserName);
        }
        AuthLink next = super.getNext();
        if (null == next) {
            return new AuthInfo("0000", "单号：", orderId, " 状态：二级审批完成", " 时间：", f.format(date), " 审批人：", levelUserName);
        }

        if (authDate.before(beginDate) || authDate.after(endDate) ) {
            return new AuthInfo("0000", "单号：", orderId, " 状态：二级审批完成", " 时间：", f.format(date), " 审批人：", levelUserName);
        }

        return next.doAuth(uId, orderId, authDate);
    }

}

/**
 * 三级负责人
 */
public class Level3AuthLink extends AuthLink {

    public Level3AuthLink(String levelUserId, String levelUserName) {
        super(levelUserId, levelUserName);
    }

    public AuthInfo doAuth(String uId, String orderId, Date authDate) {
        Date date = AuthService.queryAuthInfo(levelUserId, orderId);
        if (null == date) {
            return new AuthInfo("0001", "单号：", orderId, " 状态：待三级审批负责人 ", levelUserName);
        }
        AuthLink next = super.getNext();
        if (null == next) {
            return new AuthInfo("0000", "单号：", orderId, " 状态：三级审批完成", " 时间：", f.format(date), " 审批人：", levelUserName);
        }

        return next.doAuth(uId, orderId, authDate);
    }

}


```

测试

```java
public class Client {

    private Logger logger = LoggerFactory.getLogger(ApiTest.class);

    @Test
    public void test_AuthLink() throws ParseException {

        AuthLink authLink = new Level3AuthLink("1000013", "王工")
                .appendNext(new Level2AuthLink("1000012", "张经理")
                        .appendNext(new Level1AuthLink("1000011", "段总")));

        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date currentDate = f.parse("2020-11-18 23:49:46");

        logger.info("测试结果：{}", JSON.toJSONString(authLink.doAuth("研发牛马", "1000998004813441", currentDate)));

        // 模拟三级负责人审批
        AuthService.auth("1000013", "1000998004813441");
        logger.info("测试结果：{}", "模拟三级负责人审批，王工");
        logger.info("测试结果：{}", JSON.toJSONString(authLink.doAuth("研发牛马", "1000998004813441", currentDate)));

        // 模拟二级负责人审批
        AuthService.auth("1000012", "1000998004813441");
        logger.info("测试结果：{}", "模拟二级负责人审批，张经理");
        logger.info("测试结果：{}", JSON.toJSONString(authLink.doAuth("研发牛马", "1000998004813441", currentDate)));

        // 模拟一级负责人审批
        AuthService.auth("1000011", "1000998004813441");
        logger.info("测试结果：{}", "模拟一级负责人审批，段总");
        logger.info("测试结果：{}", JSON.toJSONString(authLink.doAuth("研发牛马", "1000998004813441", currentDate)));

    }
}
```

从上面的代码结果看,我们的责任链已经生效,按照责任链的结构一层一层审批.当工作流程发生变化，可以动态地改变链内的成员或者修改它们的次序，也可动态地新增或者删除责任。并且每个类只需要处理自己该处理的工作，不能处理的传递给下一个对象完成，明确各类的责任范围，符合类的单一职责原则。

### 6.4.5 职责链模式总结

**1) 职责链模式的优点：**

* 降低了对象之间的耦合度

  该模式降低了请求发送者和接收者的耦合度。

* 增强了系统的可扩展性

  可以根据需要增加新的请求处理类，满足开闭原则。

* 增强了给对象指派职责的灵活性

  当工作流程发生变化，可以动态地改变链内的成员或者修改它们的次序，也可动态地新增或者删除责任。

* 责任链简化了对象之间的连接

  一个对象只需保持一个指向其后继者的引用，不需保持其他所有处理者的引用，这避免了使用众多的 if 或者 if···else 语句。

* 责任分担

  每个类只需要处理自己该处理的工作，不能处理的传递给下一个对象完成，明确各类的责任范围，符合类的单一职责原则。

**2) 职责链模式的缺点:** 

* 不能保证每个请求一定被处理。由于一个请求没有明确的接收者，所以不能保证它一定会被处理，该请求可能一直传到链的末端都得不到处理。
* 对比较长的职责链，请求的处理可能涉及多个处理对象，系统性能将受到一定影响。
* 职责链建立的合理性要靠客户端来保证，增加了客户端的复杂性，可能会由于职责链的错误设置而导致系统出错，如可能会造成循环调用。

**3) 使用场景分析**

责任链模式常见的使用场景有以下几种情况。

- 在运行时需要动态使用多个关联对象来处理同一次请求时。比如，请假流程、员工入职流程、编译打包发布上线流程等。
- 不想让使用者知道具体的处理逻辑时。比如，做权限校验的登录拦截器。
- 需要动态更换处理对象时。比如，工单处理系统、网关 API 过滤规则系统等。
- 职责链模式常被用在框架开发中,用来实现框架的过滤器、拦截器功能,让框架的使用者在不修改源码的情况下,添加新的过滤拦截功能. 



## 6.5 状态模式

### 6.5.1 状态模式介绍

自然界很多事物都有多种状态,而且不同状态下会具有不同的行为,这些状态在特定条件下还会发生相互转换,比如水

​								<img src=".\img\117.jpg" alt="image-20220530160637842" style="zoom: 100%;" /> 

在软件系统中,有些对象也像水一样具有多种状态,这些状态在某些情况下能够相互转换,而且对象在不同状态下也将具有不同的行为.

**状态模式(state pattern)的定义:  允许一个对象在其内部状态改变时改变它的行为. 对象看起来似乎修改了它的类.**

**状态模式**就是用于解决系统中复杂对象的状态转换以及不同状态下行为的封装问题. 状态模式将一个对象的状态从该对象中分离出来,封装到专门的状态类中(用类来表示状态) ,使得对象状态可以灵活变化.

### 6.5.2 状态模式结构

状态模式结构图:

<img src=".\img\118.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

从这个 UML 图中，我们能看出状态模式包含的关键角色有三个。

- 上下文信息类（Context）：实际上就是存储当前状态的类，对外提供更新状态的操作。在该类中维护着一个抽象状态接口State实例,这个实例定义当前状态.

- 抽象状态类（State）：可以是一个接口或抽象类，用于定义声明状态更新的操作方法有哪些,具体实现由子类完成。

- 具体状态类（StateA 等）：实现抽象状态类定义的方法，根据具体的场景来指定对应状态改变后的代码实现逻辑。

### 6.5.3 状态模式实现

代码示例

```java
/**
 * 抽象状态接口
 * @author spikeCong
 * @date 2022/10/17
 **/
public interface State {

    //声明抽象方法,不同具体状态类可以有不同实现
    void handle(Context context);
}

/**
 * 上下文类
 * @author spikeCong
 * @date 2022/10/17
 **/
public class Context {

    private State currentState; //维持一个对状态对象的引用

    public Context() {
        this.currentState = null;
    }

    public State getCurrentState() {
        return currentState;
    }

    public void setCurrentState(State currentState) {
        this.currentState = currentState;
    }

    @Override
    public String toString() {
        return "Context{" +
                "currentState=" + currentState +
                '}';
    }
}

public class ConcreteStateA implements State {

    @Override
    public void handle(Context context) {
        System.out.println("进入状态模式A......");
        context.setCurrentState(this);
    }

    @Override
    public String toString() {
        return "当前状态: ConcreteStateA";
    }
}

public class ConcreteStateB implements State{

    @Override
    public void handle(Context context) {
        System.out.println("进入状态模式B......");
        context.setCurrentState(this);
    }

    @Override
    public String toString() {
        return "当前状态: ConcreteStateB";
    }
}


public class Client {

    public static void main(String[] args) {

        Context context = new Context();

        State state1 = new ConcreteStateA();
        state1.handle(context);
        System.out.println(context.getCurrentState().toString());

        System.out.println("========================");

        State state2 = new ConcreteStateB();
        state2.handle(context);
        System.out.println(context.getCurrentState().toString());
    }
}
```

### 6.5.4 状态模式应用实例

模拟交通信号灯的状态转换. 交通信号灯一般包括了红、黄、绿3种颜色状态,不同状态之间的切换逻辑为: 红灯只能切换为黄灯,黄灯可以切换为绿灯或红灯,绿灯只能切换为黄灯.

​                                                              <img src=".\img\119.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

**1) 不使用设计模式** 

```java
/**
 * 交通灯类
 *    红灯(禁行) ,黄灯(警示),绿灯(通行) 三种状态.
 * @author spikeCong
 * @date 2022/10/17
 **/
public class TrafficLight {

    //初始状态红灯
    private String state = "红";

    //切换为绿灯(通行)状态
    public void switchToGreen(){

        if("绿".equals(state)){//当前是绿灯
            System.out.println("当前为绿灯状态,无需切换!");
        }else if("红".equals(state)){
            System.out.println("红灯不能切换为绿灯!");
        }else if("黄".equals(state)){
            state = "绿";
            System.out.println("绿灯亮起...时长: 60秒");
        }
    }

    //切换为黄灯(警示)状态
    public void switchToYellow(){

        if("黄".equals(state)){//当前是黄灯
            System.out.println("当前为黄灯状态,无需切换!");
        }else if("红".equals(state) || "绿".equals(state)){
            state = "黄";
            System.out.println("黄灯亮起...时长:10秒");
        }
    }

    //切换为黄灯(警示)状态
    public void switchToRed(){

        if("红".equals(state)){//当前是绿灯
            System.out.println("当前为红灯状态,无需切换!");
        }else if("绿".equals(state)){
            System.out.println("绿灯不能切换为红灯!");
        }else if("黄".equals(state)){
            state = "红";
            System.out.println("红灯亮起...时长: 90秒");
        }
    }
}
```

问题: 状态切换的操作全部在一个类中,如果有很多的交通灯进行联动,这个程序的逻辑就会变得非常复杂,难以维护.

**2) 使用状态模式,将交通灯的切换逻辑组织起来,把跟状态有关的内容从交通灯类里抽离出来,使用类来表示不同的状态.**

```java
/**
 * 交通灯类
 *    红灯(禁行) ,黄灯(警示),绿灯(通行) 三种状态.
 * @author spikeCong
 * @date 2022/10/17
 **/
public class TrafficLight {

    //初始状态红灯
    State state = new Red();

    public void setState(State state) {
        this.state = state;
    }

    //切换为绿灯状态
    public void switchToGreen(){
        state.switchToGreen(this);
    }

    //切换为黄灯状态
    public void switchToYellow(){
        state.switchToYellow(this);
    }

    //切换为红灯状态
    public void switchToRed(){
        state.switchToRed(this);
    }
}

/**
 * 交通灯状态接口
 * @author spikeCong
 * @date 2022/10/17
 **/
public interface State {

    void switchToGreen(TrafficLight trafficLight); //切换为绿灯

    void switchToYellow(TrafficLight trafficLight); //切换为黄灯

    void switchToRed(TrafficLight trafficLight); //切换为红灯
}

/**
 * 红灯状态类
 * @author spikeCong
 * @date 2022/10/17
 **/
public class Red implements State {

    @Override
    public void switchToGreen(TrafficLight trafficLight) {
        System.out.println("红灯不能切换为绿灯!");
    }

    @Override
    public void switchToYellow(TrafficLight trafficLight) {
        System.out.println("黄灯亮起...时长:10秒!");
    }

    @Override
    public void switchToRed(TrafficLight trafficLight) {
        System.out.println("已是红灯状态无须再切换!");
    }
}

/**
 * 绿灯状态类
 * @author spikeCong
 * @date 2022/10/17
 **/
public class Green implements State {

    @Override
    public void switchToGreen(TrafficLight trafficLight) {
        System.out.println("已是绿灯无须切换!");
    }

    @Override
    public void switchToYellow(TrafficLight trafficLight) {
        System.out.println("黄灯亮起...时长:10秒!");
    }

    @Override
    public void switchToRed(TrafficLight trafficLight) {
        System.out.println("绿灯不能切换为红灯!");
    }
}

/**
 * 黄灯状态类
 * @author spikeCong
 * @date 2022/10/17
 **/
public class Yellow implements State {

    @Override
    public void switchToGreen(TrafficLight trafficLight) {
        System.out.println("绿灯亮起...时长:60秒!");
    }

    @Override
    public void switchToYellow(TrafficLight trafficLight) {
        System.out.println("已是黄灯无须切换!");
    }

    @Override
    public void switchToRed(TrafficLight trafficLight) {
        System.out.println("红灯亮起...时长:90秒!");
    }
}

public class Client {

    public static void main(String[] args) {
        TrafficLight trafficLight = new TrafficLight();
        trafficLight.switchToYellow();
        trafficLight.switchToGreen();
        trafficLight.switchToRed();
    }
}
```

通过代码重构,将"状态" 接口化、模块化,最终将它们从臃肿的交通类中抽了出来, 消除了原来TrafficLight类中的if...else,代码看起来干净而优雅.

### 6.5.5 状态模式总结

**1) 状态模式的优点：**

* 将所有与某个状态有关的行为放到一个类中，并且可以方便地增加新的状态，只需要改变对象状态即可改变对象的行为。
* 允许状态转换逻辑与状态对象合成一体，而不是某一个巨大的条件语句块。

**2) 状态模式的缺点:**

* 状态模式的使用必然会增加系统类和对象的个数。 
* 状态模式的结构与实现都较为复杂，如果使用不当将导致程序结构和代码的混乱。
* 状态模式对"开闭原则"的支持并不太好 (添加新的状态类需要修改那些负责状态转换的源代码)。

**3) 状态模式常见的使用场景:**

- 对象根据自身状态的变化来进行不同行为的操作时， 比如，购物订单状态。
- 对象需要根据自身变量的当前值改变行为，不期望使用大量 if-else 语句时， 比如，商品库存状态。
- 对于某些确定的状态和行为，不想使用重复代码时， 比如，某一个会员当天的购物浏览记录。



## 6.6 迭代器模式

### 6.6.1 迭代器模式介绍

迭代器模式是我们学习一个设计时很少用到的、但编码实现时却经常使用到的行为型设计模式。在绝大多数编程语言中，迭代器已经成为一个基础的类库，直接用来遍历集合对象。在平时开发中，我们更多的是直接使用它，很少会从零去实现一个迭代器。

**迭代器模式(Iterator pattern)又叫游标（Cursor）模式，它的原始定义是：迭代器提供一种对容器对象中的各个元素进行访问的方法，而又不需要暴露该对象的内部细节。**

<img src=".\img\120.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

在软件系统中,容器对象拥有两个职责: 一是存储数据,而是遍历数据.从依赖性上看,前者是聚合对象的基本职责.而后者是可变化的,又是可分离的.因此可以将遍历数据的行为从容器中抽取出来,封装到迭代器对象中,由迭代器来提供遍历数据的行为,这将简化聚合对象的设计,更加符合单一职责原则

### 6.6.2 迭代器模式原理

**迭代器模式结构图**

<img src=".\img\121.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

迭代器模式主要包含以下角色：

* 抽象集合（Aggregate）角色：用于存储和管理元素对象, 定义存储、添加、删除集合元素的功能,并且声明了一个createIterator()方法用于创建迭代器对象。
* 具体集合（ConcreteAggregate）角色：实现抽象集合类，返回一个具体迭代器的实例。
* 抽象迭代器（Iterator）角色：定义访问和遍历聚合元素的接口，通常包含 hasNext()、next() 等方法。
  * hasNext()函数用于判断集合中是否还有下一个元素
  * next() 函数用于将游标后移一位元素
  * currentItem() 函数,用来返回当前游标指向的元素
* 具体迭代器（Concretelterator）角色：实现抽象迭代器接口中所定义的方法，完成对集合对象的遍历，同时记录遍历的当前位置。

### 6.6.3 迭代器模式实现

```java
/**
 * 迭代器接口
 * @author spikeCong
 * @date 2022/10/18
 **/
public interface Iterator<E> {

    //判断集合中是否有下一个元素
    boolean hasNext();

    //将游标后移一位元素
    void next();

    //返回当前游标指定的元素
    E currentItem();
}

/**
 * 具体迭代器
 * @author spikeCong
 * @date 2022/10/18
 **/
public class ConcreteIterator<E> implements Iterator<E>{

    private int cursor; //游标

    private ArrayList<E> arrayList; //容器

    public ConcreteIterator(ArrayList<E> arrayList) {
        this.cursor = 0;
        this.arrayList = arrayList;
    }

    @Override
    public boolean hasNext() {
        return cursor != arrayList.size();
    }

    @Override
    public void next() {
        cursor++;
    }

    @Override
    public E currentItem() {
        if(cursor >= arrayList.size()){
            throw new NoSuchElementException();
        }
        return arrayList.get(cursor);
    }
}

public class Test01 {


    public static void main(String[] args) {

        ArrayList<String> names = new ArrayList<>();
        names.add("lisi");
        names.add("zhangsan");
        names.add("wangwu");

        Iterator<String> iterator = new ConcreteIterator(names);
        while(iterator.hasNext()){
            System.out.println(iterator.currentItem());
            iterator.next();
        }

        /**
         * 使用ArrayList集合中的iterator()方法获取迭代器
         * 将创建迭代器的方法放入集合容器中,这样做的好处是对客户端封装了迭代器的实现细节.
         */
        java.util.Iterator<String> iterator1 = names.iterator();
        while(iterator1.hasNext()){
            System.out.println(iterator1.next());
            iterator.next();
        }
    }
}
```

### 6.6.4 迭代器模式应用实例

为了帮助你更好地理解迭代器模式，下面我们还是通过一个简单的例子给大家演示一下

```java
/**
 * 抽象迭代器 IteratorIterator
 * @author spikeCong
 * @date 2022/10/18
 **/
public interface IteratorIterator<E> {

    void reset();   //重置为第一个元素
    E next();   //获取下一个元素
    E currentItem();    //检索当前元素
    boolean hasNext();  //判断是否还有下一个元素存在
}


/**
 * 抽象集合 ListList
 * @author spikeCong
 * @date 2022/10/18
 **/
public interface ListList<E> {

    //获取迭代器对象的抽象方法(面向接口编程)
    IteratorIterator<E> Iterator();
}

/**
 * 主题类
 * @author spikeCong
 * @date 2022/10/18
 **/
public class Topic {

    private String name;

    public Topic(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

/**
 * 具体迭代器
 * @author spikeCong
 * @date 2022/10/18
 **/
public class TopicIterator implements IteratorIterator<Topic> {

    //Topic数组
    private Topic[] topics;

    //记录存储位置
    private int position;

    public TopicIterator(Topic[] topics) {
        this.topics = topics;
        position = 0;
    }

    @Override
    public void reset() {
        position = 0;
    }

    @Override
    public Topic next() {
        return topics[position++];
    }

    @Override
    public Topic currentItem() {
        return topics[position];
    }

    @Override
    public boolean hasNext() {
        if(position >= topics.length){
            return false;
        }
        return true;
    }
}

/**
 * 具体集合类
 * @author spikeCong
 * @date 2022/10/18
 **/
public class TopicList implements ListList<Topic> {

    private Topic[] topics;

    public TopicList(Topic[] topics) {
        this.topics = topics;
    }

    @Override
    public IteratorIterator<Topic> Iterator() {
        return new TopicIterator(topics);
    }
}

public class Client {

    public static void main(String[] args) {

        Topic[] topics = new Topic[4];
        topics[0] = new Topic("topic1");
        topics[1] = new Topic("topic2");
        topics[2] = new Topic("topic3");
        topics[3] = new Topic("topic4");

        TopicList topicList = new TopicList(topics);
        IteratorIterator<Topic> iterator = topicList.Iterator();

        while(iterator.hasNext()){
            Topic t = iterator.next();
            System.out.println(t.getName());
        }
    }
}
```

### 6.6.5 迭代器模式总结

**1) 迭代器的优点:**

* 迭代器模式支持以不同方式遍历一个集合对象,在同一个集合对象上可以定义多种遍历方式. 在迭代器模式中只需要用一个不同的迭代器来替换原有的迭代器,即可改变遍历算法,也可以自己定义迭代器的子类以支持新的遍历方式.
* 迭代器简化了集合类。由于引入了迭代器，在原有的集合对象中不需要再自行提供数据遍历等方法，这样可以简化集合类的设计。
* 在迭代器模式中，由于引入了抽象层，增加新的集合类和迭代器类都很方便，无须修改原有代码，满足 "基于接口编程而非实现" 和 "开闭原则" 的要求。

**2) 迭代器的缺点：**

- 由于迭代器模式将存储数据和遍历数据的职责分离,增加了类的个数，这在一定程度上增加了系统的复杂性。
- 抽象迭代器的设计难度较大,需要充分考虑到系统将来的扩展.`

**3) 使用场景**

* 减少程序中重复的遍历代码

  > 对于放入一个集合容器中的多个对象来说，访问必然涉及遍历算法。如果我们不将遍历算法封装到容器里（比如，List、Set、Map 等），那么就需要使用容器的人自行去实现遍历算法，这样容易造成很多重复的循环和条件判断语句出现，不利于代码的复用和扩展，同时还会暴露不同容器的内部结构。而使用迭代器模式是将遍历算法作为容器对象自身的一种“属性方法”来使用，能够有效地避免写很多重复的代码，同时又不会暴露内部结构。

* 当需要为遍历不同的集合结构提供一个统一的接口时或者当访问一个集合对象的内容而无须暴露其内部细节的表示时。

  > 迭代器模式把对不同集合类的访问逻辑抽象出来，这样在不用暴露集合内部结构的情况下，可以隐藏不同集合遍历需要使用的算法，同时还能够对外提供更为简便的访问算法接口。

## 6.7 访问者模式

### 6.7.1 访问者模式介绍

访问者模式在实际开发中使用的非常少,因为它比较难以实现并且应用该模式肯能会导致代码的可读性变差,可维护性变差,在没有特别必要的情况下,不建议使用访问者模式.

**访问者模式(Visitor Pattern) 的原始定义是：允许在运行时将一个或多个操作应用于一组对象，将操作与对象结构分离。**

这个定义会比较抽象，但是我们依然能看出两个关键点：

- 一个是: 运行时使用一组对象的一个或多个操作，比如，对不同类型的文件（.pdf、.xml、.properties）进行扫描；

- 另一个是: 分离对象的操作和对象本身的结构，比如，扫描多个文件夹下的多个文件，对于文件来说，扫描是额外的业务操作，如果在每个文件对象上都加一个扫描操作，太过于冗余，而扫描操作具有统一性，非常适合访问者模式。

访问者模式主要解决的是数据与算法的耦合问题, 尤其是在数据结构比较稳定,而算法多变的情况下.为了不污染数据本身,访问者会将多种算法独立归档,并在访问数据时根据数据类型自动切换到对应的算法,实现数据的自动响应机制,并确保算法的自由扩展.

### 6.7.2 访问者模式原理

<img src=".\img\122.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

访问者模式包含以下主要角色:

* 抽象访问者（Visitor）角色：可以是接口或者抽象类,定义了一系列操作方法,用来处理所有数据元素,通常为同名的访问方法,并以数据元素类作为入参来确定那个重载方法被调用.
* 具体访问者（ConcreteVisitor）角色：访问者接口的实现类,可以有多个实现,每个访问者都需要实现所有数据元素类型的访问重载方法.
* 抽象元素（Element）角色：被访问的数据元素接口,定义了一个接受访问者的方法（`accept`），其意义是指，每一个元素都要可以被访问者访问。
* 具体元素（ConcreteElement）角色： 具体数据元素实现类,提供接受访问方法的具体实现，而这个具体的实现，通常情况下是使用访问者提供的访问该元素类的方法,其accept实现方法中调用访问者并将自己 "this" 传回。
* 对象结构（Object Structure）角色：包含所有可能被访问的数据对象的容器,可以提供数据对象的迭代功能,可以是任意类型的数据结构.
* 客户端 ( Client ) : 使用容器并初始化其中各类数据元素,并选择合适的访问者处理容器中的所有数据对象.

### 6.7.3 访问者模式实现

我们以超市购物为例,假设超市中的三类商品: 水果,糖果,酒水进行售卖. 我们可以忽略每种商品的计价方法,因为最终结账时由收银员统一集中处理,在商品类中添加计价方法是不合理的设计.我们先来定义糖果类和酒类、水果类.

```java
/**
 * 抽象商品父类
 * @author spikeCong
 * @date 2022/10/18
 **/
public abstract class Product {

    private String name;  //商品名
    private LocalDate producedDate;  // 生产日期
    private double price;  //单品价格

    public Product(String name, LocalDate producedDate, double price) {
        this.name = name;
        this.producedDate = producedDate;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getProducedDate() {
        return producedDate;
    }

    public void setProducedDate(LocalDate producedDate) {
        this.producedDate = producedDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}

/**
 * 糖果类
 * @author spikeCong
 * @date 2022/10/18
 **/
public class Candy extends Product{
    public Candy(String name, LocalDate producedDate, double price) {
        super(name, producedDate, price);
    }
}

/**
 * 酒水类
 * @author spikeCong
 * @date 2022/10/18
 **/
public class Wine extends Product{

    public Wine(String name, LocalDate producedDate, double price) {
        super(name, producedDate, price);
    }
}

/**
 * 水果类
 * @author spikeCong
 * @date 2022/10/18
 **/
public class Fruit extends Product{
    
    //重量
    private float weight;

    public Fruit(String name, LocalDate producedDate, double price, float weight) {
        super(name, producedDate, price);
        this.weight = weight;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }
}
```

**访问者接口**

- 收银员就类似于访问者,访问用户选择的商品,我们假设根据生产日期进行打折,过期商品不能够出售. 注意这种计价策略不适用于酒类,作为收银员要对不同商品应用不同的计价方法.

```java
/**
 * 访问者接口-根据入参不同调用对应的重载方法
 * @author spikeCong
 * @date 2022/10/18
 **/
public interface Visitor {

    public void visit(Candy candy);  //糖果重载方法
    
    public void visit(Wine wine);  //酒类重载方法
    
    public void visit(Fruit fruit);  //水果重载方法
}
```

**具体访问者**

- 创建计价业务类,对三类商品进行折扣计价,折扣计价访问者的三个重载方法分别实现了3类商品的计价方法,体现了visit() 方法的多态性.

```java
/**
 * 折扣计价访问者类
 * @author spikeCong
 * @date 2022/10/18
 **/
public class DiscountVisitor implements Visitor {

    private LocalDate billDate;

    public DiscountVisitor(LocalDate billDate) {
        this.billDate = billDate;
        System.out.println("结算日期: " + billDate);
    }

    @Override
    public void visit(Candy candy) {
        System.out.println("糖果: " + candy.getName());

        //获取产品生产天数
        long days = billDate.toEpochDay() - candy.getProducedDate().toEpochDay();

        if(days > 180){
            System.out.println("超过半年的糖果,请勿食用!");
        }else{
            double rate = 0.9;
            double discountPrice = candy.getPrice() * rate;
            System.out.println("糖果打折后的价格"+NumberFormat.getCurrencyInstance().format(discountPrice));
        }
    }

    @Override
    public void visit(Wine wine) {
        System.out.println("酒类: " + wine.getName()+",无折扣价格!");
        System.out.println("原价: "+NumberFormat.getCurrencyInstance().format(wine.getPrice()));
    }

    @Override
    public void visit(Fruit fruit) {
        System.out.println("水果: " + fruit.getName());
        //获取产品生产天数
        long days = billDate.toEpochDay() - fruit.getProducedDate().toEpochDay();

        double rate = 0;

        if(days > 7){
            System.out.println("超过七天的水果,请勿食用!");
        }else if(days > 3){
            rate = 0.5;
        }else{
            rate = 1;
        }

        double discountPrice = fruit.getPrice() * fruit.getWeight() * rate;
        System.out.println("水果价格: "+NumberFormat.getCurrencyInstance().format(discountPrice));
    }

    public static void main(String[] args) {

        LocalDate billDate = LocalDate.now();

        Candy candy = new Candy("徐福记",LocalDate.of(2022,10,1),10.0);
        System.out.println("糖果: " + candy.getName());

        double rate = 0.0;

        long days = billDate.toEpochDay() - candy.getProducedDate().toEpochDay();
        System.out.println(days);

        if(days > 180){
            System.out.println("超过半年的糖果,请勿食用!");
        }else{
            rate = 0.9;
            double discountPrice = candy.getPrice() * rate;
            System.out.println("打折后的价格"+NumberFormat.getCurrencyInstance().format(discountPrice));
        }
    }
}
```

**客户端**

```java
public class Client {

    public static void main(String[] args) {

        //德芙巧克力,生产日期2002-5-1 ,原价 10元
        Candy candy = new Candy("德芙巧克力",LocalDate.of(2022,5,1),10.0);

        Visitor visitor = new DiscountVisitor(LocalDate.of(2022,10,11));
        visitor.visit(candy);
    }
}
```

上面的代码虽然可以完成当前的需求,但是设想一下这样一个场景: 由于访问者的重载方法只能对当个的具体商品进行计价,如果顾客选择了多件商品来结账时,就可能会引起重载方法的派发问题(到底该由谁来计算的问题).

首先我们定义一个接待访问者的类 Acceptable,其中定义了一个accept(Visitor visitor)方法, 只要是visitor的子类都可以接收.

```java
/**
 * 接待者接口(抽象元素角色)
 * @author spikeCong
 * @date 2022/10/18
 **/
public interface Acceptable {

    //接收所有的Visitor访问者的子类实现类
    public void accept(Visitor visitor);
}

/**
 * 糖果类
 * @author spikeCong
 * @date 2022/10/18
 **/
public class Candy extends Product implements Acceptable{
    public Candy(String name, LocalDate producedDate, double price) {
        super(name, producedDate, price);
    }

    @Override
    public void accept(Visitor visitor) {
        //accept实现方法中调用访问者并将自己 "this" 传回。this是一个明确的身份,不存在任何泛型
        visitor.visit(this);
    }
}

//酒水与水果类同样实现Acceptable接口,重写accept方法
```

测试

```java
public class Client {

    public static void main(String[] args) {

//        //德芙巧克力,生产日期2002-5-1 ,原价 10元
////        Candy candy = new Candy("德芙巧克力",LocalDate.of(2022,5,1),10.0);
////
////        Visitor visitor = new DiscountVisitor(LocalDate.of(2022,10,11));
////        visitor.visit(candy);

        //模拟添加多个商品的操作
        List<Acceptable> products = Arrays.asList(
                new Candy("金丝猴奶糖",LocalDate.of(2022,6,10),10.00),
                new Wine("衡水老白干",LocalDate.of(2020,6,10),100.00),
                new Fruit("草莓",LocalDate.of(2022,10,12),50.00,1)
        );

        Visitor visitor = new DiscountVisitor(LocalDate.of(2022,10,17));
        for (Acceptable product : products) {
            product.accept(visitor);
        }
    }
}
```

**代码编写到此出,就可以应对计价方式或者业务逻辑的变化了,访问者模式成功地将数据资源（需实现接待者接口）与数据算法 （需实现访问者接口）分离开来。重载方法的使用让多样化的算法自成体系，多态化的访问者接口保证了系统算法的可扩展性，数据则保持相对固定，最终形成⼀个算法类对应⼀套数据。**

### 6.7.4 访问者模式总结

**1) 访问者模式优点：**

* 扩展性好

  在不修改对象结构中的元素的情况下，为对象结构中的元素添加新的功能。

* 复用性好

  通过访问者来定义整个对象结构通用的功能，从而提高复用程度。

* 分离无关行为

  通过访问者来分离无关的行为，把相关的行为封装在一起，构成一个访问者，这样每一个访问者的功能都比较单一。

**2) 访问者模式缺点：** 

* 对象结构变化很困难

  在访问者模式中，每增加一个新的元素类，都要在每一个具体访问者类中增加相应的具体操作，这违背了“开闭原则”。

* 违反了依赖倒置原则

  访问者模式依赖了具体类，而没有依赖抽象类。

**3) 使用场景**

* 当对象的数据结构相对稳定，而操作却经常变化的时候。 比如，上面例子中路由器本身的内部构造（也就是数据结构）不会怎么变化，但是在不同操作系统下的操作可能会经常变化，比如，发送数据、接收数据等。
* 需要将数据结构与不常用的操作进行分离的时候。 比如，扫描文件内容这个动作通常不是文件常用的操作，但是对于文件夹和文件来说，和数据结构本身没有太大关系（树形结构的遍历操作），扫描是一个额外的动作，如果给每个文件都添加一个扫描操作会太过于重复，这时采用访问者模式是非常合适的，能够很好分离文件自身的遍历操作和外部的扫描操作。

* 需要在运行时动态决定使用哪些对象和方法的时候。 比如，对于监控系统来说，很多时候需要监控运行时的程序状态，但大多数时候又无法预知对象编译时的状态和参数，这时使用访问者模式就可以动态增加监控行为。

## 6.8 备忘录模式

### 6.8.1 备忘录模式介绍

备忘录模式提供了一种对象状态的撤销实现机制,当系统中某一个对象需要恢复到某一历史状态时可以使用备忘录模式进行设计.

​									<img src=".\img\123.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

> 很多软件都提供了撤销（Undo）操作，如 Word、记事本、Photoshop、IDEA等软件在编辑时按 Ctrl+Z 组合键时能撤销当前操作，使文档恢复到之前的状态；还有在 浏览器 中的后退键、数据库事务管理中的回滚操作、玩游戏时的中间结果存档功能、数据库与操作系统的备份操作、棋类游戏中的悔棋功能等都属于这类。

**备忘录模式(memento pattern)定义: 在不破坏封装的前提下,捕获一个对象的内部状态,并在该对象之外保存这个状态,这样可以在以后将对象恢复到原先保存的状态.**

### 6.8.2 备忘录模式原理

<img src=".\img\125.jpg" alt="image-20220530160637842" style="zoom: 50%;" />  

备忘录模式的主要角色如下：

* 发起人（Originator）角色：状态需要被记录的元对象类, 记录当前时刻的内部状态信息，提供创建备忘录和恢复备忘录数据的功能，实现其他业务功能，它可以访问备忘录里的所有信息。
* 备忘录（Memento）角色：负责存储发起人的内部状态，在需要的时候提供这些内部状态给发起人。
* 看护人（Caretaker）角色：对备忘录进行管理，提供保存与获取备忘录的功能，但其不能对备忘录的内容进行访问与修改。

### 6.8.3 备忘录模式实现

下面我们再来看看 UML 对应的代码实现。首先，我们创建原始对象 Originator，对象中有四个属性，分别是 state 用于显示当前对象状态，id、name、phone 用来模拟业务属性，并添加 get、set 方法、create() 方法用于创建备份对象，restore(memento) 用于恢复对象状态。

```java
/**
 * 发起人类
 * @author spikeCong
 * @date 2022/10/19
 **/
public class Originator {

    private String state = "原始对象";
    private String id;
    private String name;
    private String phone;

    public Originator() {
    }

    //创建备忘录对象
    public Memento create(){
        return new Memento(id,name,phone);
    }

    //恢复对象状态
    public void restore(Memento m){
        this.state = m.getState();
        this.id = m.getId();
        this.name = m.getName();
        this.phone = m.getPhone();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Originator{" +
                "state='" + state + '\'' +
                ", id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}

/**
 * 备忘录对象
 *     访问权限为: 默认,也就是同包下可见(保证只有发起者类可以访问备忘录类)
 * @author spikeCong
 * @date 2022/10/19
 **/
class Memento {

    private String state = "从备份对象恢复为原始对象";
    private String id;
    private String name;
    private String phone;

    public Memento() {
    }

    public Memento(String id, String name, String phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }

	//get、set、toString......
}

/**
 * 负责人类-保存备忘录对象
 * @author spikeCong
 * @date 2022/10/19
 **/
public class Caretaker {

    private Memento memento;

    public Memento getMemento() {
        return memento;
    }

    public void setMemento(Memento memento) {
        this.memento = memento;
    }
}

public class Client {

    public static void main(String[] args) {
        //创建发起人对象
        Originator originator = new Originator();
        originator.setId("1");
        originator.setName("spike");
        originator.setPhone("13512341234");
        System.out.println("=============" + originator);

        //创建负责人对象,并保存备忘录对象
        Caretaker caretaker = new Caretaker();
        caretaker.setMemento(originator.create());

        //修改
        originator.setName("update");
        System.out.println("=============" + originator);

        //从负责人对象中获取备忘录对象,实现撤销
        originator.restore(caretaker.getMemento());
        System.out.println("=============" + originator);
    }
}
```

### 6.8.4 备忘录模式应用实例

设计一个收集水果和获取金钱数的掷骰子游戏,游戏规则如下

1. 游戏玩家通过扔骰子来决定下一个状态
2. 当点数为1,玩家金钱增加
3. 当点数为2,玩家金钱减少
4. 当点数为6,玩家会得到水果
5. 当钱消耗到一定程度,就恢复到初始状态



- Memento类: 表示玩家的状态

```java
/**
 * Memento 表示状态
 * @author spikeCong
 * @date 2022/10/19
 **/
public class Memento {

    int money;    //所持金钱
    ArrayList fruits; //获得的水果

    //构造函数
    Memento(int money) {
        this.money = money;
        this.fruits = new ArrayList();
    }

    //获取当前玩家所有的金钱
    int getMoney() {
        return money;
    }

    //获取当前玩家所有的水果
    List getFruits() {
        return (List)fruits.clone();
    }

    //添加水果
    void addFruit(String fruit){
        fruits.add(fruit);
    }
}
```

- Player玩家类,只要玩家的金币还够,就会一直进行游戏,在该类中会设置一个createMemento方法,其作用是保存当前玩家状态.还会包含一个restore撤销方法,相当于复活操作.

```java
package com.mashibing.memento.example02;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @author spikeCong
 * @date 2022/10/19
 **/
public class Player {

    private int money;      //所持金钱
    private List<String> fruits = new ArrayList();  //获得的水果
    private Random random = new Random();   //随机数对象
    private static String[] fruitsName={    //表示水果种类的数组
      "苹果","葡萄","香蕉","橘子"
    };

    //构造方法
    public Player(int money) {
        this.money = money;
    }

    //获取当前所持有的金钱
    public int getMoney() {
        return money;
    }

    //获取一个水果
    public String getFruit() {
        String prefix = "";
        if (random.nextBoolean()) {
            prefix = "好吃的";
        }

        //从数组中获取水果
        String f = fruitsName[random.nextInt(fruitsName.length)];
        return prefix + f;
    }

    //掷骰子游戏
    public void yacht(){

        int dice = random.nextInt(6) + 1;   //掷骰子
        if(dice == 1){
            money += 100;
            System.out.println("所持有的金钱增加了..");
        }else if(dice == 2){
            money /= 2;
            System.out.println("所持有的金钱减半..");
        }else if(dice == 6){   //获取水果
            String fruit = getFruit();
            System.out.println("获得了水果: " + fruit);
            fruits.add(fruit);
        }else{
            //骰子结果为3、4、5
            System.out.println("无效数字,继续投掷");
        }
    }

    //拍摄快照
    public Memento createMemento(){
        Memento memento = new Memento(money);
        for (String fruit : fruits) {
            if(fruit.startsWith("好吃的")){
                memento.addFruit(fruit);
            }
        }

        return memento;
    }

    //撤销方法
    public void restore(Memento memento){
        this.money = memento.money;
        this.fruits = memento.getFruits();
    }

    @Override
    public String toString() {
        return "Player{" +
                "money=" + money +
                ", fruits=" + fruits +
                '}';
    }
}
```

- 测试: 由于引入了备忘录模式,可以保存某个时间点的玩家状态,这样就可以对玩家进行复活操作.

```java
public class MainApp {

    public static void main(String[] args) throws InterruptedException {

        Player player = new Player(100);        //最初所持的金钱数
        Memento memento = player.createMemento();       //保存最初状态

        for (int i = 0; i < 100; i++) {
            //显示扔骰子的次数
            System.out.println("=====" + i);

            //显示当前状态
            System.out.println("当前状态: " + player);

            //开启游戏
            player.yacht();
            System.out.println("所持有的金钱为: " + player.getMoney() + " 元");

            //决定如何操作Memento
            if(player.getMoney() > memento.getMoney()){
                System.out.println("赚到金币,保存当前状态,继续游戏!");
                memento = player.createMemento();
            }else if(player.getMoney() < memento.getMoney() / 2){
                System.out.println("所持金币不多了,将游戏恢复到初始状态!");
                player.restore(memento);
            }

            Thread.sleep(1000);
            System.out.println("");
        }

    }
}
```



### 6.8.5 备忘录模式总结

**1 ) 备忘录模式的优点**

1. 提供了一种状态恢复的实现机制,使得用户可以方便的回到一个特定的历史步骤,当新的状态无效或者存在问题的时候,可以使用暂时存储起来的备忘录将状态复原.
2. 备忘录实现了对信息的封装,一个备忘录对象是一种发起者对象状态的表示,不会被其他代码所改动.备忘录保存了发起者的状态,采用集合来存储备忘录可以实现多次撤销的操作

**2 ) 备忘录模式的缺点** 

-  资源消耗过大,如果需要保存的发起者类的成员变量比较多, 就不可避免的需要占用大量的存储空间,每保存一次对象的状态,都需要消耗一定系统资源

**3) 备忘录模式使用场景**

1. 需要保存一个对象在某一时刻的状态时,可以使用备忘录模式.
2. 不希望外界直接访问对象内部状态时.

## 6.9 命令模式

### 6.9.1 命令模式介绍

**命令模式(command pattern)的定义: 命令模式将请求（命令）封装为一个对象，这样可以使用不同的请求参数化其他对象（将不 同请求依赖注入到其他对象），并且能够支持请求（命令）的排队执行、记录日志、撤销等 （附加控制）功能。**

命令模式的核心是将指令信息封装成一个对象,并将此对象作为参数发送给接收方去执行,达到使命令的请求与执行方解耦,双方只通过传递各种命令对象来完成任务.

在实际的开发中，如果你用到的编程语言并不支持用函数作为参数来传递，那么就可以借助命令模式将函数封装为对象来使用。

> 我们知道，C 语 言支持函数指针，我们可以把函数当作变量传递来传递去。但是，在大部分编程语言中，函 数没法儿作为参数传递给其他函数，也没法儿赋值给变量。借助命令模式，我们可以将函数 封装成对象。具体来说就是，设计一个包含这个函数的类，实例化一个对象传来传去，这样 就可以实现把函数像对象一样使用。

### 6.9.2 命令模式原理

<img src=".\img\126.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

命令模式包含以下主要角色：

* 抽象命令类（Command）角色： 定义命令的接口，声明执行的方法。
* 具体命令（Concrete  Command）角色：具体的命令，实现命令接口；通常会持有接收者，并调用接收者的功能来完成命令要执行的操作。
* 实现者/接收者（Receiver）角色： 接收者，真正执行命令的对象。任何类都可能成为一个接收者，只要它能够实现命令要求实现的相应功能。
* 调用者/请求者（Invoker）角色： 要求命令对象执行请求，通常会持有命令对象，可以持有很多的命令对象。这个是客户端真正触发命令并要求命令执行相应操作的地方，也就是说相当于使用命令对象的入口。

### 6.9.3 命令模式实现

模拟酒店后厨的出餐流程,来对命令模式进行一个演示,命令模式角色的角色与案例中角色的对应关系如下:

- 服务员: 即调用者角色,由她来发起命令.
- 厨师: 接收者,真正执行命令的对象.
- 订单: 命令中包含订单

```java
/**
 * 订单类
 * @author spikeCong
 * @date 2022/10/19
 **/
public class Order {

    private int diningTable;  //餐桌号码

    //存储菜名与份数
    private Map<String,Integer> foodMenu = new HashMap<>();

    public int getDiningTable() {
        return diningTable;
    }

    public void setDiningTable(int diningTable) {
        this.diningTable = diningTable;
    }

    public Map<String, Integer> getFoodMenu() {
        return foodMenu;
    }

    public void setFoodDic(Map<String, Integer> foodMenu) {
        this.foodMenu = foodMenu;
    }
}

/**
 * 厨师类 -> Receiver角色
 * @author spikeCong
 * @date 2022/10/19
 **/
public class Chef {

    public void makeFood(int num,String foodName){
        System.out.println(num + "份," + foodName);
    }
}


/**
 * 抽象命令接口
 * @author spikeCong
 * @date 2022/10/19
 **/
public interface Command {

    void execute(); //只需要定义一个统一的执行方法
}

/**
 * 具体命令
 * @author spikeCong
 * @date 2022/10/19
 **/
public class OrderCommand implements Command {

    //持有接收者对象
    private Chef receiver;

    private Order order;

    public OrderCommand(Chef receiver, Order order) {
        this.receiver = receiver;
        this.order = order;
    }

    @Override
    public void execute() {
        System.out.println(order.getDiningTable() + "桌的订单: ");
        Set<String> keys = order.getFoodMenu().keySet();
        for (String key : keys) {
            receiver.makeFood(order.getFoodMenu().get(key),key);
        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(order.getDiningTable() + "桌的菜已上齐.");
    }
}

/**
 * 服务员-> Invoker调用者
 * @author spikeCong
 * @date 2022/10/19
 **/
public class Waiter {

    //可以持有很多的命令对象
    private ArrayList<Command> commands;

    public Waiter() {
        commands = new ArrayList();
    }

    public Waiter(ArrayList<Command> commands) {
        this.commands = commands;
    }

    public void setCommands(Command command) {
        commands.add(command);
    }

    //发出命令 ,指挥厨师工作
    public void orderUp(){
        System.out.println("服务员: 叮咚,有新的订单,请厨师开始制作......");
        for (Command cmd : commands) {
            if(cmd != null){
                cmd.execute();
            }
        }
    }
}

public class Client {

    public static void main(String[] args) {

        Order order1 = new Order();
        order1.setDiningTable(1);
        order1.getFoodMenu().put("鲍鱼炒饭",1);
        order1.getFoodMenu().put("茅台迎宾",1);

        Order order2 = new Order();
        order2.setDiningTable(3);
        order2.getFoodMenu().put("海参炒面",1);
        order2.getFoodMenu().put("五粮液",1);

        //创建接收者
        Chef receiver = new Chef();

        //将订单和接收者封装成命令对象
        OrderCommand cmd1 = new OrderCommand(receiver,order1);
        OrderCommand cmd2 = new OrderCommand(receiver,order2);

        //创建调用者
        Waiter invoke = new Waiter();
        invoke.setCommands(cmd1);
        invoke.setCommands(cmd2);

        //将订单发送到后厨
        invoke.orderUp();
    }
}
```



### 6.9.4 命令模式总结

**1) 命令模式优点：**

* 降低系统的耦合度。命令模式能将调用操作的对象与实现该操作的对象解耦。
* 增加或删除命令非常方便。采用命令模式增加与删除命令不会影响其他类，它满足“开闭原则”，对扩展比较灵活。
* 可以实现宏命令。命令模式可以与组合模式结合，将多个命令装配成一个组合命令，即宏命令。

**2) 命令模式缺点：** 

* 使用命令模式可能会导致某些系统有过多的具体命令类。
* 系统结构更加复杂。

**3) 使用场景**

* 系统需要将请求调用者和请求接收者解耦，使得调用者和接收者不直接交互。
* 系统需要在不同的时间指定请求、将请求排队和执行请求。
* 系统需要支持命令的撤销(Undo)操作和恢复(Redo)操作。

## 7.0 解释器模式

### 7.0.1 解释器模式介绍

解释器模式使用频率不算高，通常用来描述如何构建一个简单“语言”的语法解释器。它只在一些非常特定的领域被用到，比如编译器、规则引擎、正则表达式、SQL 解析等。不过，了解它的实现原理同样很重要，能帮助你思考如何通过更简洁的规则来表示复杂的逻辑。

**解释器模式(Interpreter pattern)的原始定义是：用于定义语言的语法规则表示，并提供解释器来处理句子中的语法。**

我们通过一个例子给大家解释一下解释器模式

- 假设我们设计一个软件用来进行加减计算。我们第一想法就是使用工具类，提供对应的加法和减法的工具方法。

```java
//用于两个整数相加的方法
public static int add(int a , int  b){
    return a + b;
}

//用于三个整数相加的方法
public static int add(int a , int  b,int c){
    return a + b + c;
}

public static int add(Integer ... arr){
    int sum = 0;
    for(Integer num : arr){
        sum += num;
    }
    return sum;
}

+ - 
```

上面的形式比较单一、有限，如果形式变化非常多，这就不符合要求，因为加法和减法运算，两个运算符与数值可以有无限种组合方式。比如: 5-3+2-1, 10-5+20....

**文法规则和抽象语法树** 

解释器模式描述了如何为简单的语言定义一个文法,如何在该语言中表示一个句子,以及如何解释这些句子.

在上面提到的加法/减法解释器中,每一个输入表达式(比如:2+3+4-5) 都包含了3个语言单位,可以使用下面的文法规则定义:

文法是用于描述语言的语法结构的形式规则。

```
expression ::= value | plus | minus 
plus ::= expression ‘+’ expression   
minus ::= expression ‘-’ expression  
value ::= integer
```

> 注意： 这里的符号“::=”表示“定义为”的意思，竖线 | 表示或，左右的其中一个，引号内为字符本身，引号外为语法。

上面规则描述为 ：

表达式可以是一个值，也可以是plus或者minus运算，而plus和minus又是由表达式结合运算符构成，值的类型为整型数。

**抽象语法树：**

在解释器模式中还可以通过一种称为抽象语法树的图形方式来直观的表示语言的构成,每一棵抽象语法树对应一个语言实例,例如加法/减法表达式语言中的语句 " 1+ 2 + 3 - 4 + 1" 可以通过下面的抽象语法树表示

​														<img src=".\img\127.jpg" alt="image-20220530160637842" style="zoom: 50%;" />

### 7.02 解释器模式原理

<img src=".\img\128.jpg" alt="image-20220530160637842" style="zoom: 50%;" /> 

解释器模式包含以下主要角色。

* 抽象表达式（Abstract Expression）角色：定义解释器的接口，约定解释器的解释操作，主要包含解释方法 interpret()。
* 终结符表达式（Terminal  Expression）角色：是抽象表达式的子类，用来实现文法中与终结符相关的操作，文法中的每一个终结符都有一个具体终结表达式与之相对应。上例中的value 是终结符表达式.
* 非终结符表达式（Nonterminal Expression）角色：也是抽象表达式的子类，用来实现文法中与非终结符相关的操作，文法中的每条规则都对应于一个非终结符表达式。上例中的 plus , minus 都是非终结符表达式
* 环境（Context）角色：通常包含各个解释器需要的数据或是公共的功能，一般用来传递被所有解释器共享的数据，后面的解释器可以从这里获取这些值。
* 客户端（Client）：主要任务是将需要分析的句子或表达式转换成使用解释器对象描述的抽象语法树，然后调用解释器的解释方法，当然也可以通过环境角色间接访问解释器的解释方法。

### 7.0.3 解释器模式实现

为了更好的给大家解释一下解释器模式, 我们来定义了一个进行加减乘除计算的“语言”，语法规则如下：

- 运算符只包含加、减、乘、除，并且没有优先级的概念；
- 表达式中，先书写数字，后书写运算符，空格隔开；

我们举个例子来解释一下上面的语法规则:

- 比如`“ 9 5 7 3 - + * ”`这样一个表达式，我们按照上面的语法规则来处理，取出数字 `“9、5”` 和 `“-”` 运算符，计算得到 4，于是表达式就变成了`“ 4 7 3 + * ”`。然后，我们再取出`“4 7”`和“ + ”运算符，计算得到 11，表达式就变成了“ 11 3 * ”。最后，我们取出“ 11 3”和“ * ”运算符，最终得到的结果就是 33。

**代码示例:**  

- 用户按照上 面的规则书写表达式，传递给 interpret() 函数，就可以得到最终的计算结果。

```java
/**
 * 表达式解释器类
 * @author spikeCong
 * @date 2022/10/20
 **/
public class ExpressionInterpreter {

    //Deque双向队列，可以从队列的两端增加或者删除元素
   private Deque<Long>  numbers = new LinkedList<>();

   
   //接收表达式进行解析
   public long interpret(String expression){

       String[] elements = expression.split(" ");

       int length = elements.length;

       //获取表达式中的数字
       for (int i = 0; i < (length+1)/2; ++i) {
           //在 Deque的尾部添加元素
           numbers.addLast(Long.parseLong(elements[i]));
       }

       //获取表达式中的符号
       for (int i = (length+1)/2; i < length; ++i) {
           String operator = elements[i];
           //符号必须是 + - * / 否则抛出异常
           boolean isValid = "+".equals(operator) || "-".equals(operator)
                   || "*".equals(operator) || "/".equals(operator);
           if (!isValid) {
               throw new RuntimeException("Expression is invalid: " + expression);
           }

            //pollFirst()方法, 移除Deque中的第一个元素,并返回被移除的值
           long number1 = numbers.pollFirst(); //数字
           long number2 = numbers.pollFirst();

           long result = 0;  //运算结果

           //对number1和number2进行运算
           if (operator.equals("+")) {
               result = number1 + number2;
           } else if (operator.equals("-")) {
               result = number1 - number2;
           } else if (operator.equals("*")) {
               result = number1 * number2;
           } else if (operator.equals("/")) {
               result = number1 / number2;
           }

           //将运算结果添加到集合头部
           numbers.addFirst(result);
       }

       //运算完成numbers中应该保存着运算结果,否则是无效表达式
       if (numbers.size() != 1) {
           throw new RuntimeException("Expression is invalid: " + expression);
       }
       //移除Deque的第一个元素,并返回
       return numbers.pop();
   }
}
```

**代码重构**

上面代码的所有的解析逻辑都耦合在一个函数中，这样显然是不合适的。这 个时候，我们就要考虑拆分代码，将解析逻辑拆分到独立的小类中, 前面定义的语法规则有两类表达式，一类是数字，一类是运算符，运算符又包括加减乘除。 利用解释器模式，我们把解析的工作拆分到以下五个类:plu,sub,mul,div

- NumExpression
- PluExpression
- SubExpression
- MulExpression
- DivExpression 

```java
/**
 * 表达式接口
 * @author spikeCong
 * @date 2022/10/20
 **/
public interface Expression {

    long interpret();
}

/**
 * 数字表达式
 * @author spikeCong
 * @date 2022/10/20
 **/
public class NumExpression implements Expression {

    private long number;

    public NumExpression(long number) {
        this.number = number;
    }

    public NumExpression(String number) {
        this.number = Long.parseLong(number);
    }

    @Override
    public long interpret() {
        return this.number;
    }
}

/**
 * 加法运算
 * @author spikeCong
 * @date 2022/10/20
 **/
public class PluExpression implements Expression{

    private Expression exp1;
    private Expression exp2;

    public PluExpression(Expression exp1, Expression exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    @Override
    public long interpret() {
        return exp1.interpret() + exp2.interpret();
    }
}

/**
 * 减法运算
 * @author spikeCong
 * @date 2022/10/20
 **/
public class SubExpression implements Expression {

    private Expression exp1;
    private Expression exp2;

    public SubExpression(Expression exp1, Expression exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    @Override
    public long interpret() {
        return exp1.interpret() - exp2.interpret();
    }
}

/**
 * 乘法运算
 * @author spikeCong
 * @date 2022/10/20
 **/
public class MulExpression implements Expression {

    private Expression exp1;
    private Expression exp2;

    public MulExpression(Expression exp1, Expression exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    @Override
    public long interpret() {
        return exp1.interpret() * exp2.interpret();
    }
}

/**
 * 除法
 * @author spikeCong
 * @date 2022/10/20
 **/
public class DivExpression implements Expression {

    private Expression exp1;
    private Expression exp2;

    public DivExpression(Expression exp1, Expression exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    @Override
    public long interpret() {
        return exp1.interpret() / exp2.interpret();
    }
}

//测试
public class Test01 {

    public static void main(String[] args) {

        ExpressionInterpreter e = new ExpressionInterpreter();
        long result = e.interpret("6 2 3 2 4 / - + *");
        System.out.println(result);
    }
}
```



### 7.0.4 解释器模式总结

**1) 解释器优点**

- 易于改变和扩展文法

  因为在解释器模式中使用类来表示语言的文法规则的,因此就可以通过继承等机制改变或者扩展文法.每一个文法规则都可以表示为一个类,因此我们可以快速的实现一个迷你的语言

- 实现文法比较容易

  在抽象语法树中每一个表达式节点类的实现方式都是相似的,这些类的代码编写都不会特别复杂

- 增加新的解释表达式比较方便

  如果用户需要增加新的解释表达式,只需要对应增加一个新的表达式类就可以了.原有的表达式类不需要修改,符合开闭原则

**2) 解释器缺点**

- 对于复杂文法难以维护

  在解释器中一条规则至少要定义一个类,因此一个语言中如果有太多的文法规则,就会使类的个数急剧增加,当值系统的维护难以管理.

- 执行效率低

  在解释器模式中大量的使用了循环和递归调用,所有复杂的句子执行起来,整个过程也是非常的繁琐

**3) 使用场景**

- 当语言的文法比较简单,并且执行效率不是关键问题.
- 当问题重复出现,且可以用一种简单的语言来进行表达
- 当一个语言需要解释执行,并且语言中的句子可以表示为一个抽象的语法树的时候



## 7.1 中介者模式

### 7.1.1 中介者模式介绍

提到中介模式，有一个比较经典的例子就是航空管制。 为了让飞机在飞行的时候互不干扰，每架飞机都需要知道其他飞机每时每刻的位置，这就需要时刻跟其他飞机通信。飞机通信形成的通信网络就会无比复杂。这个时候，我们通过引 入“塔台”这样一个中介，让每架飞机只跟塔台来通信，发送自己的位置给塔台，由塔台来 负责每架飞机的航线调度。这样就大大简化了通信网络。

​													<img src=".\img\129.jpg" alt="image-20220530160637842" style="zoom: 50%;" />

**中介模式(mediator pattern)的定义: 定义一个单独的(中介)对象,来封装一组对象之间的交互,将这组对象之间的交互委派给予中介对象交互,来避免对象之间的交互.**

中介者对象就是用于处理对象与对象之间的直接交互，封装了多个对象之间的交互细节。中介模式的设计跟中间层很像,通过引入中介这个中间层,将一组对象之间的交互关系从多对多的网状关系转换为一对多的星状关系.原来一个对象要跟N个对象交互,现在只需要跟一个中介对象交互,从而最小化对象之间的交互关系,降低代码的复杂度,提高代码的可读性和可维护性.

### 7.1.2 中介者模式原理

<img src=".\img\132.jpg" alt="image-20220530160637842" style="zoom: 50%;" />  

中介者模式包含以下主要角色：

* 抽象中介者（Mediator）角色：它是中介者的接口，提供了同事对象注册与转发同事对象信息的抽象方法。

* 具体中介者（ConcreteMediator）角色：实现中介者接口，定义一个 List 来管理同事对象，协调各个同事角色之间的交互关系，因此它依赖于同事角色。
* 抽象同事类（Colleague）角色：定义同事类的接口，保存中介者对象，提供同事对象交互的抽象方法，实现所有相互影响的同事类的公共功能。
* 具体同事类（Concrete Colleague）角色：是抽象同事类的实现者，当需要与其他同事对象交互时，由中介者对象负责后续的交互。

### 7.1.3 中介者模式实现

代码示例

```java
/**
 * 抽象中介者
 * @author spikeCong
 * @date 2022/10/20
 **/
public interface Mediator {

    void apply(String key);
}

/**
 * 具体中介者
 * @author spikeCong
 * @date 2022/10/20
 **/
public class MediatorImpl implements Mediator {

    @Override
    public void apply(String key) {
        System.out.println("最终中介者执行操作,key为: " + key);
    }
}

/**
 * 抽象同事类
 * @author spikeCong
 * @date 2022/10/20
 **/
public abstract class Colleague {

    private Mediator mediator;

    public Colleague(Mediator mediator) {
        this.mediator = mediator;
    }

    public Mediator getMediator() {
        return mediator;
    }

    public abstract void exec(String key);
}

/**
 * 具体同事类
 * @author spikeCong
 * @date 2022/10/20
 **/
public class ConcreteColleagueA extends Colleague {

    public ConcreteColleagueA(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void exec(String key) {
        System.out.println("====在组件A中,通过中介者执行!");
        getMediator().apply(key);
    }
}

public class ConcreteColleagueB extends Colleague {

    public ConcreteColleagueB(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void exec(String key) {
        System.out.println("====在组件B中,通过中介者执行!");
        getMediator().apply(key);
    }
}

public class Client {

    public static void main(String[] args) {

        //创建中介者
        MediatorImpl mediator = new MediatorImpl();

        //创建同事对象
        Colleague c1 = new ConcreteColleagueA(mediator);
        c1.exec("key-A");
        Colleague c2 = new ConcreteColleagueB(mediator);
        c2.exec("key-B");
    }
}


====在组件A中,通过中介者执行!
最终中介者执行操作,key为: key-A
====在组件B中,通过中介者执行!
最终中介者执行操作,key为: key-B
```

### 7.1.4 中介者模式应用实例

【例】租房

现在租房基本都是通过房屋中介，房主将房屋托管给房屋中介，而租房者从房屋中介获取房屋信息。房屋中介充当租房者与房屋所有者之间的中介者。

```java
/**
 * 抽象中介者
 * @author spikeCong
 * @date 2022/10/20
 **/
public abstract class Mediator {

    //申明一个联络方法
    public abstract void contact(String message,Person person);
}

/**
 * 抽象同事类
 * @author spikeCong
 * @date 2022/10/20
 **/
public abstract class Person {

    protected String name;

    protected Mediator mediator;

    public Person(String name, Mediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }
}

/**
 * 中介机构
 * @author spikeCong
 * @date 2022/10/20
 **/
public class MediatorStructure extends Mediator {

    //中介要知晓房主和租房者的信息
    private HouseOwner houseOwner;
    private Tenant tenant;

    public HouseOwner getHouseOwner() {
        return houseOwner;
    }

    public void setHouseOwner(HouseOwner houseOwner) {
        this.houseOwner = houseOwner;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    @Override
    public void contact(String message, Person person) {
        if(person == houseOwner){  //如果是房主,则租房者获得信息
            tenant.getMessage(message);
        }else { //如果是租房者则获取房主信息
            houseOwner.getMessage(message);
        }
    }
}

/**
 * 具体同事类-房屋拥有者
 * @author spikeCong
 * @date 2022/10/20
 **/
public class HouseOwner extends Person{

    public HouseOwner(String name, Mediator mediator) {
        super(name, mediator);
    }

    //与中介者联系
    public void contact(String message){
        mediator.contact(message,this);
    }

    //获取信息
    public void getMessage(String message){
        System.out.println("房主" + name + "获取到的信息: " + message);
    }
}

/**
 * 具体同事类-承租人
 * @author spikeCong
 * @date 2022/10/20
 **/
public class Tenant extends Person{

    public Tenant(String name, Mediator mediator) {
        super(name, mediator);
    }

    //与中介者联系
    public void contact(String message){
        mediator.contact(message,this);
    }

    //获取信息
    public void getMessage(String message){
        System.out.println("租房者" + name + "获取到的信息: " + message);
    }
}

public class Client {

    public static void main(String[] args) {

        //一个房主 一个租房者 一个中介机构
        MediatorStructure mediator = new MediatorStructure();

        //房主和租房者只需要知道中介机构即可
        HouseOwner houseOwner = new HouseOwner("路飞", mediator);
        Tenant tenant = new Tenant("娜美", mediator);

        //中介收集房租和租房者信息
        mediator.setHouseOwner(houseOwner);
        mediator.setTenant(tenant);

        tenant.contact("需要一个两室一厅的房子,一家人住");
        houseOwner.contact("出租一套两室一厅带电梯,月租5000");
    }
}
```

### 7.1.5 中介者模式总结 

**1) 中介者模式的优点**

- 中介者模式简化了对象之间的交互,他用中介者和同事的一对多代替了原来的同事之间的多对多的交互,一对多关系更好理解 易于维护和扩展,将原本难以理解的网状结构转换成习相对简单的星型结构.
- 可以将各个同事就对象进行解耦.中介者有利于各个同事之间的松耦合,可以独立的改变或者复用每一个同事或者中介者,增加新的中介者类和新的同事类都比较方便,更符合开闭原则
- 可以减少子类生成,中介者将原本分布与多个对象的行为集中在了一起,改变这些行为只需要生成新的中介者的子类即可,使得同事类可以被重用,无需直接对同事类进行扩展.

**2) 中介者模式的缺点**

- 在具体中介者类中包含了大量同事之间的交互细节,可能会导致中介者类变得非常的复杂,使得系统不好维护.

**3) 中介者模式使用场景**

- 系统中对象之间存在复杂的引用关系,系统结构混乱且难以理解.
- 一个对象由于引用了其他的很多对象并且直接和这些对象进行通信,导致难以复用该对象.
- 想要通过一个中间类来封装多个类中的行为,而又不想生成太多的子类,此时可以通过引用中介者类来实现,在中介者类中定义对象的交互的公共行为,如果需要改变行为则可以在增加新的中介类.





