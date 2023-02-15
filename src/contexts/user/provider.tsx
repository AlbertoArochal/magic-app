import { userContext } from './usercontext';
import {
    PlanesWalkerReducer,
    initialState,
} from '../../components/reducers/planeswalkerreducer';
import { ReactNode } from 'react';

import { useReducer } from 'react';

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [loginUser, loginDispatch] = useReducer(PlanesWalkerReducer, {
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
