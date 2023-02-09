import React from 'react';

import { ScryfallApi } from './scryfallapi';

import { cardsmock } from '../../mocks/cardsmock';

describe('ScryfallApi', () => {
    const responseMock = {
        ok: true,
        async json() {
            return { data: cardsmock };
        },
    };

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMock as unknown as Response)
        );
    });
    const scryfall = new ScryfallApi();

    test('we can instantiate it', () => {
        expect(scryfall).toBeInstanceOf(ScryfallApi);
    });

    test('we can get collections', async () => {
        const collections = await scryfall.getCollections();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('we can get cards by year', async () => {
        const cards = await scryfall.getCardsByYear(1996);
        expect(global.fetch).toHaveBeenCalled();
        expect(cards).toEqual(cardsmock);
    });

    test('we can get cards by year and color', async () => {
        const cards = await scryfall.getCardsByYearAndColor(1996, 'red');
        expect(global.fetch).toHaveBeenCalled();
        expect(cards).toEqual(cardsmock);
    });

    test('we can get cards by year and type', async () => {
        const cards = await scryfall.getCardsByYearAndType(1996, 'creature');
        expect(global.fetch).toHaveBeenCalled();
        expect(cards).toEqual(cardsmock);
    });
});
