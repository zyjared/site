# 拓扑排序

## 介绍

拓扑排序是有向无环图（DAG）的一种线性排序方法，使得对于图中的每一条有向边 $(u, v)$，节点 $u$ 在节点 $v$ 之前出现。拓扑排序通常用于任务调度、编译依赖等问题中，确保任务的执行顺序不违反依赖关系。拓扑排序有多种实现方法，其中常见的是基于入度的算法和深度优先搜索（DFS）算法。

## 实现

<<< ./code/topological_sort.py

## 复杂度

|                | 复杂度     | 描述                               |
| -------------- | ---------- | ---------------------------------- |
| 最优时间复杂度 | $O(V + E)$ | 拓扑排序遍历图中的每个节点和每条边 |
| 最坏时间复杂度 | $O(V + E)$ | 时间复杂度与图的规模成线性关系     |
| 平均时间复杂度 | $O(V + E)$ | 时间复杂度对图的节点数和边数的关系 |
| 空间复杂度     | $O(V + E)$ | 存储图的邻接表和入度数组所需空间   |

## 特点

### 优点

- 简单易理解，适用于任务调度和依赖管理等问题。
- 可通过入度或深度优先搜索实现，灵活高效。
- 对于有向无环图，拓扑排序可以有效地找到合适的执行顺序。

### 缺点

- 只能用于有向无环图（DAG），如果图中存在环，则无法进行拓扑排序。
- 如果图的规模较大，可能需要较多的空间来存储图和入度信息。

## 应用场景

拓扑排序广泛应用于以下场景：

- 任务调度：确保任务按依赖关系顺序执行。
- 编译顺序：编译某些源文件时，确保按正确的顺序进行。
- 图的优化问题，如最短路径、最大流等问题中的依赖关系处理。
