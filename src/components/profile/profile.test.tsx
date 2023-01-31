import { Profile } from './profile';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Profile', () => {
    it('should render', () => {
        render(<Profile />);
        expect(Profile).toBeDefined();
    });
});
