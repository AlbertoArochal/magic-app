import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { CardType } from '../../models/cardtype';
import { Link } from 'react-router-dom';

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
            <Link to="/catalogue">
                <img src={image.card} alt={image.name} className="YearButton" />
            </Link>

            <h1 className="YearButton__title">{year}</h1>
        </div>
    );
};
