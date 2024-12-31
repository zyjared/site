def radix_sort(arr):
    # 1. 找到数组中的最大数，用来确定最大位数
    max_num = max(arr)

    # 2. 对每一位数字进行排序
    exp = 1  # 从个位开始
    while max_num // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr


def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # 数字范围是 0-9

    # 3. 统计每个数字在当前位数上的出现次数
    for i in range(n):
        index = arr[i] // exp % 10
        count[index] += 1

    # 4. 计算每个数字的最终位置
    for i in range(1, 10):
        count[i] += count[i - 1]

    # 5. 按照当前位数排序
    i = n - 1
    while i >= 0:
        index = arr[i] // exp % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
        i -= 1

    # 6. 将排序后的结果放回原数组
    for i in range(n):
        arr[i] = output[i]


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(radix_sort(arr))
