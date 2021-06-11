import { isScreenMobile } from '@/utils/isMobile'

export default {
    install: (app, options) => {
        app.config.globalProperties.$isMobile = isScreenMobile();
    },
}