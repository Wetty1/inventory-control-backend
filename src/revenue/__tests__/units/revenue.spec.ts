import { Revenue } from '../../domain/entity/revenue';

it('should be created a new revenue', () => {
    const revenue = Revenue.create(100, new Date());
    expect(revenue).toBeInstanceOf(Revenue);
});

it('should be created a new revenue with id', () => {
    expect(() => Revenue.create(null, null)).toThrow(
        new Error('Revenue invalid'),
    );
});
