import {
    initialCollections,
    initialCards,
    initialFilteredCards,
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

export const FilteredCardsReducer = (
    state = initialFilteredCards,
    action: any
) => {
    switch (action.type) {
        case 'SET_FILTERED_CARDS':
            return { ...state, filteredCards: action.payload };
        default:
            return state;
    }
};

export const QueryReducer = (state = 1, action: any) => {
    switch (action.type) {
        case 'SET_PAGINATION':
            return action.payload;
        case 'RESET_PAGINATION':
            return 1;
        default:
            return state;
    }
};

