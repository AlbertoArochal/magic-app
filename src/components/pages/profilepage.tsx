import { userContext } from '../../contexts/usercontext';
import { useContext } from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Profile } from '../profile/profile';
export const ProfilePage = () => {
    const { user } = useContext(userContext);
    return (
        <>
            <Header />
            <Profile />

            <Footer />
        </>
    );
};
