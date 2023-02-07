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

    const GetFetchCardsByYear = async (year: number, page = 1) => {
        const cards: CardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '&order=released&dir=asc&page=' +
                page.toString()
        );
        if (response.ok) {
            const cardList = await response.json();
            cardList.data.forEach((card: CardType) => {
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
        }
    };

    const GetByYearAndColor = async (year: number, color: string) => {
        const cards: CardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '+color%3D' +
                color
        );
        if (response.ok) {
            const cardList = await response.json();
            cardList.data.forEach((card: CardType) => {
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
        }
    };

    return {
        collections,
        GetSets,
        GetFetchCardsByYear,
        GetByYearAndColor,
    };
};
