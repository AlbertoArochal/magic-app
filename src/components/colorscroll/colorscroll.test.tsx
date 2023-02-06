import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { ColorScroll } from './colorscroll';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';

afterEach(cleanup);

describe('ColorScroll', () => {
    it('renders the buttons with the correct colors', () => {
        const TestComponent = () => {
            return (
                <div>
                    <ColorScroll />
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

        const blueIcon = screen.getByAltText('Carrier Pigeons');
        expect(blueIcon).toBeInTheDocument();
    });
});
