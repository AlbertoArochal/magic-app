import { CardType } from '../../models/cardtype';
import { ref, update } from 'firebase/database';
import { Firedb } from '../firebase/firebase';
export const addCard = async (uid: string, card: CardType) => {
    const cardObject = { [card.name]: card };
    await update(ref(Firedb, 'users/' + uid + '/decks/deck1/'), cardObject);
};
