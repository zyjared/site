import type { AnimationPlaybackControls } from 'motion'
import { animate, stagger } from 'motion'

interface MotionOptions {
  selector?: string
  duration?: number
  delay?: number
  from?: 'first' | 'last' | 'center'
}

function createFadeMotion(options: MotionOptions = {}, enter = true) {
  const {
    selector = '.motion-fade',
    duration = 0.8,
    delay = 0.1,
    from = 'first',
  } = options

  const keyFrames = enter
    ? {
        opacity: [0, 1],
        y: [20, 0],
      }
    : {
        opacity: [1, 0],
        y: [0, 20],
      }

  return animate(
    selector,
    keyFrames,
    {
      delay: stagger(delay, { from }),
      duration,
    },
  )
}

/**
 * 尽可能不创建独立的实例
 */
export function motionFade(selector: string, enter?: boolean): AnimationPlaybackControls
export function motionFade(motionOptions: MotionOptions, enter?: boolean): AnimationPlaybackControls
export function motionFade(motionOptions?: MotionOptions | string, enter = true) {
  return createFadeMotion(
    typeof motionOptions === 'string' ? { selector: motionOptions } : motionOptions,
    enter,
  )
}
