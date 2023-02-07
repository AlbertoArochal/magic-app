import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { CardType } from '../../models/cardtype';

export const CardFetcher = () => {
    const { cards } = useContext(CardContext);
    return (
        <div className="catalogue__content">
            {cards.map((card: CardType) => (
                <div key={card.name + 'key'} className="Catalogue__card">
                    <img
                        src={card.image_uris.small}
                        alt={card.name}
                        loading="lazy"
                        className="Catalogue__card__img"
                    />
                </div>
            ))}
        </div>
    );
};
