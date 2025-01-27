# Tim 排序

## 介绍

Tim 排序（TimSort）是一种结合了插入排序和归并排序的排序算法。它是由 Tim Peters 在 2002 年为 Python 语言设计的，作为 Python 内建排序算法 `sorted()` 的实现。Tim 排序通过将数据分割成小块（称为"块"），使用插入排序对每个块进行排序，然后使用归并排序将这些块合并，最终得到排序好的数组。

Tim 排序的核心思想是：

1. 将数据分成一个个小块，使用插入排序对每个小块进行排序（小块大小通常为 32 或 64）。
2. 然后将这些小块进行归并，利用归并排序算法高效地合并它们。

这种混合排序算法结合了插入排序在小规模数据上的高效性和归并排序在大规模数据上的稳定性，因而在许多应用场景中表现出色。

## 实现

<<< ./code/tim_sort.py

## 复杂度

|                | 复杂度        | 描述                 |
| -------------- | ------------- | -------------------- |
| 最优时间复杂度 | $O(n \log n)$ |                      |
| 最坏时间复杂度 | $O(n \log n)$ |                      |
| 平均时间复杂度 | $O(n \log n)$ |                      |
| 空间复杂度     | $O(n)$        | 使用了额外的合并空间 |

## 特点

### 优点

- 结合了插入排序和归并排序的优点，在小规模数据上表现优异，同时在大规模数据上具有良好的时间复杂度。
- 稳定排序，不会改变相等元素的相对顺序。
- 对于已经部分排序的数据，具有较好的性能。

### 缺点

- 需要额外的空间用于存储合并结果（空间复杂度为 $O(n)$）。
- 实现较为复杂，可能比简单的排序算法（如冒泡排序）更加困难。

## 应用场景

Tim 排序适用于大量数据的排序，尤其是对于数据已经部分排序的情况，它表现得非常高效。Python 和 Java 的内建排序算法就是基于 Tim 排序的。

Tim 排序适用于需要高效稳定排序的应用场景，如数据库查询结果排序、操作系统中的文件排序等。
