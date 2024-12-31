def bucket_sort(arr):
    if len(arr) < 2:
        return arr

    min_value, max_value = min(arr), max(arr)

    # 创建桶，桶的数量可以选择合适的大小
    count = len(arr)
    buckets = [[] for _ in range(count)]

    # 将元素分配到不同的桶中
    for num in arr:
        index = int((num - min_value) / (max_value - min_value) * (count - 1))
        buckets[index].append(num)

    # 对每个桶进行排序并合并
    result = []
    for bucket in buckets:
        result.extend(bucket_sort(bucket))

    return result


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(bucket_sort(arr))
