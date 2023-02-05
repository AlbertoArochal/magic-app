export const addCollection = (collection: any) => {
    return {
        type: 'SET_COLLECTIONS',
        payload: collection,
    };
};
