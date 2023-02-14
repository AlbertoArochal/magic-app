import React from 'react';
import { Modal } from './modal';
import { screen, render, fireEvent } from '@testing-library/react';
import { cardsmock } from '../../mocks/cardsmock';
import { BrowserRouter } from 'react-router-dom';

describe('Modal component', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(() => JSON.stringify(cardsmock[0])),
            },
            writable: true,
        });
    });

    it('renders its child component', () => {
        const closeModal = jest.fn();
        render(
            <BrowserRouter>
                <Modal closeModal={closeModal} />
            </BrowserRouter>
        );
        expect(screen.getByText('✖')).toBeInTheDocument();
    });
    it('modal closes when clicking close button', () => {
        const closeModal = jest.fn();
        render(
            <BrowserRouter>
                <Modal closeModal={closeModal} />
            </BrowserRouter>
        );
        const button = screen.getByText('✖');
        fireEvent.click(button);
        expect(closeModal).toHaveBeenCalled();
    });
});
