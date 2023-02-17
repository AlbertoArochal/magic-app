import React from 'react';

import { ScryfallApi, errorCard } from './scryfallapi';
import { CollectionsMock } from '../mocks/collectionsmock';

import { cardsmock } from '../mocks/cardsmock';

describe('ScryfallApi', () => {
    const responseMock = {
        ok: true,
        async json() {
            return { data: cardsmock };
        },
    };

    const responseMock2 = {
        ok: true,
        async json() {
            return { data: CollectionsMock };
        },
    };

    const responseMockError = {
        ok: false,
        async json() {
            return { error: 'error' };
        },
    };

    const errorObject = {
        year: 'Error',
        name: 'Error',
        icon: 'Error',
        set_type: 'Error',
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
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMock2 as unknown as Response)
        );
        const collections = await scryfall.getSets();
        expect(global.fetch).toHaveBeenCalled();
        expect(collections.length).toBeGreaterThan(1);
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

    test('we can get cards by name', async () => {
        const cards = await scryfall.getCardsByName('Carrier Pigeons');
        expect(global.fetch).toHaveBeenCalled();
        expect(cards).toEqual(cardsmock);
    });
    test('it should return an error object if the collections fetch fails', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMockError as unknown as Response)
        );
        const collections = await scryfall.getSets();
        expect(global.fetch).toHaveBeenCalled();
        expect(collections).toEqual([errorObject]);
    });
    test('it should return an error object if the card fetch fails', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMockError as unknown as Response)
        );
        const cards = await scryfall.getCardsByYearAndColor(1996, 'red');
        expect(global.fetch).toHaveBeenCalled();
        expect(cards).toEqual([errorCard]);
    });
    test('it should return an error object if the card by Year and Type fetch fails', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMockError as unknown as Response)
        );
        const cards = await scryfall.getCardsByYearAndType(1996, 'red');
        expect(global.fetch).toHaveBeenCalled();
        expect(cards).toEqual([errorCard]);
    });
    test('it should return an error object if the card by name fetch fails', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMockError as unknown as Response)
        );
        const cards = await scryfall.getCardsByName('Carrier Pigeons');
        expect(global.fetch).toHaveBeenCalled();
        expect(cards).toEqual([errorCard]);
    });
});
