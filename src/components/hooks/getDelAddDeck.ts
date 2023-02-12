import { UserFirebaseRepo } from '../services/userfirebaserepo';
import { CardType } from '../../models/cardtype';

export const useGetDelAddDeck = () => {
    const userFirebaseRepo = new UserFirebaseRepo();
    const getDeck = async (uid: string) => {
        const deck = await userFirebaseRepo.getDeck(uid);
        return deck;
    };
    const addCard = async (uid: string, card: CardType) => {
        await userFirebaseRepo.addCard(uid, card);
    };
    /* Implement these later
    const addDeck = async (uid: string, deck: string) => {
        await userFirebaseRepo.addDeck(uid, deck);
    };
    const deleteDeck = async (uid: string, deck: string) => {
        await userFirebaseRepo.removeDeck(uid, deck);
    };*/
    return { getDeck, addCard };
};
