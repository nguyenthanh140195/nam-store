const TEST = 'test'
const LOCAL_STORAGE_STATE_KEY = 'boardState'
const localStorageAvailable = () => {
    try {
        localStorage.setItem(TEST, TEST);
        localStorage.removeItem(TEST);
        return true;
    } catch (e) {
        return false;
    }
}

let unsubscribe, unsubscribeAction;
export default store => {
    if (!localStorageAvailable()) {
        return false;
    }

    // const data = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
    // if (data) {
    //     // console.log('[store] [plugins] subscribe', data);
    //     store.replaceState(Object.assign(store.state, JSON.parse(data)));
    // }

    // unsubscribe = store.subscribe((mutation, state) => {
    //     // console.log('[store] [plugins] subscribe', mutation, state);
    //     localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(state));
    // });

    // unsubscribeAction = store.subscribeAction((action, state) => {
    //     // console.log('[store] [plugins] subscribeAction', action, state);
    // })
};

export const removeLocalStorage = (key = LOCAL_STORAGE_STATE_KEY) => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const unsubscribeLocalStorage = () => {
    if (unsubscribe)
        unsubscribe();
}

export const unsubscribeLocalStorageAction = () => {
    if (unsubscribeAction)
        unsubscribeAction();
}
