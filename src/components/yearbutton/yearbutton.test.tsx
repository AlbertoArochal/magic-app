import { YearButton } from './yearbutton';
import { render, screen } from '@testing-library/react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';

describe('YearButton', () => {
    it('renders the buttons with the correct colors', () => {
        const TestComponent = () => {
            return (
                <div>
                    <YearButton />
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

        const yearButton = screen.getByAltText('Carrier Pigeons');
        expect(yearButton).toBeInTheDocument();
    });
});
