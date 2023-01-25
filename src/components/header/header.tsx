import logo from '../../assets/img/logo.png';
import { useState } from 'react';
import { auth, Firedb } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebase';
import { set, ref } from 'firebase/database';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const signInWithGoogle = () => {
        console.log('sign in with google');
        signInWithPopup(auth, provider)
            .then((result) => {
                const name = result.user.displayName;
                const email = result.user.email;
                const profilePic = result.user.photoURL;
                console.log(result);
                const user = {
                    uid: result.user.uid,
                    name,
                    email,
                    profilePic,
                    decks: { deck1: ['necropotency'] },
                };
                set(ref(Firedb, 'users/' + result.user.uid), user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                <button
                    onClick={signInWithGoogle}
                    className="Header__button profile"
                >
                    PROFILE
                </button>
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
                    >
                        PROFILE
                    </button>
                </div>
            )}
        </div>
    );
};
