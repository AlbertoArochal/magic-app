import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { CardType } from '../../models/cardtype';
import { Modal } from '../modal/modal';
import { useState } from 'react';

export const CardFetcher = () => {
    const { cards } = useContext(CardContext);
    const [showModal, setShowModal] = useState(false);

    const CardClickedHandler = (card: CardType) => {
        localStorage.setItem('card', JSON.stringify(card));
        setShowModal(true);
    };

    return (
        <>
            <div className="catalogue__content">
                {cards.map((card: CardType) => (
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
                    </div>
                ))}
            </div>
            {showModal && <Modal closeModal={setShowModal} />}
        </>
    );
};
