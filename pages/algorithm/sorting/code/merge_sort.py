def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])  # 分治：递归排序左半部分
    right = merge_sort(arr[mid:])  # 分治：递归排序右半部分
    return merge(left, right)  # 合并左右两个有序部分


def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


if __name__ == '__main__':
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(merge_sort(arr))
