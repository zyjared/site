def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1

        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key


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


def tim_sort(arr):
    min_run = 32

    for i in range(0, len(arr), min_run):
        insertion_sort(arr, i, min((i + min_run - 1), len(arr) - 1))

    size = min_run
    while size < len(arr):
        for start in range(0, len(arr), size * 2):
            mid = min(len(arr) - 1, start + size - 1)
            end = min((start + size * 2 - 1), (len(arr) - 1))
            if mid < end:
                arr[start:end+1] = merge(arr[start:mid+1], arr[mid+1:end+1])
        size *= 2

    return arr


if __name__ == '__main__':
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(tim_sort(arr))
