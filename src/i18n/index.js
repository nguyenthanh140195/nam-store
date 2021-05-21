import { inject } from 'vue'
import createI18n, { i18nSymbol } from './i18nPlugin'
import en from './en'
import vn from './vn'

export function useI18n() {
    return inject(i18nSymbol);
}

export const LOCALE = {
    EN: 'en',
    VN: 'vn'
}

const messages = {
    [LOCALE.EN]: en,
    [LOCALE.VN]: vn
}
const locale = LOCALE.EN;
const fallbackLocale = LOCALE.EN;

const i18n = createI18n({
    messages,
    locale,
    fallbackLocale,
});

export default i18n;
