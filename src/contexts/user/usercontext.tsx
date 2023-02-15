import { createContext } from 'react';
import { initialState } from '../../components/reducers/planeswalkerreducer';
import { UserType } from '../../models/usertype';
export const userContext = createContext({
    user: initialState.user,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: (user: UserType) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logout: () => {},
});
