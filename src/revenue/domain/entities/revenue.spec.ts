import { Revenue } from './revenue';

it('should be created a new revenue', () => {
    const revenue = new Revenue(1, 100, new Date());
    expect(revenue).toBeInstanceOf(Revenue);
});

it('should be created a new revenue with id', () => {
    expect(() => new Revenue(null, null, null)).toThrow(
        new Error('Revenue invalid'),
    );
});
