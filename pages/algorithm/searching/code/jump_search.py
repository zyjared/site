import math


def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))  # 选择步长为数组长度的平方根
    prev = 0

    # 跳跃式查找块
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1  # 数组中没有目标元素

    # 线性查找块内的元素
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i  # 找到目标元素，返回索引

    return -1  # 如果未找到目标元素，返回 -1


if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5]
    print(jump_search(arr, 3))
