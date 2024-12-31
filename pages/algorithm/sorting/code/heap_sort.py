def heap_sort(arr):
    n = len(arr)

    # 创建最大堆
    for start in range((n - 2) // 2, -1, -1):
        sift_down(arr, start, n - 1)

    # 将堆顶元素（最大的元素）和最后一个元素交换
    # 重新调整堆得到最大元素，如此循环
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        sift_down(arr, 0, end - 1)

    return arr


def sift_down(arr, start, end):
    '''
    处理结果：节点总是大于等于子节点
    '''
    root = start
    while True:
        # 左节点：2 * i + 1
        # 右节点：2 * i + 2
        child = 2 * root + 1
        if child > end:
            break

        # 如果存在右节点，且右节点大于左节点，选择右节点
        if child + 1 <= end and arr[child] < arr[child + 1]:
            child += 1

        # 如果节点小于子节点，交换
        if arr[root] < arr[child]:
            arr[root], arr[child] = arr[child], arr[root]
            root = child
        else:
            break


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(heap_sort(arr))
