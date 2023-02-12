export const addCollection = (collection: any) => {
    return {
        type: 'SET_COLLECTIONS',
        payload: collection,
    };
};

export const addCards = (cards: any) => {
    return {
        type: 'SET_CARDS',
        payload: cards,
    };
};

export const addFilteredCards = (cards: any) => {
    return {
        type: 'SET_FILTERED_CARDS',
        payload: cards,
    };
};
