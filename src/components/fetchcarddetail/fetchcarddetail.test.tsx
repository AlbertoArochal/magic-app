import React from 'react';
import { FetchCardDetail } from './fetchcarddetail';
import { render, screen, fireEvent } from '@testing-library/react';
import { userContext } from '../../contexts/user/usercontext';
import { cardsmock } from '../../mocks/cardsmock';

describe('FetchCardDetail', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(() => JSON.stringify(cardsmock[0])),
            },
            writable: true,
        });
    });

    test('should render card detail', () => {
        render(
            <userContext.Provider
                value={{ user: null, setUser: jest.fn(), logout: jest.fn() }}
            >
                <FetchCardDetail setShowModal={jest.fn()} />
            </userContext.Provider>
        );
        expect(
            screen.getByText('Illustrated by Pat Morrissey')
        ).toBeInTheDocument();
        expect(screen.queryByText('Add to Deck 💖')).not.toBeInTheDocument();
        expect(localStorage.getItem).toHaveBeenCalledWith('card');
    });
    test('should render button if user is logged in', () => {
        render(
            <userContext.Provider
                value={{
                    user: { name: 'test', email: 'arochal@gmail.com' },
                    setUser: jest.fn(),
                    logout: jest.fn(),
                }}
            >
                <FetchCardDetail setShowModal={jest.fn()} />
            </userContext.Provider>
        );
        const button = screen.getByText('✖');
        fireEvent.click(button);
        expect(button).toBeInTheDocument();
        expect(screen.getByText('Add to Deck 💖')).toBeInTheDocument();
        expect(localStorage.getItem).toHaveBeenCalled();
    });
    test('should close modal when clicking close button', () => {
        const setShowModal = jest.fn();
        render(
            <userContext.Provider
                value={{
                    user: null,
                    setUser: jest.fn(),
                    logout: jest.fn(),
                }}
            >
                <FetchCardDetail setShowModal={setShowModal} />
            </userContext.Provider>
        );

        const closeButton = screen.getByText('✖');
        fireEvent.click(closeButton);
        expect(setShowModal).toHaveBeenCalledWith(false);
    });
});
