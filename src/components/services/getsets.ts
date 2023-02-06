import scryfall from 'scryfall-client';
import { CollectionType } from '../../contexts/cards/cardcontext';

export const GetSets = (year: number) => {
    const collections = scryfall.getSets().then((sets) => {
        const collection: any[] = [];
        sets.forEach((set) => {
            const date = new Date(set.released_at);
            if (date.getFullYear() === year) {
                collection.push({
                    year: year,
                    name: set.name,
                    icon: set.icon_svg_uri,
                });
            }
        });

        return collection;
    });
    return collections;
};
