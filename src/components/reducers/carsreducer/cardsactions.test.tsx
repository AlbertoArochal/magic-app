import { addCollection, addCards } from './cardsactions';

describe('addCollection action', () => {
    it('should return the correct type and payload', () => {
        const collection = { id: 1, name: 'Test Collection' };
        const expectedAction = {
            type: 'SET_COLLECTIONS',
            payload: collection,
        };

        expect(addCollection(collection)).toEqual(expectedAction);
    });
});

describe('addCards action', () => {
    it('should return the correct type and payload', () => {
        const cards = [
            { id: 1, front: 'Card 1 front', back: 'Card 1 back' },
            { id: 2, front: 'Card 2 front', back: 'Card 2 back' },
        ];
        const expectedAction = {
            type: 'SET_CARDS',
            payload: cards,
        };

        expect(addCards(cards)).toEqual(expectedAction);
    });
});
