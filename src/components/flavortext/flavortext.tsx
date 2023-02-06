import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';

export const FlavorText = () => {
    const { cards } = useContext(CardContext);
    const highlighted = cards.find((card) => card.flavor_text !== null);
    const flavor = highlighted?.flavor_text;

    return (
        <div className="FlavorText__container">
            <h3 className="FlavorText__title">{flavor}</h3>
        </div>
    );
};
