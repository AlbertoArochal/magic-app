import {
    CollectionsReducer,
    CardsReducer,
    FilteredCardsReducer,
} from './cardsreducer';
import {
    initialCards,
    initialFilteredCards,initialCollections
} from '../../../contexts/cards/cardcontext';

describe('CollectionsReducer', () => {
    test('should return right collection', () => {
        const collections = [{ name: 'Colección 1' }, { name: 'Colección 2' }];

        const action = {
            type: 'SET_COLLECTIONS',
            payload: collections,
        };

        const newState = CollectionsReducer(initialCollections, action);

        expect(newState).toEqual({ collections });
    });
    test('should return the initial state', () => {
        expect(CollectionsReducer(undefined, {})).toEqual(initialCollections);
    });

    test('should set the filtered cards', () => {
        const filteredCards = [{ name: 'Carta 1' }, { name: 'Carta 2' }];

        const action = {
            type: 'SET_FILTERED_CARDS',
            payload: filteredCards,
        };

        const newState = FilteredCardsReducer(initialFilteredCards, action);
        expect(newState).toEqual({ filteredCards });
    });
    test('should return the initial state', () => {
        expect(FilteredCardsReducer(undefined, {})).toEqual(initialFilteredCards);
    });
});

describe('CardsReducer', () => {
    test('should set the right cards', () => {
        const cards = [{ name: 'Carta 1' }, { name: 'Carta 2' }];

        const action = {
            type: 'SET_CARDS',
            payload: cards,
        };

        const newState = CardsReducer(initialCards, action);

        expect(newState).toEqual({ cards });
    });
});

describe('CardsReducer 2', () => {
    test('should return the initial state', () => {
        expect(CardsReducer(undefined, {})).toEqual(initialCards);
    });

    test('should handle SET_CARDS', () => {
        const newCards = [
            {
                name: 'Card 1',
                released_at: '1996-06-10',
                image_uris: {
                    small: 'https://cards.scryfall.io/small/front/1/1/1.jpg',
                    large: 'https://cards.scryfall.io/large/front/1/1/1.jpg',
                    art_crop:
                        'https://cards.scryfall.io/art_crop/front/1/1/1.jpg',
                },
                type: 'Creature',
                mana_cost: '{1}{W}',
                oracle_text: 'Flying',
                type_line: 'Creature — Bird',
                color_identity: ['W'],
                artist: 'Pat Morrissey',
                set_name: 'Alliances',
                power: '1',
                toughness: '1',
                flavor_text: 'Flavor text',
            },
            {
                name: 'Card 2',
                released_at: '1996-06-10',
                image_uris: {
                    small: 'https://cards.scryfall.io/small/front/2/2/2.jpg',
                    large: 'https://cards.scryfall.io/large/front/2/2/2.jpg',
                    art_crop:
                        'https://cards.scryfall.io/art_crop/front/2/2/2.jpg',
                },
                type: 'Creature',
                mana_cost: '{2}{W}',
                oracle_text: 'Flying',
                type_line: 'Creature — Bird',
                color_identity: ['W'],
                artist: 'Pat Morrissey',
                set_name: 'Alliances',
                power: '2',
                toughness: '2',
                flavor_text: 'Flavor text',
            },
        ];
        const action = {
            type: 'SET_CARDS',
            payload: newCards,
        };
        const expectedState = {
            ...initialCards,
            cards: newCards,
        };
        expect(CardsReducer(initialCards, action)).toEqual(expectedState);
    });
});
