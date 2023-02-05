import scryfall from 'scryfall-client';
import { useCallback } from 'react';
import {
    CardContext,
    CollectionType,
} from '../../../contexts/cards/cardcontext';
import { useContext } from 'react';

export const useCards = () => {
    const { collections, setCollections } = useContext(CardContext);

    const GetSets = useCallback(async () => {
        const collections = await scryfall.getSets();
        const collection: CollectionType[] = [];
        collections.forEach((set) => {
            if (set.set_type === 'core' || set.set_type === 'expansion')
                collection.push({
                    year: set.released_at,
                    name: set.name,
                    icon: set.icon_svg_uri,
                });
        });
        setCollections(collection);
    }, []);

    return { collections, GetSets };
};
