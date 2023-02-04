import { screen, render, fireEvent } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { Header } from './header';
import { MemoryRouter } from 'react-router-dom';

const intersectionObserverMock = () => ({
    observe: () => null,
});
window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

describe('Header', () => {
    it('should render the header correctly', () => {
        mockAllIsIntersecting(true);
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Year')).toBeInTheDocument();
        expect(screen.getByText('Secret Lair')).toBeInTheDocument();
        expect(screen.getByText('My Decks')).toBeInTheDocument();
    });
    test('toggles the menu when the button is clicked', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const button = screen.getByTestId('burger-button');
        fireEvent.click(button);
        expect(screen.getByTestId('burger-menu')).toHaveClass(
            'Burger__menu-open'
        );
        expect(screen.getByTestId('burger-menu')).toHaveClass(
            'Burger__menu-open'
        );
    });

    const user = {
        name: 'Test User',
    };

    const auth = {
        onAuthStateChanged: jest.fn((cb) => cb(user)),
    };

    it('should set a new user on the global state user when the auth state changes', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        auth.onAuthStateChanged((user) => {
            expect(auth.onAuthStateChanged).toHaveBeenCalled();
            expect(auth.onAuthStateChanged).toHaveBeenCalledWith(user);
        });
    });
});
