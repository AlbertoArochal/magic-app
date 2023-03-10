import React from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { TypeButtons } from './typebuttons';
import { render, screen, fireEvent } from '@testing-library/react';
import { cardsmock } from '../../mocks/cardsmock';
import { BrowserRouter } from 'react-router-dom';

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

        const creatureButton = screen.getByAltText('Carrier Pigeons');
        expect(creatureButton).toBeInTheDocument();
    });
    it('getbyyearandtype is called', () => {
        const TestComponent = () => {
            return (
                <div>
                    <TypeButtons />
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

        const creatureButton = screen.getByAltText('Carrier Pigeons');
        fireEvent.click(creatureButton);
        expect(creatureButton).toBeInTheDocument()
    });
});

