import { CollectionType } from '../../../contexts/cards/cardcontext';
import { CardType } from '../../../models/cardtype';

export const addCollection = (collection: CollectionType) => {
    return {
        type: 'SET_COLLECTIONS',
        payload: collection,
    };
};

export const addCards = (cards: CardType[]) => {
    return {
        type: 'SET_CARDS',
        payload: cards,
    };
};

export const addFilteredCards = (cards: CardType[]) => {
    return {
        type: 'SET_FILTERED_CARDS',
        payload: cards,
    };
};

export const setPage = (page: number) => {
    return {
        type: 'SET_PAGINATION',
        payload: page,
    };
};

export const resetPage = () => {
    return {
        type: 'RESET_PAGINATION',
    };
};
