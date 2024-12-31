class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])
        return self.parent[u]

    def union(self, u, v):
        root_u = self.find(u)
        root_v = self.find(v)
        if root_u != root_v:
            if self.rank[root_u] > self.rank[root_v]:
                self.parent[root_v] = root_u
            elif self.rank[root_u] < self.rank[root_v]:
                self.parent[root_u] = root_v
            else:
                self.parent[root_v] = root_u
                self.rank[root_u] += 1


def kruskal(n, edges):
    disjoint_set = DisjointSet(n)
    mst = []
    edges.sort(key=lambda edge: edge[2])  # 按权重排序

    for u, v, weight in edges:
        if disjoint_set.find(u) != disjoint_set.find(v):
            disjoint_set.union(u, v)
            mst.append((u, v, weight))

    return mst


if __name__ == "__main__":

    # 示例：图的边集合 (u, v, 权重)
    edges = [
        (0, 1, 1),
        (0, 2, 3),
        (1, 2, 2),
        (1, 3, 4),
        (2, 3, 5)
    ]

    n = 4  # 图的节点数量
    mst = kruskal(n, edges)
    print("最小生成树的边:", mst)
