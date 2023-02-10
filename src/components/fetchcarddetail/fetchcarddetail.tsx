import { CardType } from '../../models/cardtype';
import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { addCard } from '../services/addcard';

export const FetchCardDetail = ({
    setShowModal,
}: {
    setShowModal: (value: boolean) => void;
}) => {
    const { user } = useContext(userContext);
    const handleAddCard = async (uid: string, card: CardType) => {
        await addCard(uid, card);
    };

    const card = JSON.parse(localStorage.getItem('card') || '{}') as CardType;
    return (
        <div className="card__detail__container">
            <div className="card__detail__content">
                <div className="card__detail__img__container">
                    <img
                        src={card.image_uris.large}
                        alt={card.name}
                        loading="lazy"
                        className="card__detail__img"
                    />
                </div>
                <div className="card__detail__text__container">
                    <div className="Modal__button__container">
                        <button
                            className="Modal__button"
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>
                    </div>
                    <h1 className="card__detail__title">{card.name}</h1>
                    <p className="card__detail__type">{card.type_line}</p>
                    <p className="card__detail__text">{card.oracle_text}</p>
                    <p className="card__detail__flavor">{card.flavor_text}</p>
                    <p className="card__detail__mana">
                        {' '}
                        Mana Cost: {card.mana_cost}
                    </p>
                    <p className="card__detail__power">
                        {card.power} / {card.toughness}{' '}
                    </p>
                    <p className="card__detail__artist">
                        Illustrated by {card.artist}
                    </p>
                    {user ? (
                        <div className="Addbutton__container">
                            <button
                                className="Card__addcard__button"
                                onClick={() => handleAddCard(user.uid, card)}
                            >
                                Add to Deck 💖
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
