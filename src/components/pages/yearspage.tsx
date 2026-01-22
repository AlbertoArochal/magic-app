import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { TypeButtons } from '../typebuttons/typebuttons';
import { FlavorText } from '../flavortext/flavortext';
import { useEffect, useContext, useState, useRef } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useCards } from '../../hooks/logdelete/useCards';
import { Link } from 'react-router-dom';

export const YearsPage = () => {
    const { resetPage, cards, paginationInfo } = useContext(CardContext);
    const { GetFetchCardsByYear } = useCards();
    const [isLoading, setIsLoading] = useState(true);
    const hasLoaded = useRef(false);

    const year = cards && cards.length > 0 ? cards[0].released_at.split('-')[0] : '';

    useEffect(() => {
        window.scrollTo(0, 0);
        resetPage();

        // Prevent double loading in StrictMode
        if (hasLoaded.current) {
            setIsLoading(false);
            return;
        }

        const storedYear = localStorage.getItem('year');
        
        // If we have cards already, show them immediately
        if (cards && cards.length > 0) {
            setIsLoading(false);
            hasLoaded.current = true;
            return;
        }

        // Otherwise, load cards for the year
        if (storedYear) {
            hasLoaded.current = true;
            GetFetchCardsByYear(parseInt(storedYear), 1)
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    // Also watch for cards changes from YearCard navigation
    useEffect(() => {
        if (cards && cards.length > 0 && isLoading) {
            setIsLoading(false);
        }
    }, [cards, isLoading]);

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="YearsPage__loading">
                    <div className="YearsPage__spinner" />
                    <p>Loading cards...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="YearsPage">
                <YearButton />
                <FlavorText />
                
                {paginationInfo.totalCards > 0 && (
                    <div className="YearsPage__stats">
                        <span className="YearsPage__stats-text">
                            {paginationInfo.totalCards.toLocaleString()} cards from {year}
                        </span>
                        <Link to="/catalogue" className="YearsPage__browse-all">
                            Browse All Cards →
                        </Link>
                    </div>
                )}
                
                <section className="YearsPage__section">
                    <h2 className="YearsPage__section-title">BY COLOR</h2>
                    <ColorScroll />
                </section>
                
                <section className="YearsPage__section">
                    <h2 className="YearsPage__section-title">BY TYPE</h2>
                    <TypeButtons />
                </section>

                <div className="YearsPage__back">
                    <Link to="/" className="YearsPage__back-btn">
                        ← BACK TO TIMELINE
                    </Link>
                </div>
            </main>
        </>
    );
};
