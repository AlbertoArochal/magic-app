import { auth } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebase';
import { set, ref } from 'firebase/database';

import { signInWithGoogle } from './signwithgoogle';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('signInWithGoogle', () => {
    it('should sign in with google', async () => {
        const mockUser = {
            uid: '123',
            displayName: 'Alberto',
            decks: {},
            name: 'Alberto',
            profilePic: 'https://picsum.photos/200',
        };
        const mockUserRef = {
            set: jest.fn(),
        };
        (signInWithPopup as jest.Mock).mockResolvedValue({
            user: mockUser,
        });
        (ref as jest.Mock).mockReturnValue(mockUserRef);
        await signInWithGoogle();
        expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
        expect(set).toHaveBeenCalledTimes(1);
    });
});
