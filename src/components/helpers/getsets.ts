import scryfall from 'scryfall-client';

export const GetSets = (year: number) => {
    const collections = scryfall.getSets().then((sets) => {
        const collection: any[] = [];
        sets.forEach((set) => {
            let date = new Date(set.released_at);
            if (date.getFullYear() === year) {
                collection.push(set);
            }
        });
        return collection;
    });
    return collections;
};
