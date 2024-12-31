def tarjan_scc(graph):
    index = 0  # 用于给每个节点分配一个唯一的索引
    stack = []  # 存储当前路径的栈
    indices = {}  # 存储每个节点的索引
    lowlink = {}  # 存储每个节点的低链接值
    on_stack = set()  # 存储栈中节点的集合
    sccs = []  # 存储强连通分量的结果

    def dfs(v):
        nonlocal index
        indices[v] = lowlink[v] = index
        index += 1
        stack.append(v)
        on_stack.add(v)

        # 遍历邻接节点
        for w in graph.get(v, []):
            if w not in indices:
                dfs(w)
                lowlink[v] = min(lowlink[v], lowlink[w])
            elif w in on_stack:
                lowlink[v] = min(lowlink[v], indices[w])

        # 如果当前节点是强连通分量的根节点
        if indices[v] == lowlink[v]:
            scc = []
            while True:
                w = stack.pop()
                on_stack.remove(w)
                scc.append(w)
                if w == v:
                    break
            sccs.append(scc)

    # 对图中的每个节点进行深度优先搜索
    for node in graph:
        if node not in indices:
            dfs(node)

    return sccs


if __name__ == "__main__":

    graph = {
        0: [1],
        1: [2],
        2: [0, 3],
        3: [4],
        4: [5],
        5: [3],
    }

    sccs = tarjan_scc(graph)
    print("强连通分量:", sccs)
