# 贪心算法

1. 最自然智慧的算法
2. 局部最功利标准, 总是做出在当前来看是最好的选择
3. 难点在于证明局部最功利标准可以得到全局最优解
4. 对于贪心算法的学习主要以增加阅历和经验为主

# 题1: 拼接字符串数组 找最小字典序

## 题目

给定一组字符串， 求解出所有字符串拼接后字典序最小的

如: b ba a of ac -> aacbabof

> 字典序:
>
> 所有位置字符根据ascii码排序, 如 `"A"=65 "a"=97 " "=32`, -> `" "<"A"<"a"`
>
> 如: ba ac中 `ac <= ba`  
> ba b 中 `b <= ba`  -> `"b " <= "ba"` 补“0”, 补ascii最小的那个(暂用空格),前32个好像都是制表等控制的码,空格是第一个字符的码

## 错误贪心策略

```java
// 如 "b" < "ba" ， 但 bba > bab
if(s1 <= s2) -> s1 <= s2
```

## 正确贪心策略

```java
if((s1+s2) <= (s2+s1)) -> s1 <= s2
```

### 证明

**证明第一步: 传递性**

1. 拼接改写: 已知字符串为k进制
    ```java
    // "123" + "456" = "123456" = "123" * k^3 + "456"
    a+b
    = a * k^(b.length) + b
    // k^(s2.length) 改为黑盒 m(s2)
    = a * m(b) + b
    ```
2. 证明传递性: 前后顺序 abc, `a+b<=b+a b+c<=c+b -> a+c<=c+a`
    ```java
    // 改写 a+b<=b+a
    a*m(b)+b <= b*m(a)+a // -b
    a*m(b)   <= b*m(a)+a-b // *c
    a*m(b)*c <= b*m(a)*c+ac-bc
    // 改写 b+c<=c+b
    b*m(c)+c   <= c*m(b)+b // -b
    b*m(c)+c-b <= c*m(b) // *a
    a*b*m(c)+ac-ab <= a*c*m(b)
    // 将两个最终结果结合
    a*b*m(c)+ac-ab <= a*c*m(b)
                      a*m(b)*c <= b*m(a)*c+ac-bc
    // 得
    a*b*m(c)+ac-ab <= b*m(a)*c+ac-bc // -ac
    a*b*m(c)-ab <= b*m(a)*c-bc // /b
    a*m(c)-a <= m(a)*c-c // +a+c
    a*m(c)+c <= m(a)*c+a
    // 即
    a+c <= c+a
    ```
**证明第二步: 任意多个字符串交换顺序 字典序必上升**

1. 任意两个交换 字典序必上升
    ```java
    [...... a  s1 s2 b ......] // 原始序列
    // 交换 a s1
    [...... s1 a  s2 b ......] // 字典序变大, 因为 a<=s1 -> a+s1<=s1+a
    // 再交换a s2
    [...... s1 s2 a  b ......] // 字典序变大, 原始序列中, a在s2前, 根据传递性 a+s2<=s2+a
    // 再交换a b
    [...... s1 s2 b  a ......] // 字典序变大, 原因同上
    // 再交换s2 b
    [...... s1 b  s2 b ......] // 字典序变大, s2<=b -> s2+b <= b+s2
    // 再交换s1 b
    [...... b  s1 s2 b ......] // 字典序变大, 原因同上上
    ```
2. 同理可证任意3个、4个、......

### 暴力方法代码

```cpp
/**
 * 暴力查找
 *  思路: 每一位都固定在第一位一次, 剩余的再获得组合列表跟第一位组合
 */
void removeIndex(const vector<string> &strs, vector<string> &list, size_t idx) {
    for (size_t i = 0, j = 0; i < strs.size(); i++)
        if (i != idx)
            list[j++] = strs[i];
}
vector<string> lowestStringList(const vector<string> &strs) {
    if (1 == strs.size())
        return strs;
    vector<string> result;
    vector<string> miniResult;
    vector<string> noIndex;
    noIndex.resize(strs.size() - 1);
    string first;
    for (size_t i = 0; i < strs.size(); i++)
    {
        removeIndex(strs, noIndex, i);
        miniResult = lowestStringList(noIndex);
        for (size_t j = 0; j < miniResult.size(); j++)
            result.push_back(strs[i] + miniResult[j]);
    }
    return result;
}
string lowestString(const vector<string> &strs) {
    if (0 == strs.size())
        return "";
    vector<string> list;
    list.reserve(strs.size());
    for (size_t i = 0; i < strs.size(); i++)
        if (!strs[i].empty())
            list.push_back(strs[i]);
    list = lowestStringList(strs);
    sort(list.begin(), list.end());
    return list[0];
}
```

### 贪心策略代码

```cpp
string tanxin(const vector<string> strs) {
    if (0 == strs.size())
        return "";
    sort(strs.begin(), strs.end(), [](const string &a, const string &b) {
        // if (a.empty())
        //     return true;
        // if (b.empty())
        //     return false;
        // return (a + b) <= (b + a);
        return a.empty() || (!b.empty() && (a + b) <= (b + a));
    });
    string str = "";
    for (size_t i = 0; i < strs.size(); i++)
        str += strs[i];
    return str;
}
```