export const auth = {
  mounted: function (el, binding, vnode) {
    // console.log("[authMixin] v-auth");
    const { value = "No permission", instance: { noPermission } } = binding;
    if (noPermission)
      el.innerHTML = `<div class="no-permission">${value}</div>`;
  }
}

export const scrolltop = {
  mounted: function (el, binding, vnode) {
    // console.log("[authMixin] v-scrolltop");
    const container = document.createElement('div')
    document.body.appendChild(container)
    //: TODO: add to top button
  },
}

export const focus = {
  mounted: function (el, binding, vnode) {
    // console.log("[authMixin] v-focus");
    el.focus();
  },
}

const directives = {
  focus
}
export default {
  install: (app, options) => {
    for (let key in directives) {
      app.directive(key, directives[key]);
    }
  },
}