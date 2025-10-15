# 创建线程的方式

## 继承Thread

## 实现Runnable

## 实现Callable

```java
public class CallDemo implements Callable<Integer> {
    public static void main(String[] args) {
        CallDemo callDemo = new CallDemo();
        FutureTask<Integer> ft = new FutureTask<>(callDemo);
        new Thread(ft, "").start();
    }
    @Override
    public Integer call() throws Exception {
        return 0;
    }
}
```

