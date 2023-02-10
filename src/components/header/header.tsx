import logo from '../../assets/img/logo.png';
import { useEffect, useState, useContext } from 'react';
import { signInWithGoogle } from '../services/signwithgoogle';
import { userContext } from '../../contexts/user/usercontext';
import { getAuth } from 'firebase/auth';
import { ProfilePic } from '../profilepic/profilepic';
import { ProfileButton } from '../profilebutton/profilebutton';
import { YearLink } from '../yearlink/yearlink';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setUser } = useContext(userContext);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    return (
        <div className="Header">
            <div className="Header__logo">
                <img src={logo} alt="Five colors logo" />
            </div>
            <div className="Header__links">
                <nav>
                    <Link to="/">
                        <p className="home">Home</p>
                    </Link>
                    <YearLink />
                    <p className="secret">Secret Lair</p>
                </nav>

                <button className="Header__button decks">My Decks</button>
                <div className="header__pwp">
                    <ProfileButton />

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
