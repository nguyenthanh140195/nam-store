import { ref } from '@vue/reactivity';

const DEFAULT_BREAKPOINT = {
  sm: 450,
  md: 576,
  lg: 768,
  xl: 992,
  xxl: 1200
}

export default {
  install: (app, breakpoints = DEFAULT_BREAKPOINT) => {
    const mq = ref('xxl');

    const keys = Object.keys(breakpoints);
    const values = keys.map(key => breakpoints[key]);
    const breakpointValues = [0, ...values.slice(0, -1)];
    const mediaQueries = breakpointValues.reduce((sum, value, index) => {
      const mediaQuery = index < keys.length - 1 ? `(min-width: ${value}px) and (max-width: ${breakpointValues[index + 1] - 1}px)` : `(min-width: ${value}px)`;
      return Object.assign(sum, { [keys[index]]: mediaQuery });
    }, {});
    for (const key in mediaQueries) {
      const mediaQuery = mediaQueries[key];
      const mediaQueryList = window.matchMedia(mediaQuery);
      const cb = ({ matches }) => {
        if (matches) mq.value = key;
      }
      cb(mediaQueryList); //initial trigger
      mediaQueryList.addListener(cb); //subscribing
    }

    app.config.globalProperties.$mq = mq;
  }
}
