
import { createVNode, render, inject } from 'vue'
import Toast from './Toast.vue'
// import './toast.scss'

const toastSymbol = Symbol("toast");

export function useToast() {
  return inject(toastSymbol);
}

export const TRANSITION = {
  ZOOM: "zoom",
  SLIDE: "slide",
  BOUNCE: "bounce",
}

export const TYPE = {
  INFO: "info",
  DANGER: "danger",
  WARNING: "warning",
  SUCCESS: "success",
  DEFAULT: "default",
}

export const POSITION = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center",
}

export default {
  install: (app, defaultOptions) => {
    const create = (content, options) => {
      createToast(content, { ...defaultOptions, ...options });
    }
    const show = (content, options) => {
      create(content, { ...options, type: 'default' });
    }
    const info = (content, options) => {
      create(content, { ...options, type: 'info' });
    }
    const danger = (content, options) => {
      create(content, { ...options, type: 'danger' });
    }
    const warning = (content, options) => {
      create(content, { ...options, type: 'warning' });
    }
    const success = (content, options) => {
      create(content, { ...options, type: 'success' });
    }

    const toast = {
      show,
      info,
      danger,
      warning,
      success,
      createToast: create
    }

    app.config.globalProperties.$toast = toast
    app.provide(toastSymbol, toast)
  }
}

let toastId = 0
let toasts = Object.keys(POSITION).reduce((prevValue, key) => ({ ...prevValue, [POSITION[key]]: [] }), {})
const POSITION_MAP = Object.keys(POSITION).map(key => POSITION[key]);
const TYPE_MAP = Object.keys(TYPE).map(key => TYPE[key]);
const TOAST_GAP = 12

const initializeOptions = (options) => {
  const processedOptions = { ...options }
  if (!TYPE_MAP.includes(options.type)) processedOptions.showIcon = false
  if (!POSITION_MAP.includes(options.position)) processedOptions.position = POSITION.TOP_RIGHT
  return processedOptions
}

const initializeContent = (content) => {
  const text = typeof content === 'string' ? content : content.title || content.text
  const description = typeof content === 'string' ? undefined : content.description

  return { text, description }
}

const moveToastsOnAdd = (position) => {
  let verticalOffset = TOAST_GAP
  toasts[position].forEach(({ toastVNode }) => {
    const offsetHeight = toastVNode.el.offsetHeight
    verticalOffset += offsetHeight + TOAST_GAP
  })
  return verticalOffset
}

const setupVNode = (options, content) => {
  const id = toastId++
  const offset = moveToastsOnAdd(options.position)
  const vNodeProps = {
    ...options,
    ...content,
    id,
    offset,
    visible: false,
    onCloseHandler: () => {
      close(id, options.position)
    }
  }

  const toastVNode = createVNode(Toast, vNodeProps)
  const container = document.createElement('div')
  document.body.appendChild(container)

  render(toastVNode, container)
  toasts[options.position].push({ toastVNode, container })

  if (toastVNode.component) {
    toastVNode.component.props.visible = true
  }
}

const createToast = (content, options) => {
  const initializedContent = initializeContent(content)
  const initializedOptions = initializeOptions(options)
  if (!content || !initializedOptions.position) return

  setupVNode(initializedOptions, initializedContent)
}

const moveToastsOnClose = (index, toastArr, position, toastHeight) => {
  for (let i = index; i < toastArr.length; i++) {
    const { toastVNode } = toastArr[i]

    if (!toastVNode.el || !toastVNode.component) return

    const verticalPos = position.split('-')[0] || 'top'
    const pos = parseInt(toastVNode.el.style[verticalPos], 10) - toastHeight - TOAST_GAP

    toastVNode.component.props.offset = pos
  }
}

const close = (id, position) => {
  const toastArr = toasts[position]

  const index = toastArr.findIndex(
    ({ toastVNode }) => toastVNode.props && id === toastVNode.props.id
  )

  if (index === -1) return
  const { container, toastVNode } = toastArr[index]

  if (!toastVNode.el) return
  const height = toastVNode.el.offsetHeight

  toasts[position].splice(index, 1)
  moveToastsOnClose(index, toastArr, position, height)

  if (!toastVNode.component) return
  toastVNode.component.props.visible = false

  if (toastVNode.component.props.onClose) {
    (toastVNode.component.props).onClose()
  }

  setTimeout(() => {
    render(null, container)
    document.body.removeChild(container)
  }, 1000)
}
