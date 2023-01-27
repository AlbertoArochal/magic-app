import { createContext, useReducer } from 'react';
import { pwReducer, initialState } from '../components/reducers/pwreducer';
import { pwType } from '../models/pwtype';
export const userContext = createContext({
    user: initialState.user,
    setUser: (user: pwType) => {},
    logout: () => {},
});

export const UserProvider = ({ children }: any) => {
    const [loginUser, loginDispatch] = useReducer(pwReducer, {
        ...initialState,
    });

    return (
        <userContext.Provider
            value={{
                user: loginUser.user,
                setUser: (user: pwType) =>
                    loginDispatch({ type: 'LOGIN', payload: user }),
                logout: () => loginDispatch({ type: 'LOGOUT' }),
            }}
        >
            {children}
        </userContext.Provider>
    );
};
