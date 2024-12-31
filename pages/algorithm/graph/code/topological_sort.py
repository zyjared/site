from collections import deque


def topological_sort(n, graph):
    # 计算每个节点的入度
    in_degree = [0] * n
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    # 找到入度为0的节点
    queue = deque([u for u in range(n) if in_degree[u] == 0])
    result = []

    while queue:
        u = queue.popleft()
        result.append(u)

        # 更新相邻节点的入度
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    if len(result) == n:
        return result  # 返回拓扑排序
    else:
        return []  # 如果图中有环，则无法进行拓扑排序


if __name__ == "__main__":
    # 示例：图的邻接表表示
    graph = {
        0: [1, 2],
        1: [3],
        2: [3],
        3: [],
    }

    n = 4  # 图的节点数量
    top_order = topological_sort(n, graph)
    print("拓扑排序的结果:", top_order)
