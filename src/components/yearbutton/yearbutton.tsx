import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { CardType } from '../../models/cardtype';

export const YearButton = () => {
    const { cards } = useContext(CardContext);
    const highlighted = cards.find((card) => card.flavor_text !== null);
    const image = {
        card: highlighted?.image_uris.art_crop,
        name: highlighted?.name,
    };
    const year = cards[0].released_at.split('-')[0];

    return (
        <div className="Year__container">
            <img src={image.card} alt={image.name} className="YearButton" />
            <h1 className="YearButton__title">{year}</h1>
        </div>
    );
};
