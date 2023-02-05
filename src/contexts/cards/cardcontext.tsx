import { createContext } from 'react';
import { CardType } from '../../models/cardtype';

export type Collections = {
    collections: CollectionType[];
};

export type CollectionType = {
    year: string;
    name: string;
    icon: string;
};

export const initialCollections = {
    collections: [],
};

export const initialCards = {
    cards: [],
};

export type CardContextType = {
    collections: CollectionType[];
    setCollections: (collections: CollectionType[]) => void;
    cards: CardType[];
    setCards: (cards: CardType[]) => void;
};

export const CardContext = createContext<CardContextType>({
    collections: [] as CollectionType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCollections: (collections: CollectionType[]) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cards: [] as CardType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCards: (cards: CardType[]) => {},
});
