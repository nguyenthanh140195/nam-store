const directives = {
  focus: {
    mounted: function (el, binding, vnode) {
      el.focus();
    },
  }
}
export default {
  install: (app, options) => {
    for (let key in directives) {
      app.directive(key, directives[key]);
    }
  },
}