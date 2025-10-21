# 数据结构

1. 百度 Data Structure
2. geeksforgeeks.org
3. visualgo.net/zh

存储数据的不同方式 -- 数组,链表

- HashMap： 
  - 数组+链表(jdk 1.7) 
  - 数组+链表+红黑树(jdk 1.8)
    - 链表>=7 使用红黑树 泊松分布
- LinkedHashMap： 链表
- TreeMap： 红黑树

# ArrayList 动态扩容

# 连续数组

# 单向链表

` n1 -> n2 -> n3 -> n4 `

## 判断有环并返回入环节点

1. 快慢指针, 快指针一次两步, 慢指针一次一步
2. 指针相遇, 快指针指向头部并一次一步
3. 指针二次相遇 即入环节点

# Hash表   (k,v)表

HashMap  增删改查 都是O(1) 但常数时间是比较大的

1. 按值传递：
   - String，Integer等包装类， 。。。
   - k，v都为String， 则hash表这条数据为 两个String相加的字节数
2. 按引用传递：非原生类型，如 new Person()， k为内存地址
   - k，v都为引用， 则hash表这条数据为 8+8=16字节

# 有序表

TreeMap  增删改查 都是logN

要求 key一定是可以比较的

1. firstKey   lastKey
2. floorKey(key)    -- <=key的最近的key
3. ceilingKey(key)    -- >=key的最近的key

# 跳表

ConcurrentSkipListMap.java

<img src="/algorithm/img/skip-table.png" alt="image"/>

多加了索引链表
