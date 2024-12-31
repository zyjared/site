import { defineSidebar } from '../_utils'

export const dataStructure = defineSidebar({
  base: 'data-structure',
  items: [
    {
      text: '说明',
      link: 'README',
    },
    {
      text: '数据结构术语',
      link: 'terminology',
    },
    {
      text: '时间复杂度',
      link: 'time-complexity',
    },
    {
      text: '空间复杂度',
      link: 'space-complexity',
    },
    {
      text: '线性结构',
      base: 'linear-structure',
      collapsed: false,
      items: [
        {
          text: '线性表',
          link: 'linear-list',
        },
        {
          text: '栈',
          link: 'stack',
        },
        {
          text: '队列',
          link: 'queue',
        },
        {
          text: '串',
          link: 'string',
        },
      ],
    },
    {
      text: '数组',
      link: 'array',
    },
    {
      text: '广义表',
      link: 'generalized-list',
    },
    {
      text: '树形结构',
      base: 'tree-structure',
      collapsed: false,
      items: [
        {
          text: '树',
          link: 'tree',
        },
        {
          text: '二叉树',
          link: 'binary-tree',
        },
        {
          text: '二叉搜索树',
          link: 'binary-search-tree',
        },
        {
          text: '平衡二叉树',
          link: 'balanced-binary-tree',
        },
        {
          text: 'B 树',
          link: 'B-tree',
        },
        {
          text: '堆',
          link: 'heap',
        },
        {
          text: '赫夫曼树',
          link: 'huffman-tree',
        },

        {
          text: '森林',
          link: 'forest',
        },
        {
          text: '回溯法和树的遍历',
          link: 'tree-traversal',
        },
      ],
    },
    {
      text: '图形结构',
      base: 'graph-structure',
      collapsed: false,
      items: [
        {
          text: '图',
          link: 'graph',
        },
        {
          text: '图的遍历',
          link: 'graph-traversal',
        },
        {
          text: '图的连通性',
          link: 'graph-connectivity',
        },
        {
          text: '有向无环图',
          link: 'directed-acyclic-graph',
        },
        {
          text: '最短路径',
          link: 'shortest-path',
        },
      ],
    },
  ],
})
