import { YearCard } from './yearcards';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { CollectionType } from '../../contexts/cards/cardcontext';
import { CollectionsMock } from '../../mocks/collectionsmock';
import { useCards } from '../hooks/logdelete/useCards';

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
        const TestComponent = () => {
            const { GetCardsByYear } = useCards();
            return (
                <div>
                    <YearCard year="2011" />;
                </div>
            );
        };
        const mockedGetCardsByYear = jest.fn();
        jest.mock('../hooks/logdelete/useCards', () => ({
            useCards: () => ({
                GetCardsByYear: mockedGetCardsByYear,
            }),
        }));
        const useNavigate = jest.fn();
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
        expect(mockedGetCardsByYear).not.toHaveBeenCalled();
        expect(useNavigate).not.toHaveBeenCalled();
    });
});
