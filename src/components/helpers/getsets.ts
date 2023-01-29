import scryfall from 'scryfall-client';

export const GetSets = (year: number) => {
    const collections = scryfall.getSets().then((sets) => {
        const collection: any[] = [];
        sets.forEach((set) => {
            const date = new Date(set.released_at);
            if (date.getFullYear() === year) {
                collection.push(set);
            }
        });
        return collection;
    });
    return collections;
};
