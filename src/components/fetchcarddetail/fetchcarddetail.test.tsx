import React from 'react';
import { FetchCardDetail } from './fetchcarddetail';
import { render, screen, fireEvent } from '@testing-library/react';
import { userContext } from '../../contexts/user/usercontext';
import { cardsmock } from '../../mocks/cardsmock';
import { useContext } from 'react';

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
    test('addcard should be called when clicking add to deck button', () => {
        const addCard = jest.fn();


        const TestComponent = () => {
            const {user} = useContext(userContext);

            return (
                <div>
                    <FetchCardDetail setShowModal={jest.fn()} />

                </div>
            );
        };



        render(
            <userContext.Provider
                value={{
                    user: { name: 'test', email: '' },
                    setUser: jest.fn(),
                    logout: jest.fn(),
                }}
            >
                <TestComponent />
                
            </userContext.Provider>
        );
        const button = screen.getByText('Add to Deck 💖');
        fireEvent.click(button);
        expect(addCard).not.toHaveBeenCalled();
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
