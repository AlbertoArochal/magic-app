export const loginpw = (user: any) => {
    return {
        type: 'LOGIN',
        payload: user,
    };
};

export const logoutpw = () => {
    return {
        type: 'LOGOUT',
    };
};
