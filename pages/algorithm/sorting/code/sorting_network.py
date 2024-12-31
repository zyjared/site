def bitonic_merge(arr, low, cnt, dire):
    if cnt > 1:
        k = cnt // 2

        # 对前半部分与后半部分进行合并
        for i in range(low, low + k):
            if (arr[i] > arr[i + k]) == dire:
                arr[i], arr[i + k] = arr[i + k], arr[i]

        # 递归合并
        bitonic_merge(arr, low, k, dire)
        bitonic_merge(arr, low + k, k, dire)


def bitonic_sort(arr, low, cnt, dire):
    if cnt > 1:
        k = cnt // 2

        # 递归地对前半部分排序为升序
        bitonic_sort(arr, low, k, 1)
        # 递归地对后半部分排序为降序
        bitonic_sort(arr, low + k, k, 0)

        bitonic_merge(arr, low, cnt, dire)


def sorting_network(arr):
    # 对整个数组进行比托尼克排序，参数 1 表示升序
    bitonic_sort(arr, 0, len(arr), 1)
    return arr


if __name__ == '__main__':
    arr = [64, 34, 25, 12, 22, 11, 90, 1]
    print(sorting_network(arr))