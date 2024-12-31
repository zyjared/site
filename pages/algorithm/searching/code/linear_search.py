def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # 返回目标元素的索引
    return -1  # 如果没有找到目标元素，返回 -1

if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5]
    print(linear_search(arr, 3))