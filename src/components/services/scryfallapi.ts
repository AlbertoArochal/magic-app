import scryfall from 'scryfall-client';
import { RawCardType } from '../../models/rawType';
export class ScryfallApi {
    async getCollections(): Promise<any[]> {
        const collections = await scryfall.getSets();
        return collections;
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
}
