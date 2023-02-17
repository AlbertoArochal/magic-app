import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CardContext, CardContextType } from '../../contexts/cards/cardcontext';
import { PageButtons } from './pagebuttons';

describe('PageButtons', () => {
    const cardContext: CardContextType = {
        collections: [],
        setCollections: jest.fn(),
        cards: [],
        setCards: jest.fn(),
        filteredCards: [],
        setFilteredCards: jest.fn(),
        page: 2,
        setPage: jest.fn(),
        resetPage: jest.fn(),
        pagination: 1,
    };

    test('should decrease page when left button is clicked', () => {
        const mockedGetCardsByYear = jest.fn();
        jest.mock('../../hooks/logdelete/useCards', () => ({
            useCards: () => ({
                GetCardsByYear: mockedGetCardsByYear,
            }),
        }));

        render(
            <CardContext.Provider value={cardContext}>
                <PageButtons />
            </CardContext.Provider>
        );

        const leftButton = screen.getByText('⇦');
        fireEvent.click(leftButton);

        expect(cardContext.setPage).toHaveBeenCalledWith(1);
    });

    test('should increase page when right button is clicked', () => {
        const mockedGetCardsByYear = jest.fn();
        jest.mock('../../hooks/logdelete/useCards', () => ({
            useCards: () => ({
                GetFetchCardsByYear: mockedGetCardsByYear,
            }),
        }));
        render(
            <CardContext.Provider value={cardContext}>
                <PageButtons period={2011} />
            </CardContext.Provider>
        );

        const rightButton = screen.getByText('⇨');
        fireEvent.click(rightButton);

        expect(cardContext.setPage).toHaveBeenCalledWith(3);
    });
});
