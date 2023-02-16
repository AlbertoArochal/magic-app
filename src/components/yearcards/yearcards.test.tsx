import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { CollectionType } from '../../contexts/cards/cardcontext';
import { CollectionsMock } from '../../mocks/collectionsmock';
import YearCard from './yearcards';

describe('YearCard', () => {
    it('should render the yearcard', () => {
        render(
            <BrowserRouter>
                <YearCard year="2011" />
            </BrowserRouter>
        );

        expect(screen.getByText('2011')).toBeInTheDocument();
    });
    it('GetCardsByYear should be called', () => {
        const useNavigate = jest.fn();
        const TestComponent = () => {
            return (
                <div>
                    <YearCard year="2011" />;
                </div>
            );
        };
        const mockedGetCardsByYear = jest.fn();
        jest.mock('../hooks/logdelete/useCards', () => ({
            useCards: () => ({
                GetFetchCardsByYear: mockedGetCardsByYear,
            }),
        }));
        render(
            <BrowserRouter>
                <CardContext.Provider
                    value={{
                        cards: [],
                        setCards: () => jest.fn(),
                        collections: CollectionsMock as CollectionType[],
                        setCollections: () => jest.fn(),
                    }}
                >
                    <TestComponent />
                </CardContext.Provider>
            </BrowserRouter>
        );
        const button = screen.getByText('Back to 2011 →');
        fireEvent.click(button);
        const image = screen.getByAltText('Phyrexia: All Will Be One');
        expect(image).toBeInTheDocument();
    });
});
