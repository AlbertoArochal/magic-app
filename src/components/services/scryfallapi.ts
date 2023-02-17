import { RawCardType } from '../../models/rawType';
import { CardType } from '../../models/cardtype';
import { CollectionType } from '../../contexts/cards/cardcontext';

export const errorCard = {
    name: 'Error',
    released_at: 'Error',
    image_uris: {
        small: 'Error',
        large: 'Error',
        normal: 'Error',
        art_crop: 'Error',
    },
    mana_cost: 'Error',
    oracle_text: 'Error',
    type_line: 'Error',
    color_identity: ['Error'],
    artist: 'Error',
    set_name: 'Error',
    power: 'Error',
    toughness: 'Error',
    flavor_text: 'Error',
};

export class ScryfallApi {
    async getSets(): Promise<any[]> {
        const setlist: CollectionType[] = [];
        const response = await fetch('https://api.scryfall.com/sets');
        if (response.ok) {
            const sets = await response.json();
            sets.data.forEach((set: any) => {
                if (set.set_type === 'core' || set.set_type === 'expansion')
                    setlist.push({
                        year: set.released_at,
                        name: set.name,
                        icon: set.icon_svg_uri,
                        set_type: set.set_type,
                    });
            });
        } else {
            setlist.push({
                year: 'Error',
                name: 'Error',
                icon: 'Error',
                set_type: 'Error',
            });
        }
        return setlist;
    }

    async getCardsByYear(year: number, page = 1): Promise<CardType[]> {
        let cardList: RawCardType[] = [];
        let finalCardList: CardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '&order=released&dir=asc&page=' +
                page.toString()
        );
        if (response.ok) {
            const finalcards: CardType[] = [];
            const cards = await response.json();
            cardList = cards.data;
            cardList.forEach((card: CardType) => {
                finalcards.push({
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris.small,
                        large: card.image_uris.large,
                        normal: card.image_uris.normal,
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
            finalCardList = finalcards;
        }
        return finalCardList;
    }

    async getCardsByYearAndColor(
        year: number,
        color: string
    ): Promise<CardType[]> {
        let cardList: RawCardType[] = [];
        let finalCardList: CardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '+color%3D' +
                color
        );
        if (response.ok) {
            const finalcards: CardType[] = [];
            const cards = await response.json();
            cardList = cards.data;
            cardList.forEach((card: CardType) => {
                finalcards.push({
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris.small,
                        large: card.image_uris.large,
                        normal: card.image_uris.normal,
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
            finalCardList = finalcards;
        } else {
            finalCardList.push(errorCard);
        }
        return finalCardList;
    }

    async getCardsByYearAndType(
        year: number,
        type: string
    ): Promise<CardType[]> {
        let finalCardList: CardType[] = [];
        let cardList: RawCardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '+type%3D' +
                type
        );
        if (response.ok) {
            const cards = await response.json();
            const finalcards: CardType[] = [];
            cardList = cards.data;
            cardList.forEach((card: RawCardType) => {
                finalcards.push({
                    name: card.name,
                    released_at: card.released_at,
                    image_uris: {
                        small: card.image_uris.small,
                        large: card.image_uris.large,
                        normal: card.image_uris.png,
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
            finalCardList = finalcards;
        } else {
            finalCardList.push(errorCard);
        }
        return finalCardList;
    }
    async getCardsByName(name: string): Promise<RawCardType[]> {
        let cardList: RawCardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=name%3D' + name
        );
        if (response.ok) {
            const cards = await response.json();
            cardList = cards.data;
        } else {
            cardList.push(errorCard as RawCardType);
        }
        return cardList;
    }
}
