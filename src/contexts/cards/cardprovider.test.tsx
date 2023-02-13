import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardProvider } from './cardprovider';
import { CardContext } from './cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { useEffect } from 'react';
import {CollectionsMock} from '../../mocks/collectionsmock';

describe('CardProvider', () => {
    it('should provide the right context', () => {
        render(
            <CardProvider>
                <CardContext.Consumer>
                    {(value) => {
                        expect(value.collections).toEqual([]);
                        expect(value.setCollections).toBeInstanceOf(Function);
                        expect(value.cards).toEqual([]);
                        expect(value.setCards).toBeInstanceOf(Function);
                        return null;
                    }}
                </CardContext.Consumer>
            </CardProvider>
        );
    });
    it('should set cards', () => {
        const TestComponent = () => {
            const { cards, setCards } = React.useContext(CardContext);
            useEffect(() => {
                setCards(cardsmock);
            }, []);
            return <div>{cards.length}</div>;
        };

        render(
            <CardProvider>
                <TestComponent />
            </CardProvider>
        );
        const div = screen.getByText('7');
        expect(div).toBeInTheDocument();
        expect(div.textContent).toBe('7');
    });
    test('should set collections', () => {
        const TestComponent = () => {
            const { collections, setCollections } = React.useContext(CardContext);
            useEffect(() => {
                setCollections(CollectionsMock);
            }, []);
            return <div>{collections.length}</div>;
        };

        render(
            <CardProvider>
                <TestComponent />
            </CardProvider>
        );
        const div = screen.getByText('3');
        expect(div).toBeInTheDocument();
    });
    test('shouls set filteredcards' , () => {
        const TestComponent = () => {
            const { filteredCards, setFilteredCards } = React.useContext(CardContext);
            useEffect(() => {
                setFilteredCards(cardsmock);
            }, []);
            return <div>{filteredCards.length}</div>;
        };

        render(
            <CardProvider>
                <TestComponent />
            </CardProvider>
        );
        const div = screen.getByText('7');
        expect(div).toBeInTheDocument();
    });
});
