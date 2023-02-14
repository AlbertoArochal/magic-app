import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeckPage } from './deckpage';
import { userContext } from '../../contexts/user/usercontext';
import { BrowserRouter } from 'react-router-dom';

describe('DeckPage component', () => {
    it('renders the cards', async () => {
        render(
            <BrowserRouter>
                <userContext.Provider value={{ user: { uid: 'user-id' } }}>
                    <DeckPage />
                </userContext.Provider>
            </BrowserRouter>
        );

        const cardImage = screen.getByText('Your Deck');
        const cardName = screen.getByText('PROFILE');

        expect(cardImage).toBeInTheDocument();
        expect(cardName).toBeInTheDocument();
    });
});
