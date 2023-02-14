import { UserFirebaseRepo } from './userfirebaserepo';
import { auth } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebase';
import { set, ref, update, onValue } from 'firebase/database';
import { Firedb } from '../firebase/firebase';
import { CardType } from '../../models/cardtype';
import { cardsmock } from '../../mocks/cardsmock';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('UserFirebaseRepo', () => {
    const userRepo = new UserFirebaseRepo();
    it('should be defined', () => {
        expect(UserFirebaseRepo).toBeDefined();
    });
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
        await userRepo.signInWithGoogle();
        expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
        expect(set).toHaveBeenCalledTimes(1);
    });
    it('should return true after removing the user', async () => {
        const uid = '123';
        const mockRemove = jest.fn().mockResolvedValue(null);
        const mockRef = jest.fn().mockReturnValue({ remove: mockRemove });
        (ref as jest.Mock).mockImplementation(mockRef);

        const result = await userRepo.deleteUser(uid);
        expect(result).toBe(true);
        expect(ref).toHaveBeenCalledWith(Firedb, 'users/' + uid);
    });

    it('should add a card', async () => {
        const card: CardType = cardsmock[0];
        const cardObject = { [card.name]: card };
        const mockRef = {
            update: jest.fn(),
        };
        (ref as jest.Mock).mockReturnValue(mockRef);
        await userRepo.addCard('uid', card);
        expect(update).toHaveBeenCalledWith(
            ref(Firedb, 'users/uid/decks/deck1/'),
            cardObject
        );
    });
    it('OnValue should be called', async () => {
        const mockRef = {
            onValue: jest.fn(),
        };
        (ref as jest.Mock).mockReturnValue(mockRef);
        await userRepo.getDeck('uid');
        expect(onValue).toHaveBeenCalledWith(
            ref(Firedb, 'users/uid/decks/'),
            expect.any(Function)
        );
    });
    
});
