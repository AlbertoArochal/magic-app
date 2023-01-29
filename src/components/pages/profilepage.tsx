import { ProfilePic } from '../profilepic/profilepic';
import { userContext } from '../../contexts/usercontext';
import { useContext } from 'react';
import { Header } from '../header/header';
export const ProfilePage = () => {
    const { user } = useContext(userContext);
    return (
        <>
            <Header />

            <div className="ProfilePage">
                <div className="ProfilePage__container">
                    <h1>Profile Page</h1>
                    <p>{user?.displayName}</p>
                    <p>{user?.email}</p>
                    <ProfilePic />
                </div>
                <button className="ProfilePage__SignOut">Sign Out</button>
                <button className="ProfilePage__DeleteAccount">
                    Delete Account
                </button>
            </div>
        </>
    );
};
