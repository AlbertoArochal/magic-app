import { userContext } from './usercontext';

import { pwReducer } from '../components/reducers/pwreducer';

describe('pwReducer', () => {
    it('should return the initial state', () => {
        const expectedState = { user: {} };
        const state = pwReducer(undefined, {});
        expect(state).toEqual(expectedState);
    });

    it('should handle the LOGIN action', () => {
        const user = { name: 'John Doe' };
        const action = { type: 'LOGIN', payload: user };
        const expectedState = { user };
        const state = pwReducer({ user: {} }, action);
        expect(state).toEqual(expectedState);
    });

    it('should handle the LOGOUT action', () => {
        const action = { type: 'LOGOUT' };
        const expectedState = { user: null };
        const state = pwReducer({ user: { name: 'John Doe' } }, action);
        expect(state).toStrictEqual(expectedState);
    });
});
