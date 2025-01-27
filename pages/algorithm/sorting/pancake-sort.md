# 煎饼排序

## 介绍

煎饼排序（Pancake Sort）是一种基于翻转操作的排序算法，它的核心思想是通过一系列翻转操作将无序的数组排序。翻转操作的概念类似于将一个煎饼从顶部翻到底部，所以该算法得名“煎饼排序”。在每一步排序过程中，算法通过将最大的未排序元素翻到数组的最前面，然后再将其翻到正确的位置。

煎饼排序的主要操作是翻转，这使得它成为一个有趣的排序算法，但在实际应用中，由于其较高的时间复杂度，通常不会用于大规模数据集。

## 实现

<<< ./code/pancake_sort.py

## 复杂度

|                | 复杂度   | 描述                                                          |
| -------------- | -------- | ------------------------------------------------------------- |
| 最优时间复杂度 | $O(n)$   | 如果数据已经是有序的，最多需要 $n$ 次翻转。                   |
| 最坏时间复杂度 | $O(n^2)$ | 在每一步中，每次翻转最多进行两次，导致时间复杂度为 $O(n^2)$。 |
| 平均时间复杂度 | $O(n^2)$ | 平均情况下，时间复杂度接近 $O(n^2)$。                         |
| 空间复杂度     | $O(1)$   | 采用原地排序，不需要额外的存储空间。                          |

## 特点

### 优点

- 煎饼排序是一个稳定排序算法，能够保证相等元素的相对顺序。
- 算法比较简单，容易理解。

### 缺点

- 时间复杂度较高，最坏和平均情况下均为 $O(n^2)$，对于大规模数据集并不高效。
- 并不适合实际应用，通常更多作为一种教学和理论算法。

## 应用场景

煎饼排序适用于小规模数据集的排序，通常用作排序算法的示例和教学工具。由于它的时间复杂度较高，在实际应用中不常用于大规模数据排序。
