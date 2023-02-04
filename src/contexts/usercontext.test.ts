import {
    PlanesWalkerReducer,
    initialState,
} from '../components/reducers/planeswalkerreducer';
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
