import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import github from '../../assets/img/github.png';
import linkedin from '../../assets/img/linkedin.png';
import mail from '../../assets/img/mail.png';
import logo from '../../assets/img/logo.png';

export const AboutPage = () => {
    return (
        <>
            <Header />
            <main className="About">
                <div className="About__hero">
                    <h1 className="About__title">ABOUT</h1>
                    <div className="About__logo-container">
                        <img src={logo} alt="Magic App Logo" className="About__logo" />
                    </div>
                </div>

                <section className="About__section">
                    <h2 className="About__heading">THE PROJECT</h2>
                    <div className="About__content">
                        <p>
                            <strong>Magic Time Machine</strong> is a web application that lets you explore
                            the history of Magic: The Gathering through time. Browse cards, sets, and
                            collections from 1993 to the present day.
                        </p>
                        <p>
                            The app automatically updates with new releases, pulling data directly from
                            the Scryfall API. Each year showcases the sets released, allowing you to
                            filter cards by color, type, and build your own decks.
                        </p>
                    </div>
                </section>

                <section className="About__section About__section--alt">
                    <h2 className="About__heading">FEATURES</h2>
                    <div className="About__features">
                        <div className="About__feature">
                            <span className="About__feature-icon">⏰</span>
                            <h3>Timeline</h3>
                            <p>Navigate through 30+ years of MTG history</p>
                        </div>
                        <div className="About__feature">
                            <span className="About__feature-icon">🎨</span>
                            <h3>Color Filter</h3>
                            <p>Filter cards by mana color</p>
                        </div>
                        <div className="About__feature">
                            <span className="About__feature-icon">📦</span>
                            <h3>Type Filter</h3>
                            <p>Browse by card type</p>
                        </div>
                        <div className="About__feature">
                            <span className="About__feature-icon">📚</span>
                            <h3>Deck Builder</h3>
                            <p>Create and save your own decks</p>
                        </div>
                    </div>
                </section>

                <section className="About__section">
                    <h2 className="About__heading">THE DEVELOPER</h2>
                    <div className="About__developer">
                        <div className="About__developer-info">
                            <h3>Alberto Rocha Lopez</h3>
                            <p>
                                Full-stack developer passionate about creating engaging web experiences.
                                This project combines my love for Magic: The Gathering with modern web
                                technologies like React, TypeScript, and Firebase.
                            </p>
                            <p className="About__year">© 2023 - {new Date().getFullYear()}</p>
                        </div>
                        <div className="About__links">
                            <a 
                                href="https://github.com/your-github" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="About__link"
                            >
                                <img src={github} alt="GitHub" />
                                <span>GitHub</span>
                            </a>
                            <a 
                                href="https://linkedin.com/in/your-linkedin" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="About__link"
                            >
                                <img src={linkedin} alt="LinkedIn" />
                                <span>LinkedIn</span>
                            </a>
                            <a 
                                href="mailto:arochaldev@gmail.com"
                                className="About__link"
                            >
                                <img src={mail} alt="Email" />
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="About__section About__section--cta">
                    <h2 className="About__heading">START EXPLORING</h2>
                    <div className="About__cta">
                        <Link to="/" className="About__btn About__btn--primary">
                            Go to Timeline
                        </Link>
                        <Link to="/catalogue" className="About__btn About__btn--secondary">
                            Browse Catalogue
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
};
