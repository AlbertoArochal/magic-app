import { loginpw, logoutpw } from './actions';

describe('actions', () => {
    it('should create an action to login', () => {
        const expectedAction = {
            type: 'LOGIN',
            payload: 'test',
        };
        expect(loginpw('test')).toEqual(expectedAction);
    });
    it('should create an action to logout', () => {
        const expectedAction = {
            type: 'LOGOUT',
        };
        expect(logoutpw()).toEqual(expectedAction);
    });
});
