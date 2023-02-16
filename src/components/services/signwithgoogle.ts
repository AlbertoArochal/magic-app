import { auth, Firedb, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { set, ref,get} from 'firebase/database';

export const signInWithGoogle = async () => {
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
    };
    const userRef = ref(Firedb, `users/${result.user.uid}`);
    console.log(userRef)
    const userSnapshot = await get(userRef);
    console.log(userSnapshot)
    if (!userSnapshot.exists()) {
        await set(ref(Firedb, 'users/' + user.uid), user);
    }
    return user;
};
