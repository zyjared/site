# TODO

一些自定义，如果必要的话。

## 待完成

- 如果内容来自 ai，需要提示
  - frontmatter 中指定 ai 程度
  - 拓展主题
- 每个文件夹一定存在 index.md
  - 提交前检查 index.md
  - 不存在则自动创建，内容为目录或关系图
  - defineSidebar 追加 index 的 link
- sidebar 如果太长，为了简洁，可以多一层分类且可以返回父级目录
  - aside 是否增加返回目录的卡片
  - 是否可以使用关系图

## 已完成

- defineSidebar 函数
  - 方便 sidebar 频繁调整
- vite-plugin-demoify
  - 根据代码文件，创建对应的 .md 文件
