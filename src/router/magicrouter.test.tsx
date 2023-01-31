import { MagicRouter } from './magicrouter';

describe('MagicRouter', () => {
    it('should render', () => {
        expect(MagicRouter).toBeDefined();
    });
    it('should return paths', () => {
        expect(MagicRouter().props.children).toHaveLength(3);
    });
});
