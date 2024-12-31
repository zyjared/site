def cocktail_shaker_sort(arr):
    n = len(arr)
    start = 0  # 未排序区域的起始位置
    end = n - 1  # 未排序区域的结束位置
    swapped = True

    while swapped:
        swapped = False

        # 从左到右冒泡，将最大值移动到末尾
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True

        # 如果没有交换，说明已经有序
        if not swapped:
            break

        # 减少排序范围
        end -= 1
        swapped = False

        # 从右到左冒泡，将最小值移动到开头
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True

        # 增加起始范围
        start += 1

    return arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(cocktail_shaker_sort(arr))
