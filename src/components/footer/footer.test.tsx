import { render } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
    it('should render the footer correctly', () => {
        const { getByText, getByAltText } = render(<Footer />);

        expect(getByText('Alberto Rocha Lopez 2023')).toBeInTheDocument();
        expect(getByAltText('github link')).toBeInTheDocument();
        expect(getByAltText('linkedin')).toBeInTheDocument();
        expect(getByAltText('mail')).toBeInTheDocument();
    });
});
