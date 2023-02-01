import { Profile } from './profile';
import { render } from '@testing-library/react';

describe('Profile', () => {
    it('should render', () => {
        render(<Profile />);
        expect(Profile).toBeDefined();
    });
});
