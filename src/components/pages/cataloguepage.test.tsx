import React from 'react';
import { render, screen } from '@testing-library/react';
import { CataloguePage } from './cataloguepage';
import { BrowserRouter } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';

describe('shoud render header and cardfetcher', () => {
    it('renders header and card fetcher', () => {
        render(
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    setCards: () => jest.fn(),
                    collections: [],
                    setCollections: () => jest.fn(),
                    setFilteredCards: () => jest.fn(),
                    filteredCards: [],
                }}
            >
                <BrowserRouter>
                    <CataloguePage />
                </BrowserRouter>
            </CardContext.Provider>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Catalogue')).toBeInTheDocument();
    });
});
