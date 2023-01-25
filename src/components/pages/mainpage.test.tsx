import { render } from '@testing-library/react';
import { MainPage } from './mainpage';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

describe('MainPage', () => {
    it('should render the page correctly', () => {
        mockAllIsIntersecting(true);
        const { getByText, getByAltText } = render(<MainPage />);

        expect(getByText('Magic')).toBeInTheDocument();
        expect(getByText('Sign Up Now >')).toBeInTheDocument();
        expect(getByAltText('five colors icons')).toBeInTheDocument();
    });
});
