import { useContext, useState, useEffect, memo } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { useCards } from '../../hooks/logdelete/useCards';
import { useNavigate } from 'react-router-dom';
import { ScryfallApi } from '../../services/scryfallapi';

interface Props {
    year: string;
}

const api = new ScryfallApi();

const YearCard = memo(({ year }: Props) => {
    const { collections } = useContext(CardContext);
    const { GetFetchCardsByYear } = useCards();
    const sets = collections;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cardArtUrl, setCardArtUrl] = useState<string | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        
        // Small delay to stagger image requests across cards
        const delay = Math.random() * 300;
        const timeoutId = setTimeout(async () => {
            try {
                const artUrl = await api.getRandomCardArtByYear(parseInt(year));
                if (isMounted && artUrl) {
                    setCardArtUrl(artUrl);
                }
            } catch (error) {
                console.error(`Failed to fetch art for year ${year}:`, error);
            }
        }, delay);
        
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [year]);

    const setCardsHandler = async (yearNum: number) => {
        if (loading) return; // Prevent double clicks
        
        setLoading(true);
        localStorage.setItem('year', yearNum.toString());
        
        try {
            // Load data into context first
            await GetFetchCardsByYear(yearNum, 1);
            // Then navigate
            navigate('/years');
        } catch (e) {
            console.error('Failed to fetch cards:', e);
            // Still navigate even on error - YearsPage will handle loading
            navigate('/years');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="timeline__content timeline__card">
            <div className={`timeline__image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
                {cardArtUrl && (
                    <img
                        className="timeline__image"
                        src={cardArtUrl}
                        alt={`Random card art from ${year}`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                    />
                )}
                {!imageLoaded && (
                    <div className="timeline__image-placeholder" />
                )}
            </div>
            <h2 className="date">{year}</h2>
            <div className="description">
                {sets.map((set) => {
                    if (set.year.includes(year)) {
                        return (
                            <div
                                className="Description__container"
                                key={year.toString() + set.name}
                            >
                                <img
                                    src={set.icon}
                                    alt={set.name}
                                    className="icon"
                                    key={year.toString() + set.year + 'img'}
                                    loading="lazy"
                                />
                                <h4 key={year.toString() + set.year + 'h4'}>
                                    {set.name}
                                </h4>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="button__container">
                <button
                    onClick={() => setCardsHandler(+year)}
                    className={`bnt-more ${loading ? 'btn__loading' : ''}`}
                >
                    <span>Back to {year} →</span>
                </button>
            </div>
        </div>
    );
});

export default YearCard;
