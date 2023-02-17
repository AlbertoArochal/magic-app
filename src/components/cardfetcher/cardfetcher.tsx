import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { CardType } from '../../models/cardtype';
import { Modal } from '../modal/modal';
import { useState } from 'react';
import { Firedb } from '../firebase/firebase';
import { ref, remove } from 'firebase/database';
import { userContext } from '../../contexts/user/usercontext';
import { useLocation } from 'react-router-dom';
import { useGetDelAddDeck } from '../hooks/getDelAddDeck';

export const CardFetcher = () => {
    const { user } = useContext(userContext);
    const { cards, filteredCards } = useContext(CardContext);
    const [showModal, setShowModal] = useState(false);
    const [cardsDeleted, setCardsDeleted] = useState(0);
    const { setFilteredCards } = useContext(CardContext);
    const { getDeck } = useGetDelAddDeck();

    const data = filteredCards.length > 0 ? filteredCards : cards;

    const CardClickedHandler = (card: CardType) => {
        localStorage.setItem('card', JSON.stringify(card));
        setShowModal(true);
    };

    const shouldRenderDeleteButton = filteredCards.length <= 50;

    const deleteButtonHandler = async (card: string) => {
        await remove(ref(Firedb, 'users/' + user.uid + '/decks/deck1/' + card));
        const deck = await getDeck(user.uid);
        setFilteredCards(deck);
        setCardsDeleted(cardsDeleted + 1);
    };

    return (
        <>
            <div className="catalogue__content">
                {data.map((card: CardType) => (
                    <div
                        key={card.name + 'key'}
                        className="Catalogue__card"
                        onClick={() => {
                            CardClickedHandler(card);
                        }}
                    >
                        <img
                            src={card.image_uris.small}
                            alt={card.name}
                            className="Catalogue__card__img"
                        />
                        {shouldRenderDeleteButton && (
                            <button
                                className="Catalogue__carddelete"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    deleteButtonHandler(card.name);
                                }}
                            >
                                X
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {showModal && <Modal closeModal={setShowModal} />}
        </>
    );
};
