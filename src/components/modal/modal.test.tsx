import React from 'react';
import { Modal } from './Modal';
import { screen, render, fireEvent } from '@testing-library/react';
import { FetchCardDetail } from '../fetchcarddetail/fetchcarddetail';
import { cardsmock } from '../../mocks/cardsmock';

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
        render(<Modal closeModal={closeModal} />);
        expect(screen.getByText('✖')).toBeInTheDocument();
    });
    it('modal closes when clicking close button', () => {
        const closeModal = jest.fn();
        render(<Modal closeModal={closeModal} />);
        const button = screen.getByText('✖');
        fireEvent.click(button);
        expect(closeModal).toHaveBeenCalled();
    });
});
