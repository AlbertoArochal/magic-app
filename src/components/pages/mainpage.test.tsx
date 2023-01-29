import { render, screen } from '@testing-library/react';
import { MainPage } from './mainpage';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { MemoryRouter } from 'react-router-dom';
describe('MainPage', () => {
    it('should render the page correctly', () => {
        mockAllIsIntersecting(true);
        render(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Magic')).toBeInTheDocument();
        expect(screen.getByText('Sign Up Now >')).toBeInTheDocument();
        expect(screen.getByAltText('five colors icons')).toBeInTheDocument();
    });
});
