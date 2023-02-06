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
            return <button onClick={() => hook.GetCardsByYear(1993)} />;
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
});
