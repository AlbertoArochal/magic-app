import { render } from '@testing-library/react';
import { Footer } from './footer';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { screen } from '@testing-library/react';

const intersectionObserverMock = () => ({
    observe: () => null,
});
window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

describe('Footer', () => {
    it('should render the footer correctly', () => {
        render(<Footer />);
        mockAllIsIntersecting(true);

        expect(
            screen.getByText('Alberto Rocha Lopez 2023')
        ).toBeInTheDocument();
        expect(screen.getByAltText('github link')).toBeInTheDocument();
        expect(screen.getByAltText('linkedin')).toBeInTheDocument();
        expect(screen.getByAltText('mail')).toBeInTheDocument();
    });
});
