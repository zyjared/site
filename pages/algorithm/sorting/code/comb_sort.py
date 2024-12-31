def comb_sort(arr):
    n = len(arr)
    gap = n
    shrink_factor = 1.3
    swapped = True
    while gap > 1 or swapped:

        # 计算新的间隔
        gap = int(gap / shrink_factor)
        if gap < 1:
            gap = 1
        swapped = False

        # 对当前间隔的元素进行排序
        for i in range(n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True
    return arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(comb_sort(arr))
