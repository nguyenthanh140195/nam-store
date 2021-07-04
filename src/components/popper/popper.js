import { computed, ref, reactive, watch, CSSProperties } from 'vue'
import { createPopper } from '@popperjs/core'

export default (props, context, triggerRef, popperRef) => {
  let popperInstance = null;
  const options = {
    placement: props.placement,
    ...props.popperOptions,
    modifiers: buildModifiers({
      // arrow: state.arrow.value,
      arrowOffset: props.arrowOffset,
      offset: props.offset,
      gpuAcceleration: props.gpuAcceleration,
      fallbackPlacements: props.fallbackPlacements,
    }, props.popperOptions?.modifiers),
  }

  const initializePopper = () => {
    popperInstance = createPopper(triggerRef.value, popperRef.value, options);
    popperInstance.update();
  }
  const doDestroy = (forceDestroy) => {
    if (!popperInstance) return
    popperInstance.destroy()
    popperInstance = null
  }

  return {
    doDestroy,
    initializePopper
  }
}

const buildModifiers = (props, externalModifiers = []) => {
  const {
    arrow,
    arrowOffset,
    offset,
    gpuAcceleration,
    fallbackPlacements,
  } = props

  const modifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, offset || 12],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
      },
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements: fallbackPlacements || [],
      },
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
        adaptive: gpuAcceleration,
      },
    },
  ]

  if (arrow) {
    modifiers.push({
      name: 'arrow',
      options: {
        element: arrow,
        padding: arrowOffset || 5,
      },
    })
  }

  modifiers.push(...(externalModifiers))
  return modifiers
}