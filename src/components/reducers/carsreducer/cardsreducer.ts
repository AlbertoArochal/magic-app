import { initialCollections } from '../../../contexts/cards/cardcontext';

export const CardsReducer = (state = initialCollections, action: any) => {
    switch (action.type) {
        case 'SET_COLLECTIONS':
            return { ...state, collections: action.payload };
        default:
            return state;
    }
};
