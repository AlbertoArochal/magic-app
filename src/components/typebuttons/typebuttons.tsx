import { CardContext } from '../../contexts/cards/cardcontext';
import { useContext } from 'react';
import { useCards } from '../hooks/logdelete/useCards';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const TypeButtons = () => {
    const { GetByYearAndType } = useCards();
    const navigate = useNavigate();
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
    const year = cards[0].released_at.slice(0, 4);
    const GetByTypeHandler = (year: number, type: string) => {
        GetByYearAndType(year, type).then(() => {
            navigate('/catalogue');
        });
    };

    return (
        <div
            className="TypeButtons"
            key={new Date().getTime().toString + 'div'}
        >
            {types.map((type) => {
                const selectedCard = cards.find((card) =>
                    card.type_line.includes(type)
                );
                if (!selectedCard) {
                    return null;
                }
                return (
                    <div
                        className="Typebutton__container"
                        key={new Date().getTime().toString + 'typebutton'}
                    >
                        <h3
                            className="Typebutton__text"
                            key={new Date().getTime().toString + type + 'div'}
                        >
                            {type}
                        </h3>
                        <Link to="/catalogue">
                            <img
                                className="TypeButton"
                                key={new Date().getTime().toString + type}
                                src={selectedCard.image_uris.art_crop}
                                alt={selectedCard.name}
                                onClick={() => GetByTypeHandler(+year, type)}
                            />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
