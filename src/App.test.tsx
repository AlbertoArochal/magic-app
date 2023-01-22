import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
    test('renders main page', () => {
        render(<App />);
        const mainPage = screen.getByText('MAGIC');
        expect(mainPage).toBeInTheDocument();
    });

    test('renders footer', () => {
        render(<App />);
        const footer = screen.getByText('Alberto Rocha Lopez 2023');
        expect(footer).toBeInTheDocument();
    });
});
