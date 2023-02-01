import { YearButton } from './yearbutton';
import { render, screen } from '@testing-library/react';

describe('YearButton', () => {
    it('should render', () => {
        expect(YearButton).toBeDefined();
    });
    it('should render the year button', () => {
        render(<YearButton />);
        expect(screen.getByText('Year Button')).toBeInTheDocument();
    });
});
