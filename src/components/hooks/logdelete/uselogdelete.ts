import { userContext } from '../../../contexts/user/usercontext';
import { useContext } from 'react';
import { UserFirebaseRepo } from '../../services/userfirebaserepo';
export const useLogDelete = () => {
    const { user, logout } = useContext(userContext);

    const logOutHandler = () => {
        const userRepo = new UserFirebaseRepo();
        userRepo.signOut();
        logout();
    };

    const deleteUserHandler = () => {
        const userRepo = new UserFirebaseRepo();
        userRepo.deleteUser(user?.uid).then(() => {
            logOutHandler();
        });
    };
    const login = () => {
        const userRepo = new UserFirebaseRepo();
        userRepo.signInWithGoogle();
    };
    return {
        logOutHandler,
        deleteUserHandler,
        login,
    };
};
