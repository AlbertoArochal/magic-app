import { ProfilePage } from './profilepage';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('ProfilePage', () => {
    it('should render the page correctly', () => {
        render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );
        expect(screen.getByText('Your Profile')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
        expect(screen.getByText('Delete Account')).toBeInTheDocument();
    });
});
