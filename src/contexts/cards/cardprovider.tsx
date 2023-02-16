import {
    CollectionsReducer,
    CardsReducer,
    FilteredCardsReducer,
    QueryReducer,
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

    const [pagination, paginationDispatch] = useReducer(QueryReducer, 1);

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
                page: pagination,
                setPage: (page: number) => {
                    if (page < 1) {
                        page = 1;
                    }
                    paginationDispatch({
                        type: 'SET_PAGINATION',
                        payload: page,
                    });
                },
                resetPage: () => {
                    paginationDispatch({ type: 'RESET_PAGINATION' });
                },
                pagination: pagination,
            }}
        >
            {children}
        </CardContext.Provider>
    );
};
