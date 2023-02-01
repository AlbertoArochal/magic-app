import { pwReducer, initialState } from '../components/reducers/pwreducer';

describe('pwReducer', () => {
    it('should return the initial state', () => {
        const expectedState = initialState;
        const state = pwReducer(undefined, { type: null, payload: null });
        expect(state).toEqual(expectedState);
    });

    it('should handle the LOGIN action', () => {
        const user = { name: 'John Doe' };
        const action = { type: 'LOGIN', payload: user };
        const expectedState = { user };
        const state = pwReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });
    it('should handle the LOGOUT action', () => {
        const action = { type: 'LOGOUT' };
        const expectedState = { user: null };
        const state = pwReducer(initialState, action);
        expect(state).toStrictEqual(expectedState);
    });
    it('should return the initial state if the action type is unknown', () => {
        const action = { type: 'UNKNOWN' };
        const expectedState = initialState;
        const state = pwReducer(undefined, action);
        expect(state).toStrictEqual(expectedState);
    });
});
