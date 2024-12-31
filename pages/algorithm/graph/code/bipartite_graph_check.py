from collections import deque


def is_bipartite(graph):
    # 初始化一个字典来存储节点的颜色，-1表示未染色
    color = {node: -1 for node in graph}

    def bfs(start):
        queue = deque([start])
        color[start] = 0  # 给起始节点染色为0

        while queue:
            node = queue.popleft()
            for neighbor in graph.get(node, []):
                if color[neighbor] == -1:  # 如果邻居未染色
                    color[neighbor] = 1 - color[node]  # 给邻居染色为与当前节点不同的颜色
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:  # 如果邻居颜色与当前节点相同
                    return False
        return True

    # 遍历所有节点，确保图中每个连通分量都被检查
    for node in graph:
        if color[node] == -1:  # 如果节点没有染色，开始BFS检查
            if not bfs(node):
                return False
    return True


if __name__ == "__main__":
    # 示例：图的邻接表表示
    graph = {
        0: [1, 3],
        1: [0, 2],
        2: [1, 3],
        3: [0, 2],
    }

    print(is_bipartite(graph))  # 输出: True
