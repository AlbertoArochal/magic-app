import {
    PlanesWalkerReducer,
    initialState,
} from '../../components/reducers/planeswalkerreducer';

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { UserProvider } from './provider';
import { userContext } from './usercontext';
import { useContext } from 'react';

describe('pwReducer', () => {
    it('should return the initial state', () => {
        const expectedState = initialState;
        const state = PlanesWalkerReducer(undefined, {
            type: null,
            payload: null,
        });
        expect(state).toEqual(expectedState);
    });
});

describe('UserProvider', () => {
    afterEach(cleanup);

    it('should provide the correct initial values', () => {
        render(
            <UserProvider>
                <userContext.Consumer>
                    {(value) => (
                        <div data-testid="user-provider">
                            {value.user === null && 'User is null'}
                        </div>
                    )}
                </userContext.Consumer>
            </UserProvider>
        );
        expect(screen.getByTestId('user-provider').textContent).toBe(
            'User is null'
        );
    });
});

afterEach(cleanup);

describe('UserProvider', () => {
    it('provides the user context', () => {
        const TestComponent = () => {
            const { user, setUser } = useContext(userContext);

            return (
                <>
                    <div data-testid="user">{JSON.stringify(user)}</div>
                    <button
                        data-testid="set-user-button"
                        onClick={() => setUser({ name: 'Test User' })}
                    >
                        Set User
                    </button>
                </>
            );
        };

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        expect(screen.getByTestId('user').textContent).toBe('null');

        const setUserButton = screen.getByTestId('set-user-button');
        setUserButton.click();

        expect(screen.getByTestId('user').textContent).not.toBe(
            JSON.stringify({ name: 'Test User' })
        );
    });
    it('provides the logout function', () => {
        const TestComponent = () => {
            const { user, logout } = useContext(userContext);

            return (
                <>
                    <div data-testid="user">{JSON.stringify(user)}</div>
                    <button data-testid="logout-button" onClick={logout}>
                        Logout
                    </button>
                </>
            );
        };

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        expect(screen.getByTestId('user').textContent).toBe('null');

        const logoutButton = screen.getByTestId('logout-button');
        logoutButton.click();

        expect(screen.getByTestId('user').textContent).toBe('null');
    });
});
