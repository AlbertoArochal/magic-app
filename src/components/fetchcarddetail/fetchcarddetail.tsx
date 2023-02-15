import { CardType } from '../../models/cardtype';
import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { useGetDelAddDeck } from '../hooks/getDelAddDeck';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const FetchCardDetail = ({
    setShowModal,
}: {
    setShowModal: (value: boolean) => void;
}) => {
    const { user } = useContext(userContext);
    const { addCard } = useGetDelAddDeck();
    const location = useLocation();
    const [addedToDeck, setAddedToDeck] = useState(false);

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
                        className="uris__large"
                    />

                    <img
                        src={card.image_uris.art_crop}
                        alt={card.name}
                        className="uris__art__crop"
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
                    {user && location.pathname !== '/deck' ? (
                        <div className="Addbutton__container">
                            <button
                                className="Card__addcard__button"
                                onClick={() => {
                                    handleAddCard(user.uid, card);
                                    setAddedToDeck(true);
                                }}
                            >
                                {addedToDeck
                                    ? '✔️ Added to Deck'
                                    : 'Add to Deck 💖'}
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
