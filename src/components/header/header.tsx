import logo from '../../assets/img/logo.png';
import { useEffect, useState, useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { getAuth } from 'firebase/auth';
import { ProfilePic } from '../profilepic/profilepic';
import { ProfileButton } from '../profilebutton/profilebutton';
import { YearLink } from '../yearlink/yearlink';
import { Link } from 'react-router-dom';
import { useGetDelAddDeck } from '../../hooks/getDelAddDeck';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(userContext);
    const { getDeck } = useGetDelAddDeck();
    const [loading, setLoading] = useState(false);
    const { setFilteredCards } = useContext(CardContext);
    const navigate = useNavigate();

    const setDecksHandler = async () => {
        setLoading(true);
        setFilteredCards([]);
        const deck = await getDeck(user.uid);
        setFilteredCards(deck);
        setLoading(false);
        setTimeout(() => {
            navigate('/deck');
        }, 500);
    };

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user);
            } else return;
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
                </nav>
                {user ? (
                    <button
                        className={`bnt-more ${loading ? 'btn__loading' : ''}`}
                        onClick={setDecksHandler}
                    >
                        My Decks
                    </button>
                ) : null}
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
                        <Link to="/">
                            <p className="home">Home</p>
                        </Link>
                        <YearLink />
                    </nav>
                    {user ? (
                        <button
                            className={`bnt-more ${
                                loading ? 'btn__loading' : ''
                            }`}
                            onClick={setDecksHandler}
                        >
                            My Decks
                        </button>
                    ) : null}
                    <ProfileButton />
                </div>
            )}
        </div>
    );
};
