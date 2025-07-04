<script setup lang="ts">
import { useDialog } from '~/composables/dialog'

const showDialog = ref(false)
const showCustomDialog = ref(false)
const showDraggableDialog = ref(false)
const dialogTitle = ref('')
const dialogContent = ref('')

const { alert, confirm } = useDialog()

async function showAlert() {
  await alert('这是一个简单的提示对话框！')
  // eslint-disable-next-line no-console
  console.log('Alert 已关闭')
}

async function showConfirm() {
  const result = await confirm('你确定要执行这个操作吗？', '确认操作')
  // eslint-disable-next-line no-console
  console.log('用户选择:', result ? '确定' : '取消')
}

function showCustom() {
  showCustomDialog.value = true
}

async function handleCustomConfirm() {
  const result = await confirm('你确定要保存这些更改吗？')
  if (result) {
    await alert('保存成功！')
  }
  showCustomDialog.value = false
}

async function showCustomFunctionDialog() {
  const result = await confirm('这是一个使用函数式调用创建的确认对话框，可以完全控制内容和行为。', '自定义对话框')
  if (result) {
    await alert('你点击了确认！')
  }
  else {
    await alert('你点击了取消！')
  }
}

async function showMultipleDialogs() {
  // 同时打开多个对话框
  alert('第一个对话框')
  setTimeout(() => {
    confirm('第二个对话框')
  }, 100)
  setTimeout(() => {
    alert('第三个对话框')
  }, 200)
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-8 container">
    <h1 class="mb-8 text-3xl font-bold text-ctx-text">
      Dialog 组件演示
    </h1>

    <div class="mb-6 rounded-xl p-4 ring-1 ring-neutral/10 bg-ctx-bg">
      <p class="text-sm text-neutral">
        💡 <strong>提示：</strong> 对话框的拖拽功能默认关闭，需要通过 <code>:draggable="true"</code> 属性启用。点击"可拖拽对话框"按钮体验拖拽功能！
        <br><br>
        🐛 <strong>修复：</strong> 已重新实现拖拽方案，使用绝对定位确保边界限制正确工作。修复了鼠标移动过快和松手时对话框消失的问题。
      </p>
    </div>

    <div class="space-y-6">
      <!-- 基础用法 -->
      <div class="rounded-xl p-6 ring-1 ring-neutral/10 bg-ctx-bg">
        <h2 class="mb-4 text-xl font-semibold text-ctx-text">
          基础用法
        </h2>
        <div class="flex gap-3">
          <button
            class="rounded-lg px-4 py-2 transition-colors bg-ctx-text hover:bg-ctx-text/90 text-ctx-bg"
            @click="showDialog = true"
          >
            打开对话框
          </button>
        </div>
      </div>

      <!-- 函数式调用 -->
      <div class="rounded-xl p-6 ring-1 ring-neutral/10 bg-ctx-bg">
        <h2 class="mb-4 text-xl font-semibold text-ctx-text">
          函数式调用
        </h2>
        <div class="flex gap-3">
          <button
            class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            @click="showAlert"
          >
            显示 Alert
          </button>
          <button
            class="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
            @click="showConfirm"
          >
            显示 Confirm
          </button>
          <button
            class="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
            @click="showCustomFunctionDialog"
          >
            自定义函数式调用
          </button>
          <button
            class="rounded-lg bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
            @click="showMultipleDialogs"
          >
            多个对话框
          </button>
        </div>
      </div>

      <!-- 自定义对话框 -->
      <div class="rounded-xl p-6 ring-1 ring-neutral/10 bg-ctx-bg">
        <h2 class="mb-4 text-xl font-semibold text-ctx-text">
          自定义对话框
        </h2>
        <div class="flex gap-3">
          <button
            class="rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
            @click="showCustom"
          >
            自定义对话框
          </button>
          <button
            class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            @click="showDraggableDialog = true"
          >
            测试拖拽对话框
          </button>
        </div>
      </div>
    </div>

    <!-- 基础对话框 -->
    <UiDialog v-model="showDialog" title="基础对话框" width="max-w-lg" :draggable="false">
      <p class="text-ctx-text">
        这是一个基础的对话框示例。你可以在这里放置任何内容，包括表单、图片、列表等。
        <br><br>
        💡 <strong>这个对话框默认不可拖拽</strong>
      </p>

      <template #footer>
        <button
          class="border border-neutral/20 rounded-lg px-4 py-2 text-sm text-neutral transition-colors hover:bg-neutral/10"
          @click="showDialog = false"
        >
          取消
        </button>
        <button
          class="rounded-lg px-4 py-2 text-sm transition-colors bg-ctx-text hover:bg-ctx-text/90 text-ctx-bg"
          @click="showDialog = false"
        >
          确定
        </button>
      </template>
    </UiDialog>

    <!-- 自定义对话框 -->
    <UiDialog v-model="showCustomDialog" title="自定义对话框" width="max-w-2xl">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-ctx-text">标题</label>
          <input
            v-model="dialogTitle"
            type="text"
            class="w-full border border-neutral/10 rounded-lg bg-neutral/5 px-3 py-2 text-sm outline-none focus:border-neutral/50"
            placeholder="输入标题..."
          >
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-ctx-text">内容</label>
          <textarea
            v-model="dialogContent"
            rows="4"
            class="w-full border border-neutral/10 rounded-lg bg-neutral/5 px-3 py-2 text-sm outline-none focus:border-neutral/50"
            placeholder="输入内容..."
          />
        </div>
      </div>

      <template #footer>
        <button
          class="border border-neutral/20 rounded-lg px-4 py-2 text-sm text-neutral transition-colors hover:bg-neutral/10"
          @click="showCustomDialog = false"
        >
          取消
        </button>
        <button
          class="rounded-lg px-4 py-2 text-sm transition-colors bg-ctx-text hover:bg-ctx-text/90 text-ctx-bg"
          @click="handleCustomConfirm"
        >
          确认
        </button>
      </template>
    </UiDialog>

    <!-- 可拖拽对话框 -->
    <UiDialog v-model="showDraggableDialog" title="可拖拽对话框" width="max-w-lg" :draggable="true">
      <p class="text-ctx-text">
        这是一个可以拖拽移动的对话框示例。
        <br><br>
        💡 <strong>试试拖拽标题栏来移动这个对话框！</strong>
        <br><br>
        拖拽功能的特点：
        <br>• 只能拖拽标题栏
        <br>• 可以拖拽到屏幕的所有边缘（上、下、左、右）
        <br>• 严格边界限制，不会超出屏幕范围
        <br>• 关闭后自动重置位置
        <br>• 鼠标移动时对话框会跟随
        <br>• 稳定的拖拽体验，无闪现问题
        <br>• 快速拖拽时对话框不会消失
      </p>

      <template #footer>
        <button
          class="border border-neutral/20 rounded-lg px-4 py-2 text-sm text-neutral transition-colors hover:bg-neutral/10"
          @click="showDraggableDialog = false"
        >
          关闭
        </button>
      </template>
    </UiDialog>
  </div>
</template>
