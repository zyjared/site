# Dialog 组件

一个简洁优雅的对话框组件，与网站现有样式完美匹配，支持函数式调用扩展。

## 特性

- 🎨 与网站现有设计风格一致
- 📱 响应式设计，支持移动端
- ⌨️ 支持 ESC 键关闭
- 🎭 流畅的过渡动画
- 🔧 高度可定制
- 🚀 为函数式调用做好准备
- 🖱️ 支持拖拽移动

## 基础用法

```vue
<script setup>
const showDialog = ref(false)

function handleConfirm() {
  // 处理确认逻辑
  showDialog.value = false
}
</script>

<template>
  <UiDialog v-model="showDialog" title="对话框标题">
    <p>对话框内容</p>

    <template #footer>
      <button @click="showDialog = false">
        取消
      </button>
      <button @click="handleConfirm">
        确定
      </button>
    </template>
  </UiDialog>
</template>
```

## 拖拽功能

```vue
<template>
  <!-- 启用拖拽 -->
  <UiDialog v-model="showDialog" title="可拖拽对话框" :draggable="true">
    <p>这个对话框可以拖拽移动</p>
  </UiDialog>

  <!-- 禁用拖拽（默认） -->
  <UiDialog v-model="showDialog" title="固定对话框" :draggable="false">
    <p>这个对话框不能拖拽</p>
  </UiDialog>
</template>
```

## Props

| 属性             | 类型      | 默认值       | 说明               |
| ---------------- | --------- | ------------ | ------------------ |
| `modelValue`     | `boolean` | `false`      | 是否显示对话框     |
| `title`          | `string`  | `''`         | 对话框标题         |
| `showClose`      | `boolean` | `true`       | 是否显示关闭按钮   |
| `closeOnOverlay` | `boolean` | `true`       | 点击遮罩层是否关闭 |
| `width`          | `string`  | `'max-w-md'` | 对话框宽度         |
| `showOverlay`    | `boolean` | `true`       | 是否显示遮罩层     |
| `draggable`      | `boolean` | `false`      | 是否支持拖拽移动   |

## Events

| 事件名              | 参数               | 说明               |
| ------------------- | ------------------ | ------------------ |
| `update:modelValue` | `(value: boolean)` | 对话框显示状态变化 |
| `close`             | -                  | 对话框关闭时触发   |

## Slots

| 插槽名    | 说明             |
| --------- | ---------------- |
| `default` | 对话框主要内容   |
| `footer`  | 底部操作按钮区域 |

## 函数式调用

组件支持完整的函数式调用，通过 `useDialog` composable 使用：

```typescript
import { useDialog } from '~/composables/dialog'

const { alert, confirm } = useDialog()

// 显示提示对话框
await alert('操作成功！')

// 显示确认对话框
const result = await confirm('确定要删除吗？')
if (result) {
  // 用户点击了确定
}
```

### API 说明

#### `alert(content, title?)`

- 显示提示对话框
- 返回 `Promise<void>`
- 用户点击确定或关闭时 resolve

#### `confirm(content, title?)`

- 显示确认对话框
- 返回 `Promise<boolean>`
- 用户点击确定时 resolve `true`，取消时 resolve `false`

### 实现原理

函数式调用通过全局状态管理实现：

- 使用 `ref` 管理对话框状态数组，支持多个对话框
- 每个对话框有唯一的 ID 和独立的 z-index
- 在应用根组件中渲染 `GlobalDialog` 组件
- 函数调用时创建新的对话框状态，支持同时显示多个对话框

### 多对话框支持

- ✅ **独立状态**: 每个对话框有独立的状态和生命周期
- ✅ **层级管理**: 自动分配递增的 z-index，后打开的对话框在上层
- ✅ **独立关闭**: 每个对话框可以独立关闭，不影响其他对话框
- ✅ **内存管理**: 对话框关闭后自动从状态数组中移除

### 拖拽功能

- ✅ **拖拽区域**: 通过拖拽标题栏移动对话框
- ✅ **全边界支持**: 可以拖拽到屏幕的所有边缘（上、下、左、右）
- ✅ **严格边界限制**: 对话框不会超出屏幕范围，确保完全可见
- ✅ **视觉反馈**: 拖拽时显示抓取光标
- ✅ **位置重置**: 对话框关闭后自动重置位置
- ✅ **可选功能**: 默认关闭，可通过 `draggable` 属性启用
- ✅ **精确控制**: 只有拖拽标题栏才会移动，避免误操作
- ✅ **稳定可靠**: 重新实现的拖拽逻辑，彻底解决闪现问题
- ✅ **快速拖拽**: 鼠标移动过快时对话框不会消失
- ✅ **简单高效**: 使用相对位置计算，性能更好

## 样式定制

组件使用了以下 CSS 类，可以通过 UnoCSS 进行定制：

- `bg-ctx-bg`: 对话框背景色
- `text-ctx-text`: 文本颜色
- `ring-neutral/10`: 边框颜色
- `border-neutral/10`: 分割线颜色

## 设计特色

### 优雅的视觉效果

- **渐变遮罩层**: 使用 `bg-gradient-to-br from-black/20 via-black/15 to-black/10` 创建自然的渐变效果
- **毛玻璃效果**: 对话框本身具有 `backdrop-blur-sm` 效果，增强层次感
- **流畅动画**: 结合缩放、位移和透明度的过渡动画，提供自然的交互体验

### 动画细节

- **进入动画**: 从下方轻微上移 (`translate-y-4`) 并缩放，营造浮起感
- **退出动画**: 向下移动并缩小，保持一致的视觉语言
- **过渡时间**: 进入 300ms，退出 200ms，平衡流畅性和响应性

## 示例

访问 `/dialog-demo` 页面查看完整的使用示例。
