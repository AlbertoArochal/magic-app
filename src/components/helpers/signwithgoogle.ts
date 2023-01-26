import { auth, Firedb } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebase';
import { set, ref } from 'firebase/database';

export const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const user = {
            uid: result.user.uid,
            name,
            email,
            profilePic,
            decks: { deck1: ['necropotency'] },
        };
        set(ref(Firedb, 'users/' + user.uid), user);
        return user;
    });
};
