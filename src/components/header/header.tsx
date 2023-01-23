import { Link, Router } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
export const Header = () => {
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
                <button className="Header__button profile">PROFILE</button>
            </div>
        </div>
    );
};
