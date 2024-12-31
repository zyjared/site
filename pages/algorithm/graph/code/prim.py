import heapq


def prim(n, graph):
    # 初始化
    mst = []
    total_weight = 0
    visited = set()
    pq = [(0, 0)]  # (权重, 节点)

    while pq:
        weight, node = heapq.heappop(pq)

        if node in visited:
            continue

        visited.add(node)
        total_weight += weight

        # 遍历所有相邻的节点
        for neighbor, weight in graph[node]:
            if neighbor not in visited:
                heapq.heappush(pq, (weight, neighbor))
                mst.append((node, neighbor, weight))

    return mst, total_weight


if __name__ == "__main__":
    # 示例：图的邻接表表示
    graph = {
        0: [(1, 1), (2, 3)],
        1: [(0, 1), (2, 2), (3, 4)],
        2: [(0, 3), (1, 2), (3, 5)],
        3: [(1, 4), (2, 5)],
    }

    n = 4  # 图的节点数量
    mst, total_weight = prim(n, graph)
    print("最小生成树的边:", mst)
    print("最小生成树的总权重:", total_weight)
