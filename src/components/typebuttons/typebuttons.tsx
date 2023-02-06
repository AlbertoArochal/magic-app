import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
export const TypeButtons = () => {
    const types = [
        'Creature',
        'Sorcery',
        'Enchantment',
        'Artifact',
        'Land',
        'Planeswalker',
        'Instant',
    ];
    const { cards } = useContext(CardContext);
    return (
        <div className="TypeButtons">
            {types.map((type) => {
                const selectedCard = cards.find((card) =>
                    card.type_line.includes(type)
                );
                if (!selectedCard) {
                    return null;
                }
                return (
                    <div className="Typebutton__container">
                        <h3 className="Typebutton__text">{type}</h3>
                        <img
                            className="TypeButton"
                            key={type}
                            src={selectedCard.image_uris.art_crop}
                            alt={selectedCard.name}
                        />
                    </div>
                );
            })}
        </div>
    );
};
