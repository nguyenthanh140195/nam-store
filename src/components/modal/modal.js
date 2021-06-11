import { createVNode, render } from 'vue'
import Modal from './Modal.vue'

export const confirm = (props) => {
  const { title, content, okText, cancelText, onOk: ok = f => f, onCancel: cancel = f => f } = props;

  const close = () => {
    vNode.component.props.visible = false
  }
  const onOk = () => {
    close()
    ok()
  }
  const onCancel = () => {
    close()
    cancel()
  }

  const vNodeProps = {
    visible: false,
    title,
    content,
    okText,
    cancelText,
  }
  const vNodeEmit = {
    onClose: close,
    onOk,
    onCancel
  }
  //: TODO: pass emits
  const vNode = createVNode(Modal, vNodeProps)
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(vNode, container)

  if (vNode.component) {
    vNode.component.props.visible = true
  }
}
