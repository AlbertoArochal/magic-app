import { App } from './App';
import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { MemoryRouter } from 'react-router-dom';

jest.mock('./components/footer/footer', () => ({
    Footer: () => (
        <div>
            <div>Alberto Rocha Lopez</div>
            <div>
                <ul>
                    <li>Github</li>
                    <li>Linkedin</li>
                    <li>Mail</li>
                </ul>
            </div>
        </div>
    ),
}));

describe('App', () => {
    it('should render the app correctly', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        mockAllIsIntersecting(true);
        expect(screen.getByText('Secret Lair')).toBeInTheDocument();
        expect(screen.getByText('PROFILE')).toBeInTheDocument();
    });
});
