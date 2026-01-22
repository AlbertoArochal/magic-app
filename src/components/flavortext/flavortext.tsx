import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';

export const FlavorText = () => {
    const { cards } = useContext(CardContext);
    
    // Find a card that has a valid flavor_text (not null, undefined, or empty)
    const highlighted = cards.find((card) => 
        card.flavor_text && 
        card.flavor_text.trim().length > 0
    );
    
    const flavor = highlighted?.flavor_text;

    if (!flavor) return null;

    return (
        <div className="FlavorText__container">
            <p className="FlavorText__text">{flavor}</p>
            <span className="FlavorText__author">— {highlighted?.name}</span>
        </div>
    );
};
