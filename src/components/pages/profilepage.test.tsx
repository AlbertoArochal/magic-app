import React from 'react';
import { ProfilePage } from './profilepage';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardContext } from '../../contexts/cards/cardcontext';
import { cardsmock } from '../../mocks/cardsmock';

describe('ProfilePage', () => {
    it('should render the page correctly', () => {
        render(
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    collections: [],
                    setCards: jest.fn(),
                    setCollections: jest.fn(),
                }}
            >
                <BrowserRouter>
                    <ProfilePage />
                </BrowserRouter>
            </CardContext.Provider>
        );
        expect(screen.getByText('Your Profile')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
        expect(screen.getByText('Delete Account')).toBeInTheDocument();
    });
});
