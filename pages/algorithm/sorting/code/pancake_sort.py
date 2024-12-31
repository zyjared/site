def flip(arr, k):
    arr[:k] = arr[:k][::-1]


def pancake_sort(arr):
    for size in range(len(arr), 1, -1):

        # 找到当前未排序部分的最大元素的索引
        max_index = arr.index(max(arr[:size]))

        # 将最大元素翻到数组前面
        if max_index != size - 1:
            flip(arr, max_index + 1)  # 翻转到最前面
            flip(arr, size)           # 翻转到正确位置
    return arr


if __name__ == '__main__':
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(pancake_sort(arr))
