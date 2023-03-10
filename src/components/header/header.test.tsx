import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { Header } from './header';
import { MemoryRouter } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { userContext } from '../../contexts/user/usercontext';
import { CardProvider } from '../../contexts/cards/cardprovider';
import { useEffect, useState, useContext } from 'react';

const intersectionObserverMock = () => ({
    observe: () => null,
});
window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

describe('Header', () => {
    const mockuser = {
        name: 'Test User',
    };

    it('should render the header correctly', () => {
        mockAllIsIntersecting(true);
        render(
            <userContext.Provider
                value={{ user: mockuser, setUser: jest.fn() }}
            >
                <CardContext.Provider
                    value={{
                        cards: cardsmock,
                        collections: [],
                        setCards: jest.fn(),
                        setCollections: jest.fn(),
                    }}
                >
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </CardContext.Provider>
            </userContext.Provider>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('My Decks')).toBeInTheDocument();
    });
    test('toggles the menu when the button is clicked', () => {
        render(
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    collections: [],
                    setCards: jest.fn(),
                    setCollections: jest.fn(),
                }}
            >
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </CardContext.Provider>
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
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    collections: [],
                    setCards: jest.fn(),
                    setCollections: jest.fn(),
                }}
            >
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </CardContext.Provider>
        );
        auth.onAuthStateChanged((user) => {
            expect(auth.onAuthStateChanged).toHaveBeenCalled();
            expect(auth.onAuthStateChanged).toHaveBeenCalledWith(user);
        });
    });
    it('setdeckshandler should be called but not set any card when no user is passed through context', () => {
        const setDecksHandler = jest.fn();
        render(
            <userContext.Provider value={{ user, setUser: jest.fn() }}>
                <CardContext.Provider
                    value={{
                        cards: cardsmock,
                        collections: [],
                        setCards: jest.fn(),
                        setCollections: jest.fn(),
                        setFilteredCards: jest.fn(),
                    }}
                >
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </CardContext.Provider>
            </userContext.Provider>
        );
        fireEvent.click(screen.getByText('My Decks'));
        expect(setDecksHandler).not.toHaveBeenCalled();
    });
});
test('when setDecksHandler is called setFilteredCards should set mockcards', () => {
    const useNavigate = jest.fn();
    const TestComponent = () => {
        const { filteredCards, setFilteredCards } = useContext(CardContext);
        const setDecksHandler = () => {
            setFilteredCards(cardsmock);
        };
        const [loading] = useState(true);

        useEffect(() => {
            setDecksHandler();
        }, []);
        return (
            <div>
                {filteredCards.map((card, index) => (
                    <div key={card.name + index}>{card.name}</div>
                ))}
                {loading && <div>Loading...</div>}
            </div>
        );
    };
    render(
        <CardProvider>
            <TestComponent />
        </CardProvider>
    );
    const cards = screen.getAllByText('Carrier Pigeons');

    expect(cards[0]).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});
