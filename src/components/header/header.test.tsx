import { screen, render } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { Header } from './header';

const intersectionObserverMock = () => ({
    observe: () => null,
});
window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

describe('Header', () => {
    it('should render the header correctly', () => {
        mockAllIsIntersecting(true);
        render(<Header />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Year')).toBeInTheDocument();
        expect(screen.getByText('Secret Lair')).toBeInTheDocument();
        expect(screen.getByText('My Decks')).toBeInTheDocument();
        expect(screen.getByText('PROFILE')).toBeInTheDocument();
    });
});
