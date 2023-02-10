import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { signInWithGoogle } from '../services/signwithgoogle';

export const ProfileButton = () => {
    const { user } = useContext(userContext);
    return (
        <button
            onClick={() => {
                if (!user) {
                    signInWithGoogle();
                } else {
                    window.location.href = '/profile';
                }
            }}
            className="Header__button profile"
        >
            PROFILE
        </button>
    );
};
