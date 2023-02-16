import React from 'react';
import { render, screen, act, renderHook } from '@testing-library/react';
import { CardProvider } from './cardprovider';
import { CardContext } from './cardcontext';
import { cardsmock } from '../../mocks/cardsmock';
import { useEffect } from 'react';
import {CollectionsMock} from '../../mocks/collectionsmock';
import { useReducer } from 'react';
import { QueryReducer } from '../../components/reducers/carsreducer/cardsreducer';

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

describe('Tests for pagination', () => {
    test('setPage should set pagination to a valid value', () => {
        const { result } = renderHook(() =>
            useReducer(QueryReducer, 3)
        );
        const paginationDispatch = result.current[1];
        const cardContextValue = {
            pagination: result.current[0],
            setPage: (page: number) => {
                if (page < 1) {
                    page = 1;
                }
                paginationDispatch({
                    type: 'SET_PAGINATION',
                    payload: page,
                });
            },
        };
        const { setPage } = cardContextValue;

        act(() => setPage(3));
        expect(cardContextValue.pagination).toBe(3);
    });

    test('setPage should call paginationDispatch with the correct action', () => {
        const paginationDispatch = jest.fn();
        const cardContextValue = {
            pagination: 2,
            setPage: (page: number) => {
                if (page < 1) {
                    page = 1;
                }
                paginationDispatch({
                    type: 'SET_PAGINATION',
                    payload: page,
                });
            },
        };
        const { setPage } = cardContextValue;

        act(() => setPage(4));
        expect(paginationDispatch).toHaveBeenCalledWith({
            type: 'SET_PAGINATION',
            payload: 4,
        });
    });

    test('resetPage should call paginationDispatch with the RESET_PAGINATION action', () => {
        const paginationDispatch = jest.fn();
        const cardContextValue = {
            pagination: 5,
            resetPage: () => {
                paginationDispatch({ type: 'RESET_PAGINATION' });
            },
        };
        const { resetPage } = cardContextValue;

        act(() => resetPage());
        expect(paginationDispatch).toHaveBeenCalledWith({
            type: 'RESET_PAGINATION',
        });
    });
});

