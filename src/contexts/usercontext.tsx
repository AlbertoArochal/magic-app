import { createContext, useReducer } from 'react';
import { pwReducer, initialState } from '../components/reducers/pwreducer';
export const userContext = createContext({
    user: initialState.user,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: (user: any) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
                setUser: (user: any) =>
                    loginDispatch({ type: 'LOGIN', payload: user }),
                logout: () => loginDispatch({ type: 'LOGOUT' }),
            }}
        >
            {children}
        </userContext.Provider>
    );
};
