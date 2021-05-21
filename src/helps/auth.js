const LOCAL_STORAGE_TOKEN_KEY = 'userJwt'

export function setToken(token) {
    return localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}

export function removeToken() {
    return localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}
