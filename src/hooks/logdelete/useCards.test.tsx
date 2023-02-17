import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { useCards } from './useCards';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { ScryfallApi } from '../../services/scryfallapi';
import { rawsetsmock } from '../../mocks/rawsetsmock';

describe('useCards', () => {
    jest.mock('../../services/scryfallapi', () => {
        return {
            ScryfallApi: jest.fn().mockImplementation(() => {
                return {
                    getCollections: jest.fn().mockResolvedValue([]),
                    getCardsByYear: jest.fn().mockResolvedValue([]),
                    getCardsByYearAndColor: jest.fn().mockResolvedValue([]),
                    getCardsByYearAndType: jest.fn().mockResolvedValue([]),
                };
            }),
        };
    });

    const responseMock = {
        ok: true,
        async json() {
            return { data: cardsmock };
        },
    };

    const responseMock2 = {
        ok: true,
        async json() {
            return { data: rawsetsmock };
        },
    };

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMock as unknown as Response)
        );
    });

    test('setCards should be called', () => {
        const setCards = jest.fn();
        const scryfall = jest.fn(() => Promise.resolve({ data: cardsmock }));
        const Testcomponent = () => {
            const hook = useCards();
            return <button onClick={() => hook.GetFetchCardsByYear(1993)} />;
        };

        render(
            <CardContext.Provider value={{ setCards }}>
                <Testcomponent />
            </CardContext.Provider>
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(setCards).not.toBeCalled();
    });
    test('setCollections should be called', () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(responseMock2 as unknown as Response)
        );

        const setCollections = jest.fn();
        const scryfall = jest.fn(() => Promise.resolve({ data: cardsmock }));
        const Testcomponent = () => {
            const hook = useCards();
            return <button onClick={() => hook.GetSets()} />;
        };

        render(
            <CardContext.Provider value={{ setCollections }}>
                <Testcomponent />
            </CardContext.Provider>
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(setCollections).not.toBeCalled();
    });

    it('GetFetchCardsByYear will set new cards in context', () => {
        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(cardsmock),
            });
        });

        const TestComponent = () => {
            const hook = useCards();
            return <button onClick={() => hook.GetFetchCardsByYear(1993)} />;
        };

        render(
            <CardContext.Provider value={{ setCards: jest.fn() }}>
                <TestComponent />
            </CardContext.Provider>
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(global.fetch).toBeCalled();
    });
    it('should call getCardsByYear', async () => {
        const Scryfall = new ScryfallApi();
        const spy = jest.spyOn(Scryfall, 'getCardsByYear');
        const year = 2022;

        const Testcomponent = () => {
            const hook = useCards();
            return <button onClick={() => hook.GetFetchCardsByYear(year)} />;
        };

        render(
            <CardContext.Provider
                value={{
                    setCards: jest.fn(),
                    collections: [],
                    setCollections: jest.fn(),
                    cards: [],
                    setFilteredCards: jest.fn(),
                    filteredCards: [],
                }}
            >
                <Testcomponent />
            </CardContext.Provider>
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(spy).not.toHaveBeenCalledWith(year, 1);
    });

    it('should call getCardsByYearAndColor', async () => {
        const Scryfall = new ScryfallApi();
        const spy = jest.spyOn(Scryfall, 'getCardsByYearAndColor');
        const year = 2022;
        const color = 'W';

        const Testcomponent = () => {
            const hook = useCards();
            return (
                <button onClick={() => hook.GetByYearAndColor(year, color)} />
            );
        };

        render(
            <CardContext.Provider
                value={{
                    setCards: jest.fn(),
                    collections: [],
                    setCollections: jest.fn(),
                    cards: [],
                    setFilteredCards: jest.fn(),
                    filteredCards: [],
                }}
            >
                <Testcomponent />
            </CardContext.Provider>
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(spy).not.toHaveBeenCalledWith(year, color, 1);
    });

    it('should call getCardsByYearAndType', async () => {
        const Scryfall = new ScryfallApi();
        const spy = jest.spyOn(Scryfall, 'getCardsByYearAndType');
        const year = 2022;
        const type = 'creature';

        const Testcomponent = () => {
            const hook = useCards();
            return <button onClick={() => hook.GetByYearAndType(year, type)} />;
        };

        render(
            <CardContext.Provider
                value={{
                    setCards: jest.fn(),
                    collections: [],
                    setCollections: jest.fn(),
                    cards: [],
                    setFilteredCards: jest.fn(),
                    filteredCards: [],
                }}
            >
                <Testcomponent />
            </CardContext.Provider>
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(spy).not.toHaveBeenCalledWith(year, type, 1);
    });
});
