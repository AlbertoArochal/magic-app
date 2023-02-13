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
