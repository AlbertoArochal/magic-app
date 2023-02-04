import { userContext } from '../../contexts/usercontext';
import { useContext } from 'react';

export const ProfilePic = () => {
    const { user } = useContext(userContext);

    if (user === null) {
        return <div className="nopic">nopic</div>;
    }
    return (
        <div className="ProfilePic">
            <img
                className="ProfilePicImg"
                src={user.photoURL}
                alt="Profile pic"
            />
        </div>
    );
};
