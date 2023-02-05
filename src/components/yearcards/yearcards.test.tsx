import { YearCard } from './yearcards';
import { screen, render } from '@testing-library/react';

describe('YearCard', () => {
    it('should render the yearcard', () => {
        render(<YearCard year="1993" />);
        expect(screen.getByText('1993')).toBeInTheDocument();
    });
});
