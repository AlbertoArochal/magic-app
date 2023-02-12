import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { useGetDelAddDeck } from '../hooks/getDelAddDeck';
import { useEffect, useState } from 'react';
import { CardType } from '../../models/cardtype';

export const DeckPage = () => {
    const { user } = useContext(userContext);
    const { getDeck } = useGetDelAddDeck();
    const [decks, setDecks] = useState<CardType[]>([]);

    useEffect(() => {
        getDeck(user.uid).then((deck) => {
            setDecks(deck);
        });
    }, []);

    return (
        <div className="deck__container">
            <div className="deck__content">
                <h1 className="deck__title">Deck</h1>
                <div className="deck__card__container"></div>
            </div>
        </div>
    );
};
