def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False  # 是否有元素交换

        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        # 如果没有元素交换，说明已经有序
        if not swapped:
            break

    return arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(bubble_sort(arr))
