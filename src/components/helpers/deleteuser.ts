import { ref, set, remove } from 'firebase/database';
import { Firedb } from '../firebase/firebase';

export const deleteUser = async (uid: string) => {
    await remove(ref(Firedb, 'users/' + uid));
    return true;
};
