import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { CardProvider } from './CardProvider';
import { CardContext } from './cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { useEffect } from 'react';

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
});