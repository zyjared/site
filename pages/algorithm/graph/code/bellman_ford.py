def bellman_ford(graph, start):
    # 初始化距离
    distances = {node: float('inf') for node in graph}
    distances[start] = 0

    # 对所有边进行V-1次松弛操作
    for _ in range(len(graph) - 1):
        for node in graph:
            for neighbor, weight in graph[node].items():
                if distances[node] + weight < distances[neighbor]:
                    distances[neighbor] = distances[node] + weight

    # 检查是否存在负权回路
    for node in graph:
        for neighbor, weight in graph[node].items():
            if distances[node] + weight < distances[neighbor]:
                print("图中存在负权回路")
                return None

    return distances

if __name__ == '__main__':
    # 图的表示方式：邻接表
    graph = {
        'A': {'B': -1, 'C': 4},
        'B': {'C': 3, 'D': 2, 'A': 1},
        'C': {'D': 5},
        'D': {'B': -2}
    }

    start_node = 'A'
    result = bellman_ford(graph, start_node)
    if result:
        print("从节点", start_node, "到各个节点的最短路径:", result)
