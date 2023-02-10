import {
    CollectionsReducer,
    CardsReducer,
} from '../../components/reducers/carsreducer/cardsreducer';
import { useReducer } from 'react';
import { CardType } from '../../models/cardtype';
import { initialCards, CardContext } from './cardcontext';

export const CardProvider = ({ children }: any) => {
    const [collections, collectionsDispatch] = useReducer(CollectionsReducer, {
        collections: [],
    });

    const [cards, cardsDispatch] = useReducer(CardsReducer, {
        ...initialCards,
    });

    return (
        <CardContext.Provider
            value={{
                collections: collections.collections,
                setCollections: (collections: any[]) =>
                    collectionsDispatch({
                        type: 'SET_COLLECTIONS',
                        payload: collections,
                    }),
                cards: cards.cards,
                setCards: (cards: CardType[]) =>
                    cardsDispatch({
                        type: 'SET_CARDS',
                        payload: cards,
                    }),
            }}
        >
            {children}
        </CardContext.Provider>
    );
};
