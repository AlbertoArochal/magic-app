import { ProfilePic } from '../profilepic/profilepic';
import { userContext } from '../../contexts/usercontext';
import { useContext } from 'react';
import { useLogDelete } from '../hooks/logdelete/uselogdelete';

export const Profile = () => {
    const { user } = useContext(userContext);
    const { logOutHandler, deleteUserHandler } = useLogDelete();

    return (
        <div className="Profile">
            <div className="Profile__container">
                <div className="Profile__headline">
                    <h1>Your Profile</h1>
                </div>

                <div className="Profile__userdata">
                    {' '}
                    <p>{user?.displayName}</p>
                    <p>{user?.email}</p>
                </div>

                <ProfilePic />
                <div className="Profile__buttons">
                    <button
                        onClick={logOutHandler}
                        className="Profile__SignOut"
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={deleteUserHandler}
                        className="Profile__DeleteAccount"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};
