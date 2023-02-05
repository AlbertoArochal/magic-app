import { createContext } from 'react';

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

export const CardContext = createContext({
    collections: [] as CollectionType[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCollections: (collections: CollectionType[]) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
});
