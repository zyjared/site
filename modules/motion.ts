// 修改 motion-v/nuxt 的自动导入

import { markImports } from '#shared/lib/imports'
import { addComponent, addImports, defineNuxtModule } from '@nuxt/kit'

const components = [
  'Motion',
  'AnimatePresence',
  'LayoutGroup',
  'MotionConfig',
  'ReorderGroup',
  'ReorderItem',
]
const utilities = [
  'useTransform',
  'useTime',
  'useMotionTemplate',
  'useSpring',
  'useScroll',
  'useMotionValue',
  'useVelocity',
  'useAnimate',
  'useInView',
  'useAnimationFrame',
  'useMotionValueEvent',
  'useLayoutGroup',
  'useDragControls',
  'useReducedMotion',
]
const index = defineNuxtModule({
  meta: {
    name: 'motion-v',
    configKey: 'motionV',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: '',
    components: true,
    utilities: true,
  },
  setup(options, _nuxtApp) {
    if (options.components) {
      const signComponents = markImports({
        importants: components,
        mark: 'motion',
        from: 'motion-v',
        toImport: true,
      })
      signComponents.forEach((c) => {
        addComponent({
          name: c.as || c.name,
          export: c.name,
          filePath: 'motion-v',
        })
      })
    }

    if (options.utilities) {
      const utils = markImports({
        importants: utilities,
        mark: 'motion',
        from: 'motion-v',
        toImport: true,
      })

      //   console.log('重命名: motion-v\n', utils)
      utils.forEach(addImports)
    }
  },
})

export { index as default }
