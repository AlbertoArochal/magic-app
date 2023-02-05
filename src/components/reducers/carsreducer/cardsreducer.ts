import {
    initialCollections,
    initialCards,
} from '../../../contexts/cards/cardcontext';

export const CollectionsReducer = (state = initialCollections, action: any) => {
    switch (action.type) {
        case 'SET_COLLECTIONS':
            return { ...state, collections: action.payload };
        default:
            return state;
    }
};

export const CardsReducer = (state = initialCards, action: any) => {
    switch (action.type) {
        case 'SET_CARDS':
            return { ...state, cards: action.payload };
        default:
            return state;
    }
};
