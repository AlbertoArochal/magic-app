import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { ColorScroll } from './colorscroll';

afterEach(cleanup);

describe('ColorScroll', () => {
    it('renders the buttons with the correct colors', () => {
        render(<ColorScroll />);
        const colors = ['blue', 'white', 'green', 'black', 'red'];
        colors.forEach((color) => {
            expect(screen.getByText(color)).toBeInTheDocument();
        });
    });
});
