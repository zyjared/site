def fibonacci_search(arr, target):
    n = len(arr)
    fib_m_2 = 0  # (m-2)'th Fibonacci Number
    fib_m_1 = 1  # (m-1)'th Fibonacci Number
    fib = fib_m_1 + fib_m_2  # m'th Fibonacci Number

    # 找到不小于 n 的斐波那契数
    while fib < n:
        fib_m_2 = fib_m_1
        fib_m_1 = fib
        fib = fib_m_1 + fib_m_2

    # 初始的索引
    offset = -1

    # 在数组中查找目标元素
    while fib > 1:
        i = min(offset + fib_m_2, n - 1)

        # 如果目标元素较大，跳过前面的元素
        if arr[i] < target:
            fib = fib_m_1
            fib_m_1 = fib_m_2
            fib_m_2 = fib - fib_m_1
            offset = i
        # 如果目标元素较小，跳过后面的元素
        elif arr[i] > target:
            fib = fib_m_2
            fib_m_1 = fib_m_1 - fib_m_2
            fib_m_2 = fib - fib_m_1
        # 找到目标元素
        else:
            return i

    # 如果最后一个元素是目标元素
    if fib_m_1 and arr[offset + 1] == target:
        return offset + 1

    return -1  # 如果没有找到目标元素，返回 -1

if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5]
    print(fibonacci_search(arr, 3))