import React from 'react';
import { render, cleanup, act, screen } from '@testing-library/react';
import { DeckPage } from './DeckPage';
import { userContext } from '../../contexts/user/usercontext';

jest.mock('../hooks/getdeladddeck', () => ({
    useGetDelAddDeck: () => ({
        getDeck: jest.fn(() => Promise.resolve(cardsMock)),
    }),
}));

const cardsMock = [
    {
        name: 'card 1',
        image_uris: {
            small: 'url_image_1',
        },
    },
    {
        name: 'card 2',
        image_uris: {
            small: 'url_image_2',
        },
    },
];

describe('DeckPage', () => {
    afterEach(cleanup);

    it('renders the list of cards', async () => {
        const user = { uid: '123' };
        render(
            <userContext.Provider value={{ user }}>
                <DeckPage />
            </userContext.Provider>
        );

        await act(async () => {
            await new Promise((res) => setTimeout(res, 0));
        });

        expect(screen.getByText('card 1')).toBeInTheDocument();
        expect(screen.getByText('card 2')).toBeInTheDocument();
        expect(screen.getByAltText('card 1')).toHaveAttribute(
            'src',
            'url_image_1'
        );
        expect(screen.getByAltText('card 2')).toHaveAttribute(
            'src',
            'url_image_2'
        );
    });
});
