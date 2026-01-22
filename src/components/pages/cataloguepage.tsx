import { Header } from '../header/header';
import { CardFetcher } from '../cardfetcher/cardfetcher';
import { useEffect, useContext, useState, useRef } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { PageButtons } from '../pagebuttons/pagebuttons';
import { useCards } from '../../hooks/logdelete/useCards';
import { Link } from 'react-router-dom';

export const CataloguePage = () => {
    const { cards, filteredCards, activeFilter, isLoadingPage } = useContext(CardContext);
    const { GetFetchCardsByYear, ClearFilter } = useCards();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const hasLoaded = useRef(false);
    
    const period = localStorage.getItem('year') ?? '2011';

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Prevent double loading in StrictMode
        if (hasLoaded.current) {
            setIsInitialLoading(false);
            return;
        }
        
        // If we already have cards, don't reload
        if (cards && cards.length > 0) {
            setIsInitialLoading(false);
            hasLoaded.current = true;
            return;
        }
        
        // Load initial cards
        hasLoaded.current = true;
        GetFetchCardsByYear(+period, 1)
            .finally(() => setIsInitialLoading(false));
    }, []);

    const handleClearFilter = () => {
        ClearFilter(+period);
    };

    const displayCards = filteredCards.length > 0 ? filteredCards : cards;

    if (isInitialLoading) {
        return (
            <>
                <Header />
                <div className="Catalogue__loading">
                    <div className="Catalogue__spinner" />
                    <p>Loading cards...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />

            <div className="Catalogue__container">
                <div className="Catalogue__header">
                    <div className="Catalogue__title-row">
                        <h1 className="Catalogue__title">
                            {period} Catalogue
                        </h1>
                        <Link to="/years" className="Catalogue__back-link">
                            ← Back to Year
                        </Link>
                    </div>
                    
                    {activeFilter && activeFilter.type !== 'year' && (
                        <div className="Catalogue__filter-info">
                            <span className="Catalogue__filter-label">
                                Filtering by {activeFilter.type === 'color' ? 'Color' : 'Type'}: 
                                <strong> {activeFilter.value}</strong>
                            </span>
                            <button 
                                onClick={handleClearFilter}
                                className="Catalogue__clear-filter"
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </div>
                
                <PageButtons period={+period} />
                
                {isLoadingPage ? (
                    <div className="Catalogue__page-loading">
                        <div className="Catalogue__spinner Catalogue__spinner--small" />
                        <p>Loading page...</p>
                    </div>
                ) : displayCards.length === 0 ? (
                    <div className="Catalogue__empty">
                        <p>No cards found.</p>
                    </div>
                ) : (
                    <CardFetcher />
                )}
                
                <PageButtons period={+period} />
            </div>
        </>
    );
};
