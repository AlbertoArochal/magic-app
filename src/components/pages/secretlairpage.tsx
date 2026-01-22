import { Header } from '../header/header';
import { useEffect, useState, useRef } from 'react';
import { CollectionType } from '../../contexts/cards/cardcontext';
import { ScryfallApi } from '../../services/scryfallapi';
import { CardType } from '../../models/cardtype';
import { Modal } from '../modal/modal';
import { Link } from 'react-router-dom';

const api = new ScryfallApi();

export const SecretLairPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState<CardType[]>([]);
    const [featuredCards, setFeaturedCards] = useState<CardType[]>([]);
    const [secretLairSets, setSecretLairSets] = useState<CollectionType[]>([]);
    const [selectedSet, setSelectedSet] = useState<string | null>(null);
    const [selectedSetCards, setSelectedSetCards] = useState<CardType[]>([]);
    const [loadingSetCards, setLoadingSetCards] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalCards, setTotalCards] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    
    const showcaseRef = useRef<HTMLElement>(null);

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Load Secret Lair sets for the file manager
                const sets = await api.getSecretLairSets();
                setSecretLairSets(sets);

                // Load featured cards for hero section
                const featured: CardType[] = [];
                for (let i = 0; i < 4; i++) {
                    const card = await api.getRandomSecretLairArt();
                    if (card) featured.push(card);
                }
                setFeaturedCards(featured);

                // Load first page of cards
                const response = await api.getSecretLairCards(1);
                setCards(response.cards);
                setHasMore(response.paginationInfo.hasMore);
                setTotalCards(response.paginationInfo.totalCards);
            } catch (error) {
                console.error('Error loading Secret Lair data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Handle drawer click - load cards for selected set
    const handleDrawerClick = async (setName: string, setCode?: string) => {
        if (selectedSet === setName) {
            // Deselect
            setSelectedSet(null);
            setSelectedSetCards([]);
            return;
        }

        if (!setCode) {
            console.error('No set code available');
            return;
        }

        setSelectedSet(setName);
        setLoadingSetCards(true);
        setSelectedSetCards([]);

        try {
            const cards = await api.getCardsBySetCode(setCode);
            setSelectedSetCards(cards);
            
            // Scroll to showcase section
            setTimeout(() => {
                showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error('Error loading set cards:', error);
        } finally {
            setLoadingSetCards(false);
        }
    };

    const loadMoreCards = async () => {
        if (loadingMore || !hasMore) return;
        
        setLoadingMore(true);
        try {
            const nextPage = page + 1;
            const response = await api.getSecretLairCards(nextPage);
            setCards(prev => [...prev, ...response.cards]);
            setPage(nextPage);
            setHasMore(response.paginationInfo.hasMore);
        } catch (error) {
            console.error('Error loading more cards:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleCardClick = (card: CardType) => {
        localStorage.setItem('card', JSON.stringify(card));
        setShowModal(true);
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="SecretLair__loading">
                    <div className="SecretLair__spinner" />
                    <p>Entering the Secret Lair...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="SecretLair">
                {/* Hero Section with featured cards */}
                <section className="SecretLair__hero">
                    <div className="SecretLair__hero-bg">
                        {featuredCards.map((card, index) => (
                            <div 
                                key={`bg-${index}`} 
                                className="SecretLair__hero-bg-card"
                                style={{ 
                                    backgroundImage: `url(${card.image_uris.art_crop})`,
                                    animationDelay: `${index * 0.5}s`
                                }}
                            />
                        ))}
                    </div>
                    <div className="SecretLair__hero-content">
                        <h1 className="SecretLair__title">
                            <span className="SecretLair__title-secret">SECRET</span>
                            <span className="SecretLair__title-lair">LAIR</span>
                        </h1>
                        <p className="SecretLair__subtitle">
                            Exclusive drops. Limited editions. Unique art.
                        </p>
                        <div className="SecretLair__stats">
                            <div className="SecretLair__stat">
                                <span className="SecretLair__stat-number">{totalCards.toLocaleString()}</span>
                                <span className="SecretLair__stat-label">Cards</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filing Cabinet Section */}
                <section className="SecretLair__cabinet-section">
                    <h2 className="SecretLair__section-title">Collection Archives</h2>
                    <p className="SecretLair__cabinet-intro">
                        {secretLairSets.length} Secret Lair drops catalogued
                    </p>
                    
                    <div className="FilingCabinet">
                        <div className="FilingCabinet__top">
                            <div className="FilingCabinet__label-holder">
                                <span>SECRET LAIR</span>
                                <span>ARCHIVES</span>
                            </div>
                        </div>
                        
                        <div className="FilingCabinet__body">
                            {secretLairSets.map((set, index) => (
                                <div 
                                    key={`drawer-${index}`}
                                    className={`Drawer ${selectedSet === set.name ? 'Drawer--open' : ''}`}
                                    onClick={() => handleDrawerClick(set.name, set.code)}
                                >
                                    <div className="Drawer__front">
                                        <div className="Drawer__handle"></div>
                                        <div className="Drawer__label-frame">
                                            <div className="Drawer__label">
                                                <img 
                                                    src={set.icon} 
                                                    alt="" 
                                                    className="Drawer__icon"
                                                />
                                                <span className="Drawer__name">
                                                    {set.name.replace('Secret Lair ', '').replace('Drop Series: ', '')}
                                                </span>
                                                <span className="Drawer__year">{set.year.substring(0, 4)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="FilingCabinet__base">
                            <div className="FilingCabinet__feet"></div>
                        </div>
                    </div>
                </section>

                {/* Cards Showcase - shows selected set or featured */}
                <section className="SecretLair__showcase" ref={showcaseRef}>
                    <div className="SecretLair__showcase-header">
                        <h2 className="SecretLair__section-title">
                            {selectedSet 
                                ? selectedSet.replace('Secret Lair ', '').replace('Drop Series: ', '')
                                : 'Featured Drops'
                            }
                        </h2>
                        {selectedSet && selectedSetCards.length > 0 && (
                            <div className="SecretLair__card-count">
                                <span className="SecretLair__card-count-number">{selectedSetCards.length}</span>
                                <span className="SecretLair__card-count-label">cards</span>
                            </div>
                        )}
                    </div>
                    
                    {loadingSetCards ? (
                        <div className="SecretLair__showcase-loading">
                            <div className="SecretLair__spinner" />
                            <p>Loading collection...</p>
                        </div>
                    ) : selectedSet ? (
                        <div className="SecretLair__grid">
                            {selectedSetCards.map((card, index) => (
                                <div 
                                    key={`showcase-${card.name}-${index}`}
                                    className="SecretLair__card"
                                    onClick={() => handleCardClick(card)}
                                >
                                    <img 
                                        src={card.image_uris.normal || card.image_uris.large} 
                                        alt={card.name}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="SecretLair__grid">
                            {featuredCards.map((card, index) => (
                                <div 
                                    key={`featured-${index}`}
                                    className="SecretLair__card"
                                    onClick={() => handleCardClick(card)}
                                >
                                    <img 
                                        src={card.image_uris.normal || card.image_uris.large} 
                                        alt={card.name}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {selectedSet && selectedSetCards.length === 0 && !loadingSetCards && (
                        <p className="SecretLair__showcase-empty">No cards found for this collection.</p>
                    )}
                    
                    {selectedSet && (
                        <button 
                            className="SecretLair__showcase-clear"
                            onClick={() => { setSelectedSet(null); setSelectedSetCards([]); }}
                        >
                            ← Back to Featured
                        </button>
                    )}
                </section>

                {/* All Cards Grid */}
                <section className="SecretLair__gallery">
                    <h2 className="SecretLair__section-title">Browse Collection</h2>
                    <div className="SecretLair__grid">
                        {cards.map((card, index) => (
                            <div 
                                key={`card-${card.name}-${index}`}
                                className="SecretLair__card"
                                onClick={() => handleCardClick(card)}
                            >
                                <img 
                                    src={card.image_uris.small} 
                                    alt={card.name}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    {hasMore && (
                        <button 
                            className="SecretLair__load-more"
                            onClick={loadMoreCards}
                            disabled={loadingMore}
                        >
                            {loadingMore ? (
                                <span className="SecretLair__load-more-spinner" />
                            ) : (
                                'Load More'
                            )}
                        </button>
                    )}
                </section>

                {/* Back link */}
                <div className="SecretLair__back">
                    <Link to="/" className="SecretLair__back-btn">
                        ← Back to Timeline
                    </Link>
                </div>
            </main>

            {showModal && <Modal closeModal={setShowModal} />}
        </>
    );
};
