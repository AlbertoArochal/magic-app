import { deleteUser } from './deleteuser';
import { ref } from 'firebase/database';
import { Firedb } from '../firebase/firebase';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('deleteUser', () => {
    it('should return true after removing the user', async () => {
        const uid = '123';
        const mockRemove = jest.fn().mockResolvedValue(null);
        const mockRef = jest.fn().mockReturnValue({ remove: mockRemove });
        (ref as jest.Mock).mockImplementation(mockRef);

        const result = await deleteUser(uid);
        expect(result).toBe(true);
        expect(ref).toHaveBeenCalledWith(Firedb, 'users/' + uid);
    });
});
