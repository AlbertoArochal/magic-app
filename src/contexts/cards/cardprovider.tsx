import {
    CollectionsReducer,
    CardsReducer,
    FilteredCardsReducer,
    QueryReducer,
} from '../../components/reducers/carsreducer/cardsreducer';
import { ReactNode, useReducer, useState } from 'react';
import { CardType } from '../../models/cardtype';
import {
    initialCards,
    CardContext,
    initialFilteredCards,
    CollectionType,
    PaginationInfo,
    initialPaginationInfo,
} from './cardcontext';

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
    
    // New state for pagination info
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(initialPaginationInfo);
    const [activeFilter, setActiveFilter] = useState<{ type: 'year' | 'color' | 'cardType'; value: string } | null>(null);
    const [isLoadingPage, setIsLoadingPage] = useState(false);

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
                    setPaginationInfo(initialPaginationInfo);
                    setActiveFilter(null);
                },
                pagination: pagination,
                paginationInfo,
                setPaginationInfo,
                activeFilter,
                setActiveFilter,
                isLoadingPage,
                setIsLoadingPage,
            }}
        >
            {children}
        </CardContext.Provider>
    );
};
