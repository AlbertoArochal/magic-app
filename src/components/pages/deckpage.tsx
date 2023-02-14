import { useContext } from 'react';
import { userContext } from '../../contexts/user/usercontext';
import { useGetDelAddDeck } from '../hooks/getDelAddDeck';
import { useEffect, useState } from 'react';
import { CardType } from '../../models/cardtype';
import { Header } from '../header/header';
import { CardFetcher } from '../cardfetcher/cardfetcher';

export const DeckPage = () => {
    const { user } = useContext(userContext);
    const { getDeck } = useGetDelAddDeck();
    const [filteredCards, setFilteredCards] = useState<CardType[]>([]);

    useEffect(() => {
        if (user) {
            getDeck(user.uid).then((deck) => {
                setFilteredCards(deck);
            });
        }
    }, [user]);

    return (
        <>
            <Header />
            <div
                className="Catalogue__container"
                key={new Date().getTime().toString + 'container'}
            >
                {' '}
                <CardFetcher />
                <div
                    className="catalogue__header"
                    key={new Date().getTime().toString + 'header'}
                >
                    <h1
                        className="catalogue__title"
                        key={new Date().getTime().toString + 'title'}
                    >
                        Your Deck
                    </h1>
                </div>
            </div>
        </>
    );
};
