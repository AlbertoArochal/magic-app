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
};


export const CardContext = createContext<CardContextType>({
    collections: [] as CollectionType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCollections: (collections: CollectionType[]) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cards: [] as CardType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCards: (cards: CardType[]) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    filteredCards: [] as CardType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setFilteredCards: (cards: CardType[]) => {},
    page: 1,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPage: (newPage: number) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    resetPage: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    pagination: 1,
});
