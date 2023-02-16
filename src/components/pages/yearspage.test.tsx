import React from 'react';
import { YearsPage } from './yearspage';
import { render, screen } from '@testing-library/react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { BrowserRouter } from 'react-router-dom';
import { cardsmock } from '../../mocks/cardsmock';

describe('YearsPage', () => {
    it('should render the color scroll', () => {
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
                    <YearsPage />
                </CardContext.Provider>
            </BrowserRouter>
        );

        expect(YearsPage).toBeDefined();
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});
