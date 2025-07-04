export interface DialogOptions {
  title?: string
  content?: string
  showClose?: boolean
  closeOnOverlay?: boolean
  width?: string
  showOverlay?: boolean
  onClose?: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}

export interface DialogInstance {
  id: string
  close: () => void
  open: () => void
}

export interface DialogState {
  id: string
  visible: boolean
  title: string
  content: string
  showClose: boolean
  closeOnOverlay: boolean
  width: string
  showOverlay: boolean
  onClose?: () => void
  onConfirm?: () => void
  confirmText: string
  cancelText: string
  showCancel: boolean
  showFooter: boolean
  zIndex: number
}

// 全局对话框状态管理 - 支持多个对话框
const globalDialogStates = ref<DialogState[]>([])
let nextZIndex = 1000

export function useDialog() {
  const createDialog = (options: DialogOptions): DialogInstance => {
    const {
      title = '',
      content = '',
      showClose = true,
      closeOnOverlay = true,
      width = 'max-w-md',
      showOverlay = true,
      onClose,
      onConfirm,
      confirmText = '确认',
      cancelText = '取消',
      showCancel = true,
    } = options

    const id = `dialog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const zIndex = nextZIndex++

    const close = () => {
      const index = globalDialogStates.value.findIndex(dialog => dialog.id === id)
      if (index > -1) {
        globalDialogStates.value[index]!.visible = false
        if (typeof onClose === 'function') {
          onClose()
        }

        // 延迟移除，等待动画完成
        setTimeout(() => {
          const removeIndex = globalDialogStates.value.findIndex(dialog => dialog.id === id)
          if (removeIndex > -1) {
            globalDialogStates.value.splice(removeIndex, 1)
          }
        }, 200)
      }
    }

    const open = () => {
      // 创建新的对话框状态
      const dialogState: DialogState = {
        id,
        visible: true,
        title,
        content,
        showClose,
        closeOnOverlay,
        width,
        showOverlay,
        onClose: onClose || undefined,
        onConfirm: onConfirm || undefined,
        confirmText,
        cancelText,
        showCancel,
        showFooter: true,
        zIndex,
      }

      globalDialogStates.value.push(dialogState)
    }

    return {
      id,
      open,
      close,
    }
  }

  const alert = (content: string, title = '提示') => {
    return new Promise<void>((resolve) => {
      const dialog = createDialog({
        title,
        content,
        showCancel: false,
        confirmText: '确定',
        onConfirm: () => resolve(),
        onClose: () => resolve(),
      })
      dialog.open()
    })
  }

  const confirm = (content: string, title = '确认') => {
    return new Promise<boolean>((resolve) => {
      const dialog = createDialog({
        title,
        content,
        showCancel: true,
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => resolve(true),
        onClose: () => resolve(false),
      })
      dialog.open()
    })
  }

  return {
    createDialog,
    alert,
    confirm,
    globalDialogStates,
  }
}
