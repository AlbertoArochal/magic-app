import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { useGetDelAddDeck } from '../hooks/getDelAddDeck';
import { useEffect, useState } from 'react';
import { CardType } from '../../models/cardtype';
import { Header } from '../header/header';

export const DeckPage = () => {
    const { user } = useContext(userContext);
    const { getDeck } = useGetDelAddDeck();
    const [decks, setDecks] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);

    /*useEffect(() => {
        getDeck(user.uid).then((deck) => {
            setTimeout(() => {
                setDecks(deck);
                setLoading(false);
            }, 0);
        });
    }, []); */

    return (
        <>
            <Header />
            <div className="deck__container">
                <div className="deck__content">
                    <h1 className="deck__title">Deck</h1>
                    <div className="deck__card__container"></div>
                </div>
            </div>
        </>
    );
};
