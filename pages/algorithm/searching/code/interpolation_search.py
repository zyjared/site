def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        # 根据插值公式估算中间位置
        mid = low + ((target - arr[low]) *
                     (high - low)) // (arr[high] - arr[low])

        if arr[mid] == target:
            return mid  # 找到目标元素，返回索引
        elif arr[mid] < target:
            low = mid + 1  # 在右半部分查找
        else:
            high = mid - 1  # 在左半部分查找

    return -1  # 如果未找到目标元素，返回 -1


if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5]
    print(interpolation_search(arr, 3))
