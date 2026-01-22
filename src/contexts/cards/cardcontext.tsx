import { createContext } from 'react';
import { CardType } from '../../models/cardtype';

export type Collections = {
    collections: CollectionType[];
};

export type CollectionType = {
    year: string;
    name: string;
    icon: string;
    set_type: string;
    code?: string;
};

// Pagination info returned from API
export type PaginationInfo = {
    hasMore: boolean;
    totalCards: number;
    currentPage: number;
};

export const initialCollections = {
    collections: [],
};

export const initialCards = {
    cards: [],
};

export const initialFilteredCards = {
    filteredCards: [],
};

export const initialPaginationInfo: PaginationInfo = {
    hasMore: false,
    totalCards: 0,
    currentPage: 1,
};

export type CardContextType = {
    collections: CollectionType[];
    setCollections: (collections: CollectionType[]) => void;
    cards: CardType[];
    setCards: (cards: CardType[]) => void;
    filteredCards: CardType[];
    setFilteredCards: (cards: CardType[]) => void;
    page: number;
    setPage: (page: number) => void;
    resetPage: () => void;
    pagination: number;
    // New pagination info
    paginationInfo: PaginationInfo;
    setPaginationInfo: (info: PaginationInfo) => void;
    // Filter state for pagination
    activeFilter: { type: 'year' | 'color' | 'cardType'; value: string } | null;
    setActiveFilter: (filter: { type: 'year' | 'color' | 'cardType'; value: string } | null) => void;
    isLoadingPage: boolean;
    setIsLoadingPage: (loading: boolean) => void;
};


export const CardContext = createContext<CardContextType>({
    collections: [] as CollectionType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCollections: () => {},
    cards: [] as CardType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCards: () => {},
    filteredCards: [] as CardType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setFilteredCards: () => {},
    page: 1,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPage: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    resetPage: () => {},
    pagination: 1,
    // New pagination info
    paginationInfo: initialPaginationInfo,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPaginationInfo: () => {},
    activeFilter: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setActiveFilter: () => {},
    isLoadingPage: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsLoadingPage: () => {},
});
