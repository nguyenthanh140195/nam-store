import { createVNode, defineComponent, render } from 'vue'
import Modal from './Modal.vue'

// export const info = (props = {}) => {
//   const { content = "info!", onOk: ok = f => f } = props;

//   const close = () => {
//     vNode.component.props.visible = false
//   }
//   const onOk = () => {
//     close()
//     ok()
//   }

//   const vNodeProps = {
//     ...props,
//     visible: false,
//     content,
//   }
//   const ModalComponent = defineComponent({
//     ...Modal,
//     setup: (props, context) => {
//       const clickOK = () => {
//         onOk();
//       };
//       const clickClose = () => {
//         close();
//       };

//       return { clickOK, clickClose };
//     },
//   })
//   const vNode = createVNode(ModalComponent, vNodeProps)
//   const container = document.createElement('div')
//   document.body.appendChild(container)
//   render(vNode, container)

//   if (vNode.component) {
//     vNode.component.props.visible = true
//   }
// }

export const confirm = (props = {}) => {
  const { content = "confirm?", okText = "Confirm", cancelText = "Cancel", onOk: ok = f => f, onCancel: cancel = f => f } = props;

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
    ...props,
    visible: false,
    content,
    okText,
    cancelText,
  }
  const ModalComponent = defineComponent({
    ...Modal,
    setup: (props, context) => {
      const clickOK = () => {
        onOk();
      };
      const clickCancel = () => {
        onCancel();
      };
      const clickClose = () => {
        close();
      };

      return { clickOK, clickCancel, clickClose };
    },
  })
  const vNode = createVNode(ModalComponent, vNodeProps)
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(vNode, container)

  if (vNode.component) {
    vNode.component.props.visible = true
  }
}