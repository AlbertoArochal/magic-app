import { screen, render } from '@testing-library/react';

import { Header } from './header';

describe('Header', () => {
    it('should render the header correctly', () => {
        render(<Header />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Year')).toBeInTheDocument();
        expect(screen.getByText('Secret Lair')).toBeInTheDocument();
        expect(screen.getByText('My Decks')).toBeInTheDocument();
        expect(screen.getByText('PROFILE')).toBeInTheDocument();
    });
});
