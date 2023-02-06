import { YearCard } from './yearcards';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';

describe('YearCard', () => {
    it('should render the yearcard', () => {
        render(
            <BrowserRouter>
                <YearCard year="1993" />
            </BrowserRouter>
        );

        expect(screen.getByText('1993')).toBeInTheDocument();
    });
});
