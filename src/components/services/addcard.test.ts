import { addCard } from './addcard';
import { CardType } from '../../models/cardtype';
import { ref, update } from 'firebase/database';
import { Firedb } from '../firebase/firebase';
import { cardsmock } from '../../mocks/cardsmock';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('addCard', () => {
    it('should add a card', async () => {
        const card: CardType = cardsmock[0];
        const cardObject = { [card.name]: card };
        const mockRef = {
            update: jest.fn(),
        };
        (ref as jest.Mock).mockReturnValue(mockRef);
        await addCard('uid', card);
        expect(update).toHaveBeenCalledWith(
            ref(Firedb, 'users/uid/decks/deck1/'),
            cardObject
        );
    });
});
