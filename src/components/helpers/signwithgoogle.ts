import { auth, Firedb } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase/firebase';
import { set, ref } from 'firebase/database';

export const signInWithGoogle = async () => {
    try {
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
            decks: { deck1: ['necropotency'] },
        };
        set(ref(Firedb, 'users/' + user.uid), user);
        return user;
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        return {
            ok: false,
            errorCode,
            errorMessage,
            email,
        };
    }
};
