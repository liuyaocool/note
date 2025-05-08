
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
![在这里插入图片描述](/java/img/dp_01.png)

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

# 设计模式
## 01. 创建型-单例

### 1. 饿汉

### 2. 懒汉
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

### 3. 静态内部类

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

### 4. 枚举单例

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

## 02. 创建型-工厂模式

### 1. 简单工厂模式：静态方法通过参数返回不同实例

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


### 2. 工厂方法模式：用工厂封装对象创建的过程

封装对象创建的过程，提升创建对象方法的可复用性。

**主要角色：**

- 抽象工厂：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法来创建产品。
- 具体工厂：主要是实现抽象工厂中的抽象方法，完成具体产品的创建。
- 抽象产品：定义了产品的规范，描述了产品的主要特性和功能。
- 具体产品：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应。

**UML图：**
![在这里插入图片描述](/java/img/dp_02.png)

### 3.抽象工厂

#### 概述

抽象工厂模式(Abstract Factory Pattern)**原始定义**：提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。

比工厂方法模式抽象程度更高，工厂方法`(1：1)`模式每一个具体工厂只生产一种具体产品，抽象工厂`(1：n)`中一个具体工厂产生一组产品(`产品族`)，产品族中每一个产品都分属于某一产品`继承等级结构`。

![](/java/img/dp_factory_03.jpg)

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

## 

#### 实现

![](/java/img/dp_factory_04.png)


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

## 03. 创建型-建造者(Builder)模式

Builder Pattern也被称为**生成器模式**： 分离复杂对象的构建与表示， 使得同样的构建过程可以创建不同的表示。

- 为什么不用构造: 100个参数 每次可能只需要几个 总不能用构造器把不需要的90多个传空值吧
- 为什么不用set方法: 因为有时候 A参数的校验会用到B参数， 如果B参数后于A参数set， 那不就报错了，所以在最后 build()的时候校验就没这个问题了

**解决的问题**： 建造者模式可以将部件和其组装过程分开，一步一步创建一个复杂的对象。用户只需要指定复杂对象的类型就可以得到该对象，而无须知道其内部的具体构造细节。

### 原理

建造者模式包含以下4个角色 :

- **抽象建造者类（Builder）**：这个接口规定要实现复杂对象的哪些部分的创建，并不涉及具体的部件对象的创建。
- **具体建造者类（ConcreteBuilder）**：实现 Builder 接口，完成复杂产品的各个部件的具体创建方法。在构造过程完成后，提供一个方法,返回创建好的负责产品对象。
- **产品类（Product）**：要创建的复杂对象 (包含多个组成部件).
- **指挥者类（Director）**：调用具体建造者来创建复杂对象的各个部分，在指导者中不涉及具体产品的信息，只负责保证对象各部分完整创建或按某种顺序创建(客户端一般只需要与指挥者进行交互)。

![](/java/img/dp_factory_05.png)

### 实现方式1

**创建共享单车**

生产自行车是一个复杂的过程，它包含了车架，车座等组件的生产。而车架又有碳纤维，铝合金等材质的，车座有橡胶，真皮等材质。对于自行车的生产就可以使用建造者模式。

这里Bike是产品，包含车架，车座等组件；Builder是抽象建造者，MobikeBuilder和HelloBuilder是具体的建造者；Director是指挥者。类图如下：