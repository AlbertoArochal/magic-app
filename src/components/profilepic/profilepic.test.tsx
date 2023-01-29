import { ProfilePic } from './profilepic';
import { render } from '@testing-library/react';

describe('ProfilePic', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProfilePic />);
        expect(baseElement).toBeTruthy();
    });
});
