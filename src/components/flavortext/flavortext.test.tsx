import { FlavorText } from './flavortext';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { render, screen } from '@testing-library/react';

describe('FlavorText', () => {
    it('renders the buttons with the correct colors', () => {
        const TestComponent = () => {
            return (
                <div>
                    <FlavorText />
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

        const flavorText = screen.getByText(
            'Birds know no borders! Why, then, should we? General Varchild, in a missive to King Darien of Kjeldor'
        );
        expect(flavorText).toBeInTheDocument();
    });
});
