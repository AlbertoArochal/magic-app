import { pwReducer, initialState } from './pwreducer';

describe('pwreducer', () => {
    it('should return the initial state', () => {
        expect(pwReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle LOGIN', () => {
        expect(
            pwReducer(initialState, {
                type: 'LOGIN',
                payload: { name: 'test' },
            })
        ).toEqual({ user: { name: 'test' } });
    });
    it('should handle LOGOUT', () => {
        expect(
            pwReducer(initialState, {
                type: 'LOGOUT',
            })
        ).toEqual({ user: {} });
    });
});
