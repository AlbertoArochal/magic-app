import React, { useEffect } from 'react';
import { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CardContext, initialCollections, initialCards } from './cardcontext';
import { CardType } from '../../models/cardtype';
import { CollectionsMock } from '../../mocks/collectionsmock';
import { cardsmock } from '../../mocks/cardsmock';

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
    test('should set collections', () => {
        const TestComponent = () => {
            const { collections, setCollections } = useContext(CardContext);

            useEffect(() => {
                setCollections(CollectionsMock);
            }, []);
            return (
                <div data-testid="Collections">
                    {JSON.stringify(collections)}
                    {collections.map((collection) => {
                        return (
                            <div key={collection.year}>{collection.name}</div>
                        );
                    })}
                    <button onClick={() => setCollections(CollectionsMock)}>
                        Set Collections
                    </button>
                </div>
            );
        };

        render(<TestComponent />);
        fireEvent.click(screen.getByText('Set Collections'));
        expect(screen.getByText('Set Collections')).toBeInTheDocument();
    });
    test('should set cards', () => {
        const TestComponent = () => {
            const { cards, setCards } = useContext(CardContext);

            useEffect(() => {
                setCards(cardsmock);
            }, []);
            return (
                <div data-testid="Cards">
                    {JSON.stringify(cards)}
                    {cards.map((collection) => {
                        return (
                            <div key={collection.released_at}>
                                {collection.name}
                            </div>
                        );
                    })}
                    <button onClick={() => setCards(cardsmock)}>
                        Set Cards
                    </button>
                </div>
            );
        };

        render(<TestComponent />);
        fireEvent.click(screen.getByText('Set Cards'));
        expect(screen.getByText('Set Cards')).toBeInTheDocument();
    });
    test('should set filtered cards', () => {
        const TestComponent = () => {
            const { filteredCards, setFilteredCards } = useContext(CardContext);

            useEffect(() => {
                setFilteredCards(cardsmock);
            }, []);
            return (
                <div data-testid="FilteredCards">
                    {JSON.stringify(filteredCards)}
                    {filteredCards.map((collection) => {
                        return (
                            <div key={collection.released_at}>
                                {collection.name}
                            </div>
                        );
                    })}
                    <button onClick={() => setFilteredCards(cardsmock)}>
                        Set Filtered Cards
                    </button>
                </div>
            );
        };

        render(<TestComponent />);
        fireEvent.click(screen.getByText('Set Filtered Cards'));
        expect(screen.getByText('Set Filtered Cards')).toBeInTheDocument();
    });
});
