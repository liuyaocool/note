
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

# 01. 创建型-单例模式

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

# 02. 创建型-工厂方法模式

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

# 03. 创建型-抽象工厂

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

# 04. 创建型-建造者模式

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


# 05. 创建型-原型模式

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

其实现在不推荐大家用Cloneable接口，实现比较麻烦，现在借助Apache Commons或者springframework可以直接实现：

- 浅克隆：`BeanUtils.cloneBean(Object obj);BeanUtils.copyProperties(S,T);`
- 深克隆：`SerializationUtils.clone(T object);` 

BeanUtils是利用反射原理获得所有类可见的属性和方法，然后复制到target类。
SerializationUtils.clone()就是使用我们的前面讲的序列化实现深克隆，当然你要把要克隆的类实现Serialization接口。

## 总结

**原型模式的优点**

1. 当创建新的对象实例较为复杂时,使用原型模式可以简化对象的创建过程, 通过复制一个已有实例可以提高新实例的创建效率.

   > 比如，在 AI 系统中，我们经常需要频繁使用大量不同分类的数据模型文件，在对这一类文件建立对象模型时，不仅会长时间占用 IO 读写资源，还会消耗大量 CPU 运算资源，如果频繁创建模型对象，就会很容易造成服务器 CPU 被打满而导致系统宕机。通过原型模式我们可以很容易地解决这个问题，当我们完成对象的第一次初始化后，新创建的对象便使用对象拷贝（在内存中进行二进制流的拷贝），虽然拷贝也会消耗一定资源，但是相比初始化的外部读写和运算来说，内存拷贝消耗会小很多，而且速度快很多

2. 原型模式提供了简化的创建结构,工厂方法模式常常需要有一个与产品类等级结构相同的工厂等级结构(具体工厂对应具体产品),而原型模式就不需要这样,原型模式的产品复制是通过封装在原型类中的克隆方法实现的,无须专门的工厂类来创建产品.

3. 可以使用深克隆的方式保存对象状态,使用原型模式将对象复制一份并将其状态保存起来,以便在需要的时候使用,比如恢复到某一历史状态,可以辅助实现撤销操作.

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

# 06. 结构型-代理模式

# 07. 结构型-桥接模式

# 08. 结构型-装饰器模式

# 09. 结构型-适配器模式

# 10. 结构型-外观模式

# 11. 结构型-组合模式

# 12. 结构型-享元模式

# 13. 行为型-观察者模式

# 14. 行为型-模板方法模式

# 15. 行为型-策略模式

# 16. 行为型-职责链模式

# 17. 行为型-状态模式

# 18. 行为型-迭代器模式

# 19. 行为型-访问者模式

# 20. 行为型-备忘录模式

# 21. 行为型-命令模式

# 22. 行为型-解释器模式

# 23. 行为型-中介者模式

