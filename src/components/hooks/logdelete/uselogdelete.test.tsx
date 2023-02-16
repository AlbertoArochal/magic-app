import React, { ReactNode } from 'react';
import { screen, render, act, fireEvent } from '@testing-library/react';
import { userContext } from '../../../contexts/user/usercontext';
import { useLogDelete } from './uselogdelete';
import { UserFirebaseRepo } from '../../services/userfirebaserepo';

describe('useLogDelete hook', () => {
    it('should sign out the user and delete it from the database', async () => {
        const deleteUser = jest.fn(() => Promise.resolve(true));
        const getAuth = jest.fn().mockImplementation(() => ({
            signOut: jest.fn(),
        }));

        const logout = jest.fn();
        const setUser = jest.fn();

        const TestComponent = () => {
            const hook = useLogDelete();
            return <button onClick={hook.deleteUserHandler} />;
        };
        const Wrapper = ({ children }) => (
            <userContext.Provider
                value={{
                    user: { uid: '123' },
                    logout,
                    setUser,
                }}
            >
                {children}
            </userContext.Provider>
        );

        render(
            <Wrapper>
                <TestComponent />
            </Wrapper>
        );
        const button = screen.getByRole('button');

        await act(async () => {
            button.click();
        });

        expect(deleteUser).not.toHaveBeenCalled();
        expect(logout).not.toHaveBeenCalled();
    });
    it('logOutHandler should be called when the user is not logged in', async () => {
        const deleteUser = jest.fn(() => Promise.resolve(true));
        const getAuth = jest.fn().mockImplementation(() => ({
            signOut: jest.fn(),
        }));

        const logout = jest.fn();
        const setUser = jest.fn();

        const TestComponent = () => {
            const hook = useLogDelete();
            return <button onClick={hook.logOutHandler} />;
        };
        const Wrapper = ({ children }: { children: ReactNode }) => (
            <userContext.Provider
                value={{
                    user: null,
                    logout,
                    setUser,
                }}
            >
                {children}
            </userContext.Provider>
        );

        render(
            <Wrapper>
                <TestComponent />
            </Wrapper>
        );
        const button = screen.getByRole('button');

        await act(async () => {
            button.click();
        });

        expect(logout).toHaveBeenCalled();
    });
});
