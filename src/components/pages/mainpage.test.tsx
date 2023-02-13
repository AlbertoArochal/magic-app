import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from './mainpage';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { userContext } from '../../contexts/user/usercontext';
import { initialState } from '../reducers/planeswalkerreducer';
describe('MainPage', () => {
    it('should render the page correctly', () => {
        mockAllIsIntersecting(true);
        render(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        );

        expect(screen.getByText('Magic')).toBeInTheDocument();
        expect(screen.getByAltText('five colors icons')).toBeInTheDocument();
    });
});
