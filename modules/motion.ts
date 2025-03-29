// 修改 motion-v/nuxt 的自动导入

import { addComponent, addImports, defineNuxtModule } from '@nuxt/kit'
import { signAutoImports } from '../shared/node/imp'

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
      const signComponents = signAutoImports({
        importants: components,
        sign: 'motion',
        from: 'motion-v',
        format: true,
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
      const utils = signAutoImports({
        importants: utilities,
        sign: 'motion',
        from: 'motion-v',
        format: true,
      })

      //   console.log('重命名: motion-v\n', utils)
      utils.forEach(addImports)
    }
  },
})

export { index as default }
