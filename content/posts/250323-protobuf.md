---
title: protobuf
date: 2025-03-23
---

# protobuf 爬虫记录

这两天做爬虫，解析 protobuf 数据，因为是“爬”，所以需要反推，学到了很多。

本篇内容场景：爬取某网站数据，得到的是 protobuf 文件，需要解析，并重现完整的请求流程。

## 认识 protobuf

- [Protocol Buffers Documentation](https://protobuf.dev/)。

看完后，需要知道以下内容:

- 是什么：一种对数据进行序列化的机制
- 为什么：`smaller, faster, and simpler`
- 如何做：[工作流程](https://protobuf.dev/overview/#work)

多看几遍关于工作流程的内容以及 [.proto 文件会生成什么](https://protobuf.dev/programming-guides/editions/#generated)。

这些了解完之后，就可以使用 ai 了 \~\_\~

## 查看数据类型

利用浏览器的开发者工具，在网络中找到需要的响应，或使用抓包工具，可以拿到响应的 `ArrayBuffer`，直接复制就好。

- 直接复制响应
- 粘贴到文本文件中，但是需要注意粘贴的是什么
  - 比如 base64，就需要删除前缀
- 使用 `protoc` 解码
- 查看结果

如果不会使用 `protoc`，关键命令 `protoc --help` + ai。

应该可以看到类似：

```txt
1: ...
2: ...
3: {
    1: ...
}
```

## 确定字段类型

知道了 protobuf 数据的结构，应该能理解是否知道其字段名并没有那么重要，你甚至可以为其取名为 `a`、`b`、`c` 等等，重要的是确定其类型。

```proto
message {
  int32 a = 1;
}
```

## 编写脚本

如果要尝试编写 `.proto` 文件，也就是复原，在数据量比较多的时候，可以找找规律，用脚本来提取。

1. 找到有映射关系的 `.js` 文件；
2. 尝试手动还原几个
3. 找到规律
4. 写代码
   1. 确定 message：识别函数与作用域（嵌套的是过滤还是追加）
   2. 确定字段：作用域 + 正则
   3. 保存文本

这种文件太规律了，只需要细心和时间就好。
