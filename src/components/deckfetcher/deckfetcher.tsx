import { useContext } from 'react';
import { ref, remove } from 'firebase/database';
import { userContext } from '../../contexts/user/usercontext';
import { useGetDelAddDeck } from '../../hooks/getDelAddDeck';
import { Modal } from '../modal/modal';
import { useState } from 'react';
import { Firedb } from '../firebase/firebase';
import { CardContext } from '../../contexts/cards/cardcontext';
import { CardType } from '../../models/cardtype';

export const DeckFetcher = () => {
    const { user } = useContext(userContext);
    const { filteredCards } = useContext(CardContext);

    const { setFilteredCards } = useContext(CardContext);
    const { getDeck } = useGetDelAddDeck();

    const [showModal, setShowModal] = useState(false);
    const [cardsDeleted, setCardsDeleted] = useState(0);

    const data = filteredCards;

    const cardClickedHandler = (card: CardType) => {
        localStorage.setItem('card', JSON.stringify(card));
        setShowModal(true);
    };

    const removeButtonHandler = async (card: string) => {
        await remove(ref(Firedb, 'users/' + user.uid + '/decks/deck1/' + card));
        const deck = await getDeck(user.uid);
        setFilteredCards(deck);
        setCardsDeleted(cardsDeleted + 1);
    };

    return (
        <>
            <div className="catalogue__content Deck__content">
                {data.map((card: CardType) => (
                    <div
                        key={card.name + 'key'}
                        className="Catalogue__card Deck__card"
                        onClick={() => {
                            cardClickedHandler(card);
                        }}
                    >
                        <img
                            src={card.image_uris.small}
                            alt={card.name}
                            className="Catalogue__card__img Deck__card__img"
                        />

                        <button
                            className="Catalogue__carddelete Deck__carddelete"
                            onClick={(event) => {
                                event.stopPropagation();
                                removeButtonHandler(card.name);
                            }}
                        >
                            ❌
                        </button>
                    </div>
                ))}
            </div>
            {showModal && <Modal closeModal={setShowModal} />}
        </>
    );
};
