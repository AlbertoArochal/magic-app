import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ColorScroll } from './colorscroll';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { BrowserRouter } from 'react-router-dom';

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
            <BrowserRouter>
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
            </BrowserRouter>
        );

        const buttons = screen.getAllByRole('img');
        const blueIcon = screen.getByAltText('Carrier Pigeons');
        expect(blueIcon).toBeInTheDocument();
        expect(buttons[0]).toBeInTheDocument();
        fireEvent.click(buttons[0]);
    });
});
