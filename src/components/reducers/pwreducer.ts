export const initialState = {
    user: null as any,
};

export const pwReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
};
