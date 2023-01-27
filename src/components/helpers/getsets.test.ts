import { GetSets } from './getsets';

describe('GetSets', () => {
    it('should return an array with length greater than 2', async () => {
        const sets1995 = await GetSets(1995);
        const sets2000 = await GetSets(2000);
        const sets2010 = await GetSets(2010);
        expect(sets1995.length > 2).toBe(true);
        expect(sets2000.length > 2).toBe(true);
        expect(sets2010.length > 2).toBe(true);
    });
});
