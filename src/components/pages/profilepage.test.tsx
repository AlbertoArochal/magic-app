import { ProfilePage } from './profilepage';
import { screen, render } from '@testing-library/react';

describe('ProfilePage', () => {
    it('should render the page correctly', () => {
        render(<ProfilePage />);
        expect(screen.getByText('Your Profile')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
        expect(screen.getByText('Delete Account')).toBeInTheDocument();
    });
});
