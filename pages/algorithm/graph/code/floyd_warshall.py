def floyd_warshall(graph):
    # 初始化距离矩阵
    nodes = list(graph.keys())
    dist = {node: {other: float('inf') for other in nodes} for node in nodes}

    # 自己到自己的距离为0
    for node in nodes:
        dist[node][node] = 0

    # 初始化边的距离
    for node in graph:
        for neighbor, weight in graph[node].items():
            dist[node][neighbor] = weight

    # 动态规划更新最短路径
    for k in nodes:
        for i in nodes:
            for j in nodes:
                if dist[i][j] > dist[i][k] + dist[k][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist


if __name__ == "__main__":

    # 图的表示方式：邻接表
    graph = {
        'A': {'B': 1, 'C': 4},
        'B': {'A': 1, 'C': 2, 'D': 5},
        'C': {'A': 4, 'B': 2, 'D': 1},
        'D': {'B': 5, 'C': 1}
    }

    result = floyd_warshall(graph)
    print("各个节点之间的最短路径:")
    for node, distances in result.items():
        print(f"{node}: {distances}")
