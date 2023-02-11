import scryfall from 'scryfall-client';
import { RawCardType } from '../../models/rawType';
import { RawSetType } from '../../models/rawsettype';
export class ScryfallApi {
    async getSets(): Promise<RawSetType[]> {
        let setlist = [];
        const response = await fetch('https://api.scryfall.com/sets');
        if (response.ok) {
            const sets = await response.json();
            setlist = sets.data;
        }
        return setlist;
    }

    async getCardsByYear(year: number, page = 1): Promise<RawCardType[]> {
        let cardList: RawCardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '&order=released&dir=asc&page=' +
                page.toString()
        );
        if (response.ok) {
            const cards = await response.json();
            cardList = cards.data;
        }
        return cardList;
    }

    async getCardsByYearAndColor(
        year: number,
        color: string
    ): Promise<RawCardType[]> {
        let cardList: RawCardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '+color%3D' +
                color
        );
        if (response.ok) {
            const cards = await response.json();
            cardList = cards.data;
        }
        return cardList;
    }

    async getCardsByYearAndType(
        year: number,
        type: string
    ): Promise<RawCardType[]> {
        let cardList: RawCardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=year%3D' +
                year.toString() +
                '+type%3D' +
                type
        );
        if (response.ok) {
            const cards = await response.json();
            cardList = cards.data;
        }
        return cardList;
    }
    async getCardsByName(name: string): Promise<RawCardType[]> {
        let cardList: RawCardType[] = [];
        const response = await fetch(
            'https://api.scryfall.com/cards/search?q=name%3D' + name
        );
        if (response.ok) {
            const cards = await response.json();
            cardList = cards.data;
        }
        return cardList;
    }
}
