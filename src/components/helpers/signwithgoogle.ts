import { auth, Firedb } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebase';
import { set, ref } from 'firebase/database';

export const signInWithGoogle = () => {
    console.log('sign in with google');
    signInWithPopup(auth, provider)
        .then((result) => {
            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;
            console.log(result);
            const user = {
                uid: result.user.uid,
                name,
                email,
                profilePic,
                decks: { deck1: ['necropotency'] },
            };
            set(ref(Firedb, 'users/' + result.user.uid), user);
        })
        .catch((error) => {
            console.log(error);
        });
};
