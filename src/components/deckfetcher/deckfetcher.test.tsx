import React from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DeckFetcher } from './deckfetcher';
import { ref, remove } from 'firebase/database';
import { userContext } from '../../contexts/user/usercontext';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('CardFetcher', () => {
    it('should render successfully the cards in cardsmock', () => {
        render(
            <BrowserRouter>
                <CardContext.Provider
                    value={{ cards: [], filteredCards: cardsmock }}
                >
                    <DeckFetcher />
                </CardContext.Provider>
            </BrowserRouter>
        );
        const pigeon = screen.getAllByAltText('Carrier Pigeons')[0];
        expect(pigeon).toBeInTheDocument();
    });
    it('should set a card in localstorage when clicking on a card', () => {
        const setShowModal = jest.fn();
        Object.defineProperty(window, 'localStorage', {
            value: {
                setItem: jest.fn(),
                getItem: jest.fn(() => JSON.stringify(cardsmock[0])),
            },
            writable: true,
        });
        render(
            <BrowserRouter>
                <CardContext.Provider
                    value={{ cards: [], filteredCards: cardsmock }}
                >
                    <DeckFetcher />
                </CardContext.Provider>
            </BrowserRouter>
        );
        const pigeon = screen.getAllByAltText('Carrier Pigeons')[0];
        fireEvent.click(pigeon);
        expect(localStorage.setItem).toHaveBeenCalled();
    });
    it('should render the cards in filteredCards if filteredCards is not empty', () => {
        render(
            <BrowserRouter>
                <userContext.Provider
                    value={{
                        user: { name: 'test', email: '', uid: '123' },
                        setUser: jest.fn(),
                        logout: jest.fn(),
                    }}
                >
                    <CardContext.Provider
                        value={{
                            cards: cardsmock,
                            filteredCards: cardsmock.filter(
                                (card) => card.name === 'Carrier Pigeons'
                            ),
                        }}
                    >
                        <DeckFetcher />
                    </CardContext.Provider>
                </userContext.Provider>
            </BrowserRouter>
        );
        const pigeon = screen.getAllByAltText('Carrier Pigeons')[0];
        expect(pigeon).toBeInTheDocument();
    });
    it('should call ref and remove when clicking on the delete button, both methods and useLocation should be mocked, useLocation should return a path', () => {
        const setShowModal = jest.fn();
        Object.defineProperty(window, 'localStorage', {
            value: {
                setItem: jest.fn(),
                getItem: jest.fn(() => JSON.stringify(cardsmock[0])),
            },
            writable: true,
        });
        render(
            <BrowserRouter>
                <userContext.Provider
                    value={{
                        user: { name: 'test', email: '', uid: '123' },
                        setUser: jest.fn(),
                        logout: jest.fn(),
                    }}
                >
                    <CardContext.Provider
                        value={{
                            cards: cardsmock,
                            filteredCards: cardsmock.filter(
                                (card) => card.name === 'Carrier Pigeons'
                            ),
                            setFilteredCards: jest.fn(),
                        }}
                    >
                        <DeckFetcher />
                    </CardContext.Provider>
                </userContext.Provider>
            </BrowserRouter>
        );
        const deleteButton = screen.getAllByText('❌')[0];
        fireEvent.click(deleteButton);

        expect(ref).toHaveBeenCalled();
        expect(remove).toHaveBeenCalled();
    });
});
