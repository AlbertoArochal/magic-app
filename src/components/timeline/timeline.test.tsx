import { Timeline } from './timeline';
import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('Timeline component', () => {
    test('renders the timeline component', () => {
        mockAllIsIntersecting(true);
        render(
            <BrowserRouter>
                <Timeline />
            </BrowserRouter>
        );
        const linkElement = screen.getByText('Back to 2022 →');
        expect(linkElement).toBeInTheDocument();
    });

    test('shows the years correctly', () => {
        mockAllIsIntersecting(true);
        render(
            <BrowserRouter>
                <Timeline />
            </BrowserRouter>
        );
        const yearElements = screen.getAllByText(/[0-9]{4}/);
        expect(yearElements).toHaveLength(62);
    });
});
