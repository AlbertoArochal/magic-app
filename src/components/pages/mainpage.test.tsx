import { render } from '@testing-library/react';
import { MainPage } from './mainpage';

describe('MainPage', () => {
    it('should render the page correctly', () => {
        const { getByText, getByAltText } = render(<MainPage />);

        expect(getByText('MAGIC')).toBeInTheDocument();
        expect(getByText('Sign Up Now >')).toBeInTheDocument();
        expect(getByAltText('five colors icons')).toBeInTheDocument();
    });
});
