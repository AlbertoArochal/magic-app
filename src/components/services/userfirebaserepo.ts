import { auth, Firedb, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { set, ref, remove, update, onValue } from 'firebase/database';
import { CardType } from '../../models/cardtype';
export class UserFirebaseRepo {
    async signInWithGoogle() {
        const result = await signInWithPopup(auth, provider);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const user = {
            uid: result.user.uid,
            username: name,
            email,
            profilePic,
            displayName: name,
            decks: { deck1: [] },
        };
        set(ref(Firedb, 'users/' + user.uid), user);
        return user;
    }
    async signOut() {
        await auth.signOut();
    }
    async deleteUser(uid: string) {
        await remove(ref(Firedb, 'users/' + uid));
        return true;
    }
    async addCard(uid: string, card: CardType) {
        const cardObject = { [card.name]: card };
        await update(ref(Firedb, 'users/' + uid + '/decks/deck1/'), cardObject);
    }

    /* Funcion pendiente de implementar
    async removeCard(uid: string, card: string) {
        await remove(ref(Firedb, 'users/' + uid + '/decks/deck1/' + card));
    } */
    async getDeck(uid: string) {
        const dbRef = ref(Firedb, 'users/' + uid + '/decks/deck1/');
        const deck: any = [];
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            Object.entries(data).forEach(([key, value]) => {
                const obj = Object.assign({ name: key }, value);
                deck.push(obj);
            });
        });

        return deck;
    }

    /* Funciones pendiente de implementar
    async addDeck(uid: string, deck: string) {
        const deckObject = { [deck]: deck };
        await update(ref(Firedb, 'users/' + uid + '/decks/'), deckObject);
    }
    async removeDeck(uid: string, deck: string) {
        await remove(ref(Firedb, 'users/' + uid + '/decks/' + deck));
    } */
}
