import {
    CollectionsReducer,
    CardsReducer,
    FilteredCardsReducer,
} from '../../components/reducers/carsreducer/cardsreducer';
import { ReactNode } from 'react';
import { useReducer } from 'react';
import { CardType } from '../../models/cardtype';
import { initialCards, CardContext, initialFilteredCards } from './cardcontext';
import { CollectionType } from './cardcontext';

export const CardProvider = ({ children }: { children: ReactNode }) => {
    const [collections, collectionsDispatch] = useReducer(CollectionsReducer, {
        collections: [],
    });

    const [cards, cardsDispatch] = useReducer(CardsReducer, {
        ...initialCards,
    });
    const [filteredCards, filteredCardsDispatch] = useReducer(
        FilteredCardsReducer,
        {
            ...initialFilteredCards,
        }
    );

    return (
        <CardContext.Provider
            value={{
                collections: collections.collections,
                setCollections: (collections: CollectionType[]) =>
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
                filteredCards: filteredCards.filteredCards,
                setFilteredCards: (filteredCards: CardType[]) =>
                    filteredCardsDispatch({
                        type: 'SET_FILTERED_CARDS',
                        payload: filteredCards,
                    }),
            }}
        >
            {children}
        </CardContext.Provider>
    );
};
