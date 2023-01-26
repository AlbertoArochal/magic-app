import { signInWithGoogle } from './signwithgoogle';
import { auth, Firedb } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebase';
import { set, ref } from 'firebase/database';
describe('signInWithGoogle', () => {
    it('should call signInWithPopup and set user data in the database', () => {
        const mockSignInWithPopup = jest.fn();
        const mockSet = jest.fn();
        const mockRef = jest.fn();

        jest.mock('firebase', () => ({
            auth: {
                signInWithPopup: mockSignInWithPopup,
            },
            database: () => ({
                ref: mockRef,
                set: mockSet,
            }),
        }));

        const userData = {
            uid: '123',
            name: 'John Doe',
            email: 'johndoe@example.com',
            profilePic: 'https://example.com/profilepic.jpg',
            decks: { deck1: ['necropotency'] },
        };
        const result = { user: userData };
        mockSignInWithPopup.mockResolvedValue(result);

        signInWithGoogle();

        expect(mockSignInWithPopup).toHaveBeenCalledWith(auth, provider);
        expect(mockRef).toHaveBeenCalledWith(Firedb, 'users/123');
        expect(mockSet).toHaveBeenCalledWith(userData);
    });
});
