const _ = require('../out');
const { expect } = require('chai');

describe('Array fns', () => {
    describe('chunk', () => {
        it('should return chunked array', () => {
            expect(_.chunk(['a', 'b', 'c', 'd'], 2)).to.eql([['a', 'b'], ['c', 'd']]);
        });
        it('should return chunked array', () => {
            expect(_.chunk(['a', 'b', 'c', 'd'], 3)).to.eql([['a', 'b', 'c'], ['d']]);
        });
        it('should return empty array', () => {
            expect(_.chunk(['a', 'b', 'c', 'd'], 0)).to.eql([]);
        });
    });

    describe('compact', () => {
        it('should return empty array', () => {
            const before = [0, false, '', undefined, null];
            expect(_.compact(before)).to.eql([]);
        });
        it('should return array only with nums and chars', () => {
            const before = [0, 1, false, 2, '', 'b', undefined, 'c', null];
            expect(_.compact(before)).to.eql([1, 2, 'b', 'c']);
        });
    });

    describe('concat', () => {
        it('should return concated array', () => {
            const array = [1];
            const other = _.concat(array, 2, [3], [[4]]);
            expect(other).to.eql([1, 2, 3, [4]]);
            expect(array).to.eql([1]);
        });
    });

    describe('difference', () => {
        it('should return empty array', () => {
            const first = [1, 2, 'c', false, null];
            const second = [1, 2, 'c', false, null];
            expect(_.difference(first, second)).to.eql([]);
        });
        it('should return difference array', () => {
            const first = [1, 2, 'c', false, null];
            const second = [1, 'c', null];
            expect(_.difference(first, second)).to.eql([2, false]);
        });
    });

    describe('differenceBy', () => {
        it('should return empty array', () => {
            const first = [1, 2, 'c', false, null];
            const second = [1, 2, 'c', false, null];
            expect(_.differenceBy(first, second, Boolean)).to.eql([]);
        });
        it('should return difference array', () => {
            const first = [2.1, 1.2];
            const second = [2.3, 3.4];
            expect(_.differenceBy(first, second, Math.floor)).to.eql([1.2]);
        });
        it('should return difference array', () => {
            [{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x'
            const first = [{ 'x': 2 }, { 'x': 1 }];
            const second = [{ 'x': 1 }];
            expect(_.differenceBy(first, second, 'x')).to.eql([{ 'x': 2 }]);
        });
    });

    describe('differenceWith', () => {
        it('should return empty array', () => {
            const first = [1, 2, 'c', false, null];
            const second = [1, 2, 'c', false, null];
            expect(_.differenceBy(first, second, (val, other) => val === other)).to.eql([]);
        });
        it('should return difference array', () => {
            const first = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
            const second = [{ 'x': 1, 'y': 2 }];
            const isEqual = (obj1, obj2) => {
                for (let prop in obj1) {
                    if (obj1[prop] !== obj2[prop]) {
                        return false;
                    }
                }
                for (let prop in obj2) {
                    if (obj1[prop] !== obj2[prop]) {
                        return false;
                    }
                }

                return true;
            }

            expect(_.differenceWith(first, second, isEqual)).to.eql([{ 'x': 2, 'y': 1 }]);
        });
    });

    describe('findIndex', () => {
        it('should return right index', () => {
            const arr = [1, 2, 3];
            const fn = (val) => (val % 2 === 0);
            expect(_.findIndex(arr, fn)).to.eql(1);
        });
        it('should return right index, starting from the middle of array', () => {
            const arr = [1, 2, 3, 4, 5, 6];
            const fn = (val) => (val % 2 === 0);
            expect(_.findIndex(arr, fn, 2)).to.eql(3);
        });
        it('should return -1 index', () => {
            const arr = [1, 3, 5, 7];
            const fn = (val) => (val % 2 === 0);
            expect(_.findIndex(arr, fn)).to.eql(-1);
        });
    });
});