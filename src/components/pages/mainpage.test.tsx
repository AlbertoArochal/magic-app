import { render, screen } from '@testing-library/react';
import { MainPage } from './mainpage';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

describe('MainPage', () => {
    it('should render the page correctly', () => {
        mockAllIsIntersecting(true);
        render(<MainPage />);

        expect(screen.getByText('Magic')).toBeInTheDocument();
        expect(screen.getByText('Sign Up Now >')).toBeInTheDocument();
        expect(screen.getByAltText('five colors icons')).toBeInTheDocument();
    });
});
