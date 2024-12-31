def ternary_search(arr, left, right, x):
    if right >= left:
        mid1 = left + (right - left) // 3
        mid2 = right - (right - left) // 3

        # 如果x等于mid1或mid2
        if arr[mid1] == x:
            return mid1
        if arr[mid2] == x:
            return mid2

        # 如果x小于mid1，则在左边的部分继续查找
        if x < arr[mid1]:
            return ternary_search(arr, left, mid1 - 1, x)

        # 如果x大于mid2，则在右边的部分继续查找
        elif x > arr[mid2]:
            return ternary_search(arr, mid2 + 1, right, x)

        # 否则在中间部分继续查找
        else:
            return ternary_search(arr, mid1 + 1, mid2 - 1, x)

    return -1  # 如果未找到x，则返回-1


if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    result = ternary_search(arr, 0, len(arr) - 1, 3)
    print(result)
