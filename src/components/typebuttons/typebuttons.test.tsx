import { CardContext } from '../../contexts/cards/cardcontext';
import { TypeButtons } from './typebuttons';
import { render, screen } from '@testing-library/react';
import { cardsmock } from '../../mocks/cardsmock';

describe('TypeButtons', () => {
    it('renders the buttons with the correct colors', () => {
        const TestComponent = () => {
            return (
                <div>
                    <TypeButtons />
                </div>
            );
        };

        render(
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    setCards: () => jest.fn(),
                    collections: [],
                    setCollections: () => jest.fn(),
                }}
            >
                <TestComponent />
            </CardContext.Provider>
        );

        const creatureButton = screen.getByAltText('Carrier Pigeons');
        expect(creatureButton).toBeInTheDocument();
    });
});
