import { userContext } from '../../../contexts/user/usercontext';
import { getAuth } from 'firebase/auth';
import { deleteUser } from '../../services/deleteuser';
import { useContext } from 'react';
export const useLogDelete = () => {
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
