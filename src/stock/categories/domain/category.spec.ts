import { Category } from './category';

describe('Category', () => {
    it('should be able to create a category', () => {
        const category = Category.create('test');
        expect(category).toBeTruthy();
    });
});
