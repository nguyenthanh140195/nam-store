import { ref, computed, onMounted, onUnmounted } from 'vue'

const SWIPE_ACTIVE_DIFF = 200

const TRANSITION_MAP = {
  'top-left': {
    bounce: 't-toast__bounceInLeft',
    zoom: 't-toast__zoomIn',
    slide: 't-toast__slideInLeft'
  },
  'top-right': {
    bounce: 't-toast__bounceInRight',
    zoom: 't-toast__zoomIn',
    slide: 't-toast__slideInRight'
  },
  'top-center': {
    bounce: 't-toast__bounceInDown',
    zoom: 't-toast__zoomIn',
    slide: 't-toast__slideInDown'
  },
  'bottom-center': {
    bounce: 't-toast__bounceInUp',
    zoom: 't-toast__zoomIn',
    slide: 't-toast__slideInUp'
  },
  'bottom-right': {
    bounce: 't-toast__bounceInRight',
    zoom: 't-toast__zoomIn',
    slide: 't-toast__slideInRight'
  },
  'bottom-left': {
    bounce: 't-toast__bounceInLeft',
    zoom: 't-toast__zoomIn',
    slide: 't-toast__slideInLeft'
  }
}

export const useSwipe = (position, onCloseHandler, swipeClose) => {
  const swipeStart = ref()
  const swipeStyle = ref()
  const swipedDiff = ref(undefined)

  const isMouseEvent = (event) => event instanceof MouseEvent

  const swipeHandler = (event) => {
    if (swipeClose === false || !swipeStart.value) return

    if (isMouseEvent(event)) {
      swipedDiff.value = (swipeStart.value).clientX - (event).clientX
    } else {
      swipedDiff.value = (swipeStart.value).touches[0].clientX - (event).touches[0].clientX
    }

    swipeStyle.value = {
      ...swipeStyle.value,
      transition: 'none'
    }

    if (position.endsWith('left')) {
      swipeStyle.value.left = `${-swipedDiff.value}px !important`
    } else if (position.endsWith('right')) {
      swipeStyle.value.right = `${swipedDiff.value}px !important`
    } else {
      if (swipedDiff.value > 0) {
        swipeStyle.value.left = `${-swipedDiff.value}px !important`
      } else {
        swipeStyle.value.right = `${swipedDiff.value}px !important`
      }
    }

    if (Math.abs(swipedDiff.value) > SWIPE_ACTIVE_DIFF) {
      onCloseHandler()
    }
  }

  const moveEndHandler = (move) => {
    const resetLeft = {
      transition: 'left .3s ease-out',
      left: 0
    }

    const resetRight = {
      transition: 'right .3s ease-out',
      right: 0
    }

    const resetCenter = {
      transition: 'all .3s ease-out',
      left: 0,
      right: 0
    }

    if (position.endsWith('left')) {
      swipeStyle.value = {
        ...swipeStyle.value,
        ...resetLeft
      }
    } else if (position.endsWith('right')) {
      swipeStyle.value = {
        ...swipeStyle.value,
        ...resetRight
      }
    } else {
      swipeStyle.value = {
        ...swipeStyle.value,
        ...resetCenter
      }
    }
    swipeStart.value = undefined
    swipedDiff.value = undefined
    removeEventListener(move, swipeHandler)
  }

  const startSwipeHandler = (event) => {
    if (swipeClose === false) return
    swipeStart.value = event
    const move = isMouseEvent(event) ? 'mousemove' : 'touchmove'
    const moveEnd = isMouseEvent(event) ? 'mouseup' : 'touchend'

    addEventListener(move, swipeHandler)
    addEventListener(moveEnd, () => moveEndHandler(move))
  }

  const cleanUpMove = (move) => {
    if (swipeClose === false) return
    if (swipeStart.value) swipeStart.value = undefined
    if (swipedDiff.value) swipedDiff.value = undefined
    removeEventListener(move, swipeHandler)
  }

  onUnmounted(() => {
    if (swipeClose === false) return
    cleanUpMove('mousemove')
    cleanUpMove('touchmove')
  })

  return {
    swipedDiff,
    swipeStart,
    swipeStyle,
    swipeHandler,
    startSwipeHandler,
    cleanUpMove
  }
}

export const useTimer = (callback, delay) => {
  const timerId = ref()
  const startTime = ref(0)
  const remainingTime = ref(delay)
  const progress = ref(100)
  const intervalId = ref()

  const stop = () => {
    clearInterval(intervalId.value)
    clearTimeout(timerId.value)
    remainingTime.value -= Date.now() - startTime.value
  }

  const start = () => {
    startTime.value = Date.now()
    clearTimeout(timerId.value)
    intervalId.value = setInterval(() => {
      progress.value--
      // have to -2 because of the transition time
    }, delay / 100 - 2)
    timerId.value = setTimeout(callback, remainingTime.value)
  }

  const clear = () => {
    clearInterval(intervalId.value)
    clearTimeout(timerId.value)
  }

  onMounted(() => {
    if (delay <= 0) return
  })

  onUnmounted(() => {
    clear()
  })

  return { start, stop, clear, progress }
}

export const useTransitionType = (position, transition, swiped) => {
  const transitionType = computed(() => {
    if (swiped.value > SWIPE_ACTIVE_DIFF) {
      return 't-toast__fadeOutLeft'
    } else if (swiped.value < -SWIPE_ACTIVE_DIFF) {
      return 't-toast__fadeOutRight'
    } else {
      return TRANSITION_MAP[position][transition]
    }
  })
  return { transitionType }
}

export const useCustomStyle = (position, offset, bgColor) => {
  const customStyle = computed(() => {
    switch (position) {
      case 'top-left':
        return {
          left: '0',
          top: `${offset}px`
        }
      case 'bottom-left':
        return {
          left: '0',
          bottom: `${offset}px`
        }
      case 'bottom-right':
        return {
          right: '0',
          bottom: `${offset}px`
        }
      case 'top-center':
        return {
          top: `${offset}px`,
          left: '0',
          right: '0',
          marginRight: 'auto',
          marginLeft: 'auto'
        }
      case 'bottom-center':
        return {
          bottom: `${offset}px`,
          left: '0',
          right: '0',
          marginRight: 'auto',
          marginLeft: 'auto'
        }
      default:
        return {
          right: '0',
          top: `${offset}px`
        }
    }
  })
  if (bgColor) customStyle.value.backgroundColor = bgColor

  return { customStyle }
}
