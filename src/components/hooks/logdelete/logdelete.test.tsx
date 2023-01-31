import { LogDelete } from './LogDelete';
import { getAuth } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
        signOut: jest.fn(),
    })),
}));

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
}));

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    set: jest.fn(),
}));

jest.mock('firebase/app', () => {
    const mAuth = {
        GoogleAuthProvider: jest.fn(() => ({
            setCustomParameters: jest.fn(),
        })),
    };

    return {
        auth: jest.fn(() => mAuth),
    };
});

describe('LogDelete', () => {
    const setup = () => {
        const logOutHandler = LogDelete().logOutHandler;
        const auth = getAuth();
        return {
            logOutHandler,
            auth,
        };
    };

    it('should call signOut when logOutHandler is called', () => {
        const { logOutHandler, auth } = setup();
        logOutHandler();
        expect(auth.signOut).toHaveBeenCalled();
    });

    it('should call signOut and then deleteUser when deleteUserHandler is called', () => {
        const { logOutHandler, auth } = setup();
        const deleteUser = jest.fn();
        logOutHandler();
        expect(deleteUser).toHaveBeenCalled();
        expect(auth.signOut).toHaveBeenCalled();
    });
});
