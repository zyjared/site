# 三分查找

## 介绍

三分查找是一种分治算法，用于在有序数组中查找一个特定元素。与二分查找不同，三分查找将数组分成三部分而不是两部分，并通过两次比较来决定查找范围。三分查找在每一步都能减少大约三分之一的搜索空间。

## 实现

<<< ./code/ternary_search.py

## 复杂度

|                | 复杂度        | 描述                           |
| -------------- | ------------- | ------------------------------ |
| 最优时间复杂度 | $O(\log_3 n)$ | 在数组已排序的情况下，查找元素 |
| 最坏时间复杂度 | $O(\log_3 n)$ | 在最坏情况下查找元素           |
| 平均时间复杂度 | $O(\log_3 n)$ | 查找时间复杂度                 |
| 空间复杂度     | $O(1)$        | 递归调用栈的空间开销           |

## 特点

### 优点

- 每次比较将数组分成三部分，理论上比二分查找减少更多的搜索空间。
- 适用于大规模的有序数组查找，效率较高。

### 缺点

- 相比于二分查找，三分查找的实现更加复杂。
- 需要更多的计算，特别是在每次比较时计算两个中间值。

## 应用场景

三分查找适用于以下场景：

- 在大规模的有序数组中查找元素。
- 在需要精确控制查找区间的应用中（例如在某些优化问题中）应用三分查找。
