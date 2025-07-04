<script setup lang="ts">
import { useDialog } from '~/composables/dialog'

const { globalDialogStates } = useDialog()

function handleConfirm(dialogState: any) {
  dialogState.onConfirm?.()
  dialogState.visible = false
}

function handleCancel(dialogState: any) {
  dialogState.visible = false
}

function handleClose(dialogState: any) {
  dialogState.onClose?.()
  dialogState.visible = false
}
</script>

<template>
  <ClientOnly>
    <template v-for="dialogState in globalDialogStates" :key="dialogState.id">
      <UiDialog
        v-model="dialogState.visible"
        :title="dialogState.title"
        :show-close="dialogState.showClose"
        :close-on-overlay="dialogState.closeOnOverlay"
        :width="dialogState.width"
        :show-overlay="dialogState.showOverlay"
        :draggable="false"
        :style="{ zIndex: dialogState.zIndex }"
        @close="handleClose(dialogState)"
      >
        <p class="text-ctx-text">
          {{ dialogState.content }}
        </p>

        <template v-if="dialogState.showFooter" #footer>
          <button
            v-if="dialogState.showCancel"
            class="border border-neutral/20 rounded-lg px-4 py-2 text-sm text-neutral transition-colors hover:bg-neutral/10"
            @click="handleCancel(dialogState)"
          >
            {{ dialogState.cancelText }}
          </button>
          <button
            class="rounded-lg px-4 py-2 text-sm transition-colors bg-ctx-text hover:bg-ctx-text/90 text-ctx-bg"
            @click="handleConfirm(dialogState)"
          >
            {{ dialogState.confirmText }}
          </button>
        </template>
      </UiDialog>
    </template>
  </ClientOnly>
</template>
