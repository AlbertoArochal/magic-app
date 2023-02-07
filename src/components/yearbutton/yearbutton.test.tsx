import { YearButton } from './yearbutton';
import { render, screen } from '@testing-library/react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { BrowserRouter } from 'react-router-dom';

describe('YearButton', () => {
    it('renders the buttons with the correct colors', () => {
        const TestComponent = () => {
            return (
                <div>
                    <YearButton />
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

        const yearButton = screen.getByAltText('Carrier Pigeons');
        expect(yearButton).toBeInTheDocument();
    });
});
