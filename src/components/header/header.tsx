import { Link, Router } from 'react-router-dom';
export const Header = () => {
    return (
        <div>
            <div className="Header__logo">
                <img
                    src="../src/assets/fivecolors.png"
                    alt="Five colors logo"
                />
            </div>
            <div className="Header__links">
                <nav>
                    <a href="/">Home</a>
                    <a href="/">Year</a>
                    <a href="/">Secret Lair</a>
                </nav>
                <button>My Decks</button>
                <button>Profile</button>
            </div>
        </div>
    );
};
