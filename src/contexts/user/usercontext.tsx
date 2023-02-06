import { createContext } from 'react';
import { initialState } from '../../components/reducers/planeswalkerreducer';
export const userContext = createContext({
    user: initialState.user,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: (user: any) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logout: () => {},
});