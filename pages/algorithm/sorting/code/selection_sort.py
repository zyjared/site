def selection_sort(arr):
    for i in range(len(arr)):

        # 找到未排序部分的最小元素
        min_index = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j

        # 将最小元素与当前位置的元素交换
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]

    return arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(selection_sort(arr))
