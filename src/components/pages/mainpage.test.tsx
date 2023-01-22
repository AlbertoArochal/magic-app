import { render } from '@testing-library/react';
import { MainPage } from './mainpage';
describe('MainPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<MainPage />);
        expect(baseElement).toBeTruthy();
        expect('My App').toBeTruthy();
    });
});
