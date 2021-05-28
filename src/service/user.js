export const login = (payload) => {
    return new Promise((resolve, reject) => {
        const res = {
            status: 200,
            data: {
                token: "token",
                user: {
                    role: "ADMIN",
                    userName: "thanh.nv",
                    fullName: "Nguyen Van Thanh"
                }
            }
        }
        resolve(res);
    });
}

export const getMe = () => {
    return new Promise((resolve, reject) => {
        const res = {
            status: 200,
            data: {
                role: "ADMIN",
                userName: "thanh.nv",
                fullName: "Nguyen Van Thanh",
            }
        }
        resolve(res);
    });
}
