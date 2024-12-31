from collections import deque


def bfs(graph, start, callback=None):
    visited = set()  # 记录已访问的节点
    queue = deque([start])  # 队列，保存待访问的节点
    visited.add(start)

    while queue:
        vertex = queue.popleft()  # 从队列中取出节点

        if callback:
            callback(vertex)

        # 遍历所有相邻的节点
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)


if __name__ == '__main__':
    # 图的表示方式：邻接表
    graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D', 'E'],
        'C': ['A', 'F'],
        'D': ['B'],
        'E': ['B', 'F'],
        'F': ['C', 'E']
    }

    bfs(graph, 'A', lambda vertex: print(vertex, end=" "))
