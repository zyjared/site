# 插入排序

## 介绍

插入排序是一种简单的排序算法，基本思想是将每个待排序的元素插入到已经排好序的部分中。插入排序像是整理扑克牌，每次从未排序的部分取出一张牌，将其插入到已排序部分的正确位置。

## 实现

<<< ./code/insertion_sort.py

## 复杂度

|                | 复杂度   | 描述                                     |
| -------------- | -------- | ---------------------------------------- |
| 最优时间复杂度 | $O(n)$   | 已经排序好时，每次没有元素需要移动       |
| 最坏时间复杂度 | $O(n^2)$ | 完全逆序时，每次都需要将元素移动到最前面 |
| 平均时间复杂度 | $O(n^2)$ | 每个元素大致需要 $n$ 次比较              |
| 空间复杂度     | $O(1)$   | 原地排序，不需要额外空间                 |

## 特点

### 优点

- 实现简单，适用于小规模数据集。
- 稳定排序，不改变相等元素的相对顺序。

### 缺点

- 时间复杂度较高，特别是对于大规模数据集，效率较低。

## 适用场景

插入排序适用于小规模数据排序，尤其是数据接近有序时，它的表现非常优秀。