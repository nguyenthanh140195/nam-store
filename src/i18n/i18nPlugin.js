import { ref, inject } from 'vue'

const recursiveRetrieve = (chain, messages) => {
    const key = chain[0];
    if (~key.indexOf("[")) {
        const [key1, ostr] = key.split("[");
        const str = ostr.replace("]", "");
        const num = parseInt(str);
        const key2 = isNaN(num) ? str : num;

        if (!messages[key1] || !messages[key1][key2]) throw new Error("Not Found");
        if (chain.length === 1) return typeof messages[key1][key2] === "string" ? messages[key1][key2] : "";
        return recursiveRetrieve(chain.slice(1), messages[key1][key2]);
    } else {
        if (!messages[key]) throw new Error("Not Found");
        if (chain.length === 1) return typeof messages[key] === "string" ? messages[key] : "";
        return recursiveRetrieve(chain.slice(1), messages[key]);
    }
};

export default function createI18n(config) {
    const locale = ref(config.locale || config.fallbackLocale || 'en');
    const messages = config.messages;
    const setLocale = (loc) => {
        if (!messages[loc])
            console.warn(`Warn(i18n): the '${loc}' language pack not found, fall back to English language pack`);
        locale.value = !messages[loc] ? config.fallbackLocale : loc;
    };
    const getLocale = () => locale.value;
    const translate = (key) => {
        const pack = messages[locale.value] || messages['en'];
        if (typeof key !== "string") {
            console.warn(`Warn(i18n): keypath '${key}' must be a type of string`);
            return key;
        }
        try {
            return recursiveRetrieve(key.split("."), pack) || key;
        } catch (error) {
            console.warn(`Warn(i18n): keypath '${key}' not found`);
            return key;
        }
    };
    const formatNum = (num) => {
        return num;
    };
    const i18n = {
        messages,
        translate,
        formatNum,
        setLocale,
        getLocale,
        install(app) {
            const i18n = this;
            app.provide(i18nSymbol, i18n);
            app.config.globalProperties.$i18n = i18n;
            app.config.globalProperties.$t = i18n.translate;
            app.config.globalProperties.$n = i18n.formatNum;
        },
    };
    return i18n;
};

export const i18nSymbol = Symbol("i18n");

export function useI18n() {
    return inject(i18nSymbol);
}
