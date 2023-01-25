import { FireApp } from './firebase';

describe('FireApp', () => {
    it('should be initialized', () => {
        expect(FireApp.options).not.toBeNull();
    });
});
