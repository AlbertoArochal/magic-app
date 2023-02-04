import { PlanesWalkerReducer, initialState } from './planeswalkerreducer';

describe('PlanesWalkerReducer', () => {
    it('should return the initial state', () => {
        expect(PlanesWalkerReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle LOGIN', () => {
        expect(
            PlanesWalkerReducer(initialState, {
                type: 'LOGIN',
                payload: { name: 'test' },
            })
        ).toEqual({ user: { name: 'test' } });
    });
    it('should handle LOGOUT', () => {
        expect(
            PlanesWalkerReducer(initialState, {
                type: 'LOGOUT',
            })
        ).toEqual(initialState);
    });
});
