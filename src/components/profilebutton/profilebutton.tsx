import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { useLogDelete } from '../../hooks/logdelete/uselogdelete';

export const ProfileButton = () => {
    const { login } = useLogDelete();
    const { user } = useContext(userContext);
    return (
        <p
            onClick={() => {
                if (!user) {
                    login();
                } else {
                    window.location.href = '/profile';
                }
            }}
            className="Header__button profile"
        >
            Profile
        </p>
    );
};
