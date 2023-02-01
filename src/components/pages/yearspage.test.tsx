import { YearsPage } from './yearspage';
import { Header } from '../header/header';
import { YearButton } from '../yearbutton/yearbutton';
import { ColorScroll } from '../colorscroll/colorscroll';
import { render, screen } from '@testing-library/react';

describe('YearsPage', () => {
    it('should render', () => {
        expect(YearsPage).toBeDefined();
    });
    it('should render the header', () => {
        render(<YearsPage />);
        expect(screen.getByText('PROFILE')).toBeInTheDocument();
    });
    it('should render the year button', () => {
        render(<YearsPage />);
        expect(screen.getByText('Year Button')).toBeInTheDocument();
    });
    it('should render the color scroll', () => {
        render(<YearsPage />);
        expect(screen.getByText('blue')).toBeInTheDocument();
    });
});
