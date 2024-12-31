class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def _hash(self, key):
        return key % self.size  # 通过取模运算得到哈希值

    def insert(self, key, value):
        index = self._hash(key)
        self.table[index] = value

    def search(self, key):
        index = self._hash(key)
        if self.table[index] is not None:
            return self.table[index]  # 找到目标元素
        return None  # 如果未找到目标元素，返回 None

    def delete(self, key):
        index = self._hash(key)
        self.table[index] = None  # 删除元素

if __name__ == "__main__":
    hash_table = HashTable(10)
    hash_table.insert(1, "Alice")
    hash_table.insert(2, "Bob")
    hash_table.insert(3, "Charlie")
    print(hash_table.search(1))  # "Alice"
    hash_table.delete(2)
    print(hash_table.search(2))  # None