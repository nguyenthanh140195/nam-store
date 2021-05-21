export default {

}

export const titleMixin = {
    created() {
        const { title } = this.$options;
        const docTitle = typeof title === 'function' ? title.call(this) : title;
        document.title = !docTitle ? 'NamStore' : 'NamStore | ' + docTitle;
    },
}