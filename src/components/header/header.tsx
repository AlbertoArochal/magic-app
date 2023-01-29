import logo from '../../assets/img/logo.png';
import { useEffect, useState } from 'react';
import { signInWithGoogle } from '../helpers/signwithgoogle';
import { useContext } from 'react';
import { userContext } from '../../contexts/usercontext';
import { getAuth } from 'firebase/auth';
import { ProfilePic } from '../profilepic/profilepic';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(userContext);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [setUser]);

    return (
        <div className="Header">
            <div className="Header__logo">
                <img src={logo} alt="Five colors logo" />
            </div>
            <div className="Header__links">
                <nav>
                    <a href="/">Home</a>
                    <a href="/">Year</a>
                    <a href="/">Secret Lair</a>
                </nav>
                <button className="Header__button decks">My Decks</button>
                <div className="header__pwp">
                    <button
                        onClick={signInWithGoogle}
                        className="Header__button profile"
                    >
                        PROFILE
                    </button>

                    <ProfilePic />
                </div>
            </div>
            <button
                className="Burger__button"
                {...{ 'data-testid': 'burger-button' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <i className="fas fa-times"></i>
                ) : (
                    <i className="fas fa-bars"></i>
                )}
            </button>
            {isOpen && (
                <div
                    {...{ 'data-testid': 'burger-menu' }}
                    className="Burger__menu Burger__menu-open"
                >
                    <nav>
                        <a className="home" href="/">
                            Home
                        </a>
                        <a className="year" href="/">
                            Year
                        </a>
                        <a className="secret" href="/">
                            Secret Lair
                        </a>
                    </nav>
                    <button className="Header__button decks">My Decks</button>
                    <button
                        onClick={signInWithGoogle}
                        className="Header__button profile"
                        {...{ 'data-testid': 'profile-button' }}
                    >
                        PROFILE
                    </button>
                </div>
            )}
        </div>
    );
};
