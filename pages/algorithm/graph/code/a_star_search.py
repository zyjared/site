import heapq


def a_star(start, goal, graph, h):
    # 初始化开放列表（优先队列）和闭合列表
    open_list = []
    heapq.heappush(open_list, (0 + h(start), start))  # (f(n), node)
    came_from = {}  # 用于追踪路径
    g_score = {start: 0}  # 从起点到各个节点的最短距离
    f_score = {start: h(start)}  # f(n) = g(n) + h(n)

    while open_list:
        _, current = heapq.heappop(open_list)  # 取出f(n)最小的节点

        if current == goal:
            # 如果当前节点是目标节点，返回路径
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()
            return path

        # 遍历当前节点的相邻节点
        for neighbor, weight in graph[current]:
            tentative_g_score = g_score[current] + weight  # 计算新的g(n)

            if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current  # 更新路径
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = tentative_g_score + h(neighbor)  # 计算新的f(n)
                heapq.heappush(
                    open_list, (f_score[neighbor], neighbor))  # 将节点加入开放列表

    return None  # 如果没有找到路径

if __name__ == "__main__":
    # 示例：图的邻接表表示
    graph = {
        'A': [('B', 1), ('C', 4)],
        'B': [('A', 1), ('C', 2), ('D', 5)],
        'C': [('A', 4), ('B', 2), ('D', 1)],
        'D': [('B', 5), ('C', 1)],
    }


    def heuristic(node):
        # 启发式函数：假设目标节点是'D'，计算曼哈顿距离（仅为示例）
        heuristic_values = {'A': 3, 'B': 2, 'C': 1, 'D': 0}
        return heuristic_values.get(node, float('inf'))


    start = 'A'
    goal = 'D'
    path = a_star(start, goal, graph, heuristic)
    print("最短路径:", path)
