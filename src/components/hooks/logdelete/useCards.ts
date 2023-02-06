import scryfall from 'scryfall-client';
import { CardType } from '../../../models/cardtype';
import {
    CardContext,
    CollectionType,
} from '../../../contexts/cards/cardcontext';
import { useContext } from 'react';

export const useCards = () => {
    const { collections, setCollections, setCards } = useContext(CardContext);

    const GetSets = async () => {
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
    };

    const GetCardsByYear = async (year: number, page = 1) => {
        const cards: CardType[] = [];
        const cardList: CardType[] = await scryfall.get('cards/search', {
            q:
                'date%3E%3D' +
                year.toString() +
                '+date%3C%3D' +
                (year + 1).toString() +
                '&order=released&dir=asc',
        });
        cardList.forEach((card: CardType) => {
            cards.push({
                name: card.name,
                released_at: card.released_at,
                image_uris: {
                    small: card.image_uris.small,
                    large: card.image_uris.large,
                    art_crop: card.image_uris.art_crop,
                },
                mana_cost: card.mana_cost,
                oracle_text: card.oracle_text,
                type_line: card.type_line,
                color_identity: card.color_identity,
                artist: card.artist,
                set_name: card.set_name,
                power: card.power,
                toughness: card.toughness,
                flavor_text: card.flavor_text,
            });
        });
        setCards(cards);
    };

    const GetCardsByDate = async (year: number) => {
        const cards = await scryfall.get('cards/search', {
            q: 'Year:' + year.toString(),
        });
        return cards;
    };

    return { collections, GetSets, GetCardsByYear, GetCardsByDate };
};
