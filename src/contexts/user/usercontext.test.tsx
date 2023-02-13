import React, { useContext } from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { userContext } from './userContext';

afterEach(cleanup);

describe('userContext', () => {
    it('provides the user and logout function', () => {
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

        render(<TestComponent />);

        expect(screen.getByTestId('user').textContent).toBe('null');

        const logoutButton = screen.getByTestId('logout-button');
        logoutButton.click();

        expect(screen.getByTestId('user').textContent).toBe('null');
    });
    it('provides the user and setUser function', () => {
        const TestComponent = () => {
            const { user, setUser } = useContext(userContext);

            return (
                <>
                    <div data-testid="user">{JSON.stringify(user)}</div>
                    <button
                        data-testid="set-user-button"
                        onClick={() => setUser({ name: 'John Doe' })}
                    >
                        Set User
                    </button>
                </>
            );
        };

        render(<TestComponent />);

        expect(screen.getByTestId('user').textContent).toBe('null');

        const setUserButton = screen.getByTestId('set-user-button');
        setUserButton.click();

        expect(screen.getByTestId('user').textContent).toBe('null');
    });
});
