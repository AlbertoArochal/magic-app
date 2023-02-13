import {
    PlanesWalkerReducer,
    initialState,
} from '../../components/reducers/planeswalkerreducer';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { userContext } from './usercontext';
import { useContext } from 'react';
import { UserProvider } from './provider';

describe('PlanesWalkerReducer', () => {
    it('should return the initial state', () => {
        expect(PlanesWalkerReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle LOGIN', () => {
        const action = {
            type: 'LOGIN',
            payload: {
                id: 1,
                name: 'test',
                email: 'arochaldev@gmail.com',
            },
        };
        expect(PlanesWalkerReducer(initialState, action)).toEqual({
            ...initialState,
            user: action.payload,
        });
    });
});
