def counting_sort(arr):
    # 找到最大值和最小值
    max_val = max(arr)
    min_val = min(arr)

    # 创建计数数组
    range_of_elements = max_val - min_val + 1
    count = [0] * range_of_elements

    # 统计每个元素出现的次数
    for num in arr:
        count[num - min_val] += 1

    # 累加得到元素的位置
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    # 生成排序后的数组
    output = [None] * len(arr)
    for num in arr:
        output[count[num - min_val] - 1] = num
        count[num - min_val] -= 1

    return output


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(counting_sort(arr))
