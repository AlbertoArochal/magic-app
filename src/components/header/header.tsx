import logo from '../../assets/img/logo.png';
import { useEffect, useState, useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { getAuth } from 'firebase/auth';
import { ProfilePic } from '../profilepic/profilepic';
import { ProfileButton } from '../profilebutton/profilebutton';
import { Link, useNavigate } from 'react-router-dom';
import { useGetDelAddDeck } from '../../hooks/getDelAddDeck';
import { CardContext } from '../../contexts/cards/cardcontext';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(userContext);
    const { getDeck } = useGetDelAddDeck();
    const [loading, setLoading] = useState(false);
    const { setFilteredCards } = useContext(CardContext);
    const navigate = useNavigate();
    
    // Theme state
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        const saved = localStorage.getItem('theme');
        return (saved as 'dark' | 'light') || 'dark';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const setDecksHandler = async () => {
        setLoading(true);
        setFilteredCards([]);
        const deck = await getDeck(user.uid);
        setFilteredCards(deck);
        setLoading(false);
        navigate('/deck');
    };

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user);
            } else return;
        });
        
        // Apply saved theme on mount
        document.documentElement.setAttribute('data-theme', theme);
    }, []);

    return (
        <header className="Header">
            {/* Logo */}
            <Link to="/" className="Header__logo">
                <img src={logo} alt="Magic App logo" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="Header__nav">
                <Link to="/" className="Header__btn Header__btn--primary">
                    Home
                </Link>
                <Link to="/catalogue" className="Header__btn Header__btn--secondary">
                    Catalogue
                </Link>
                <Link to="/secret-lair" className="Header__btn Header__btn--special">
                    Secret Lair
                </Link>
                <Link to="/about" className="Header__btn Header__btn--secondary">
                    About
                </Link>
                {user && (
                    <button
                        className={`Header__btn Header__btn--accent ${loading ? 'btn__loading' : ''}`}
                        onClick={setDecksHandler}
                    >
                        <span>My Decks</span>
                    </button>
                )}
            </nav>

            {/* User section */}
            <div className="Header__user">
                <button 
                    className="Header__theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? (
                        <span className="Header__theme-icon">☀️</span>
                    ) : (
                        <span className="Header__theme-icon">🌙</span>
                    )}
                </button>
                {user && <ProfilePic />}
                <ProfileButton />
            </div>

            {/* Mobile burger button */}
            <button
                className="Header__burger"
                data-testid="burger-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <i className="fas fa-times"></i>
                ) : (
                    <i className="fas fa-bars"></i>
                )}
            </button>

            {/* Mobile menu */}
            {isOpen && (
                <div className="Header__mobile-menu" data-testid="burger-menu">
                    <nav className="Header__mobile-nav">
                        <Link 
                            to="/" 
                            className="Header__mobile-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/catalogue" 
                            className="Header__mobile-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            Catalogue
                        </Link>
                        <Link 
                            to="/secret-lair" 
                            className="Header__mobile-btn Header__mobile-btn--special"
                            onClick={() => setIsOpen(false)}
                        >
                            ✦ Secret Lair
                        </Link>
                        <Link 
                            to="/about" 
                            className="Header__mobile-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        {user && (
                            <button
                                className={`Header__mobile-btn Header__mobile-btn--accent ${loading ? 'btn__loading' : ''}`}
                                onClick={() => {
                                    setDecksHandler();
                                    setIsOpen(false);
                                }}
                            >
                                <span>My Decks</span>
                            </button>
                        )}
                    </nav>
                    <div className="Header__mobile-auth">
                        <button 
                            className="Header__mobile-theme-toggle"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                        <ProfileButton />
                    </div>
                </div>
            )}
        </header>
    );
};
