import React from 'react';
import { YearLink } from './yearlink';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';

describe('YearLink', () => {
    it('should render a year link', () => {
        const year = cardsmock[0].released_at.slice(0, 4);
        render(
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    collections: [],
                    setCards: jest.fn(),
                    setCollections: jest.fn(),
                }}
            >
                <BrowserRouter>
                    <YearLink />
                </BrowserRouter>
            </CardContext.Provider>
        );
        expect(screen.getByText(year)).toBeInTheDocument();
    });
    it('should render a year string when there are no cards', () => {
        render(
            <CardContext.Provider
                value={{
                    cards: [],
                    collections: [],
                    setCards: jest.fn(),
                    setCollections: jest.fn(),
                }}
            >
                <BrowserRouter>
                    <YearLink />
                </BrowserRouter>
            </CardContext.Provider>
        );
        expect(screen.getByText('Year')).toBeInTheDocument();
    });
});
