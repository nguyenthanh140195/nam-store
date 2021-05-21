import { isScreenMobile } from './isMobile'

export default {
    install: (app, options) => {
        app.config.globalProperties.$isMobile = isScreenMobile();
    },
}