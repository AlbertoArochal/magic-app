import React from 'react';
import { useContext } from 'react';
import { CardContext } from '../../contexts/cards/cardcontext';
import { CardType } from '../../models/cardtype';
import { Modal } from '../modal/modal';
import { useState } from 'react';
import { cardsmock } from '../../mocks/cardsmock';
import { render, screen, fireEvent } from '@testing-library/react';

import { CardFetcher } from './cardfetcher';

describe('CardFetcher', () => {
    it('should render successfully the cards in cardsmock', () => {
        render(
            <CardContext.Provider
                value={{ cards: cardsmock, filteredCards: [] }}
            >
                <CardFetcher />
            </CardContext.Provider>
        );
        const pigeon = screen.getAllByAltText('Carrier Pigeons')[0];
        expect(pigeon).toBeInTheDocument();
    });
    it('should set a card in localstorage when clicking on a card', () => {
        const setShowModal = jest.fn();
        Object.defineProperty(window, 'localStorage', {
            value: {
                setItem: jest.fn(),
                getItem: jest.fn(() => JSON.stringify(cardsmock[0])),
            },
            writable: true,
        });
        render(
            <CardContext.Provider
                value={{ cards: cardsmock, filteredCards: [] }}
            >
                <CardFetcher />
            </CardContext.Provider>
        );
        const pigeon = screen.getAllByAltText('Carrier Pigeons')[0];
        fireEvent.click(pigeon);
        expect(localStorage.setItem).toHaveBeenCalled();
    });
    it('should render the cards in filteredCards if filteredCards is not empty', () => {
        render(
            <CardContext.Provider
                value={{
                    cards: cardsmock,
                    filteredCards: cardsmock.filter(
                        (card) => card.name === 'Carrier Pigeons'
                    ),
                }}
            >
                <CardFetcher />
            </CardContext.Provider>
        );
        const pigeon = screen.getAllByAltText('Carrier Pigeons')[0];
        expect(pigeon).toBeInTheDocument();
    });
});
