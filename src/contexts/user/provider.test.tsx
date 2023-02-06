import {
    PlanesWalkerReducer,
    initialState,
} from '../../components/reducers/planeswalkerreducer';

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { UserProvider } from './provider';
import { userContext } from './usercontext';

describe('pwReducer', () => {
    it('should return the initial state', () => {
        const expectedState = initialState;
        const state = PlanesWalkerReducer(undefined, {
            type: null,
            payload: null,
        });
        expect(state).toEqual(expectedState);
    });

    it('should handle the LOGIN action', () => {
        const user = { name: 'John Doe' };
        const action = { type: 'LOGIN', payload: user };
        const expectedState = { user };
        const state = PlanesWalkerReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });
    it('should handle the LOGOUT action', () => {
        const action = { type: 'LOGOUT' };
        const expectedState = { user: null };
        const state = PlanesWalkerReducer(initialState, action);
        expect(state).toStrictEqual(expectedState);
    });
    it('should return the initial state if the action type is unknown', () => {
        const action = { type: 'UNKNOWN' };
        const expectedState = initialState;
        const state = PlanesWalkerReducer(undefined, action);
        expect(state).toStrictEqual(expectedState);
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
