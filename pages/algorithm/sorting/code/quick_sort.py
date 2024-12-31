def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]  # 选择基准元素

    # 此处分配了新的空间，也可以选择交换元素

    left = [x for x in arr if x < pivot]  # 小于基准的元素
    middle = [x for x in arr if x == pivot]  # 等于基准的元素
    right = [x for x in arr if x > pivot]  # 大于基准的元素

    return quick_sort(left) + middle + quick_sort(right)


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(quick_sort(arr))
