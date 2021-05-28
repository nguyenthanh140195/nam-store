import { LOGOUT, SET_USER } from './type'

const userState = {
}

export default {
    state: { ...userState },
    getters: {
        // store.getters.getUser
        getUser(state, getters) {
            return state;
        },
        // store.getters.checkPermission(["ADMIN"])
        checkPermission: (state) => (pageRoles = []) => {
            const userRole = state.role;
            if (userRole == null) return false;
            return pageRoles.includes(userRole);
        }
    },
    actions: {
        // store.dispatch(SET_USER, {role: "ADMIN"})
        [SET_USER]({ commit, state }, payload) {
            commit(SET_USER, { ...state, ...payload });
        },
        [LOGOUT](context) {
            context.commit(LOGOUT);
        }
    },
    mutations: {
        // store.commit(SET_USER, {role: "ADMIN"})
        [SET_USER](state, payload) {
            state = payload;
        },
        [LOGOUT](state) {
            state = {};
        }
    },
}
