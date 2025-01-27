# 跳跃查找

## 介绍

跳跃查找是一种查找算法，它通过将数组分成若干个块，减少查找的范围。该算法通过跳跃式地访问数组中的元素，而不是逐个元素地查找。适用于有序数组，但不像二分查找那样依赖于每次中间元素的估算，而是通过跳跃步长逐步减少查找范围。

## 实现

<<< ./code/jump_search.py

## 复杂度

|                | 复杂度        | 描述                         |
| -------------- | ------------- | ---------------------------- |
| 最优时间复杂度 | $O(\sqrt{n})$ | 目标元素在块的开始位置       |
| 最坏时间复杂度 | $O(\sqrt{n})$ | 目标元素在最后一个块或不存在 |
| 平均时间复杂度 | $O(\sqrt{n})$ | 每次跳跃都能快速减少查找范围 |
| 空间复杂度     | $O(1)$        | 只需要常数级空间             |

## 特点

### 优点

- 相较于线性查找，跳跃查找的查找效率更高，尤其适用于大规模数据。
- 时间复杂度为 $O(\sqrt{n})$，比线性查找的 $O(n)$ 要好。

### 缺点

- 仅适用于有序数组。
- 在某些特殊情况下（例如数组元素间差距较大），效果可能并不显著。

## 应用场景

跳跃查找适用于大规模的有序数组，尤其是在存储方式为块结构的数据中，能有效地减少不必要的查找操作。例如，用于查找数据库中的数据记录、查找库存清单中的商品等。
