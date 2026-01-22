import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export const YearButton = () => {
    const { cards } = useContext(CardContext);
    
    // Find a card that has a valid flavor_text (not null, undefined, or empty)
    const highlighted = cards.find((card) => 
        card.flavor_text && 
        card.flavor_text.trim().length > 0 &&
        card.image_uris?.art_crop
    );
    
    // Fallback to first card with an image if no card has flavor text
    const fallbackCard = cards.find((card) => card.image_uris?.art_crop);
    const selectedCard = highlighted || fallbackCard;
    
    const image = {
        card: selectedCard?.image_uris?.art_crop,
        name: selectedCard?.name,
    };
    const year = cards[0]?.released_at?.split('-')[0] || '';

    return (
        <div className="Year__container">
            <Link to="/catalogue">
                <img src={image.card} alt={image.name} className="YearButton" />
            </Link>
            <h1 className="YearButton__title">{year}</h1>
        </div>
    );
};
