import { ProfilePic } from '../profilepic/profilepic';
import { userContext } from '../../contexts/usercontext';
import { useContext } from 'react';
export const Profile = () => {
    const { user } = useContext(userContext);
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
                    <button className="Profile__SignOut">Sign Out</button>
                    <button className="Profile__DeleteAccount">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};
