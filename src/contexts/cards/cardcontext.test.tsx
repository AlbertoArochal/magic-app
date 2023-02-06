import { useContext } from 'react';
import { render } from '@testing-library/react';
import { CardContext, initialCollections, initialCards } from './cardcontext';
import { CardType } from '../../models/cardtype';

describe('CardContext', () => {
    it('should set and update collections and cards', () => {
        let collections = initialCollections.collections;
        let setCollections = (collections) => {
            collections = collections;
        };
        let cards = initialCards.cards;
        let setCards = (cards: CardType[]) => {
            cards = cards;
        };

        const TestComponent = () => {
            const context = useContext(CardContext);
            collections = context.collections;
            setCollections = context.setCollections;
            cards = context.cards;
            setCards = context.setCards;

            return <div />;
        };

        render(
            <CardContext.Provider
                value={{ collections, setCollections, cards, setCards }}
            >
                <TestComponent />
            </CardContext.Provider>
        );

        expect(collections).toEqual(initialCollections.collections);
        expect(cards).toEqual(initialCards.cards);
    });
});
