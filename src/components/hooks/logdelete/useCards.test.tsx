import { screen, render, fireEvent } from '@testing-library/react';
import { useCards } from './useCards';
import { CardContext } from '../../../contexts/cards/cardcontext';
import { cardsmock } from '../../../mocks/cardsmock';

describe('useCards', () => {
    it('setCards should be called', () => {
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
    it('setCollections should be called', () => {
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
    it('GetByYearAndColor will set new cards in context', () => {
        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(cardsmock),
            });
        });

        const TestComponent = () => {
            const hook = useCards();
            return <button onClick={() => hook.GetByYearAndColor(1993, 'W')} />;
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
});
