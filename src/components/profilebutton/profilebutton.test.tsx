import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { userContext } from '../../contexts/user/usercontext';
import { ProfileButton } from './ProfileButton';
import { useLogDelete } from '../hooks/logdelete/uselogdelete';

jest.mock('../hooks/logdelete/uselogdelete', () => ({
    useLogDelete: jest.fn(() => ({
        login: jest.fn(),
        deleteAccount: jest.fn(),
    })),
}));

describe('ProfileButton', () => {
    test('renders correctly when user is not logged in', () => {
        render(
            <userContext.Provider value={{ user: null }}>
                <ProfileButton />
            </userContext.Provider>
        );

        const button = screen.getByRole('button', { name: 'PROFILE' });

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('PROFILE');

        fireEvent.click(button);
        expect(useLogDelete().login).toHaveBeenCalledTimes(1);
    });

    test('renders correctly when user is logged in', () => {
        render(
            <userContext.Provider value={{ user: { uid: '123' } }}>
                <ProfileButton />
            </userContext.Provider>
        );

        const button = screen.getByRole('button', { name: 'PROFILE' });

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('PROFILE');

        fireEvent.click(button);
        expect(window.location.href).toEqual('/profile');
    });
});
