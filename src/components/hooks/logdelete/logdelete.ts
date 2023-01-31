import { userContext } from '../../../contexts/usercontext';
import { getAuth } from 'firebase/auth';
import { deleteUser } from '../../helpers/deleteuser';
import { useContext } from 'react';
export const LogDelete = () => {
    const { user, logout } = useContext(userContext);

    const logOutHandler = () => {
        const auth = getAuth();
        auth.signOut();
        logout();
    };

    const deleteUserHandler = () => {
        deleteUser(user?.uid).then(() => {
            logOutHandler();
        });
    };
    return {
        logOutHandler,
        deleteUserHandler,
    };
};
