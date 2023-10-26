describe('math function', () => {

    const add = (a: number, b: number): number => a + b

    it('should add two numbers correctly', () => {
        expect(add(1, 2)).toBe(3);
    });

    it('should add negative numbers correctly', () => {
        expect(add(-1, -2)).toBe(-3);
    });

    it('should handle zero values correctly', () => {
        expect(add(0, 0)).toBe(0);
    });
});
