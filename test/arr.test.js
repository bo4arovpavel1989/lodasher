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

    describe('drop', () => {
        it('should return empty array', () => {
            const arr = [];
            expect(_.drop(arr, 1)).to.eql([]);
        });
        it('should return sliced array', () => {
            const arr = [1, 2, 3, 4, 5, 6];
            expect(_.drop(arr, 2)).to.eql([3, 4, 5, 6]);
        });
    });

    describe('dropRight', () => {
        it('should return empty array', () => {
            const arr = [];
            expect(_.dropRight(arr, 1)).to.eql([]);
        });
        it('should return sliced array', () => {
            const arr = [1, 2, 3, 4, 5, 6];
            expect(_.dropRight(arr, 2)).to.eql([1, 2, 3, 4]);
        });
    });

    describe('dropRightWhile', () => {
        it('should return empty array', () => {
            const arr = [];
            expect(_.dropRightWhile(arr, Boolean)).to.eql([]);
        });
        it('should return sliced array', () => {
            const arr = [1, 2, 3, 4, false, false];
            expect(_.dropRightWhile(arr, (val) => val === false)).to.eql([1, 2, 3, 4]);
        });
        it('should return sliced array', () => {
            const arr = [
                { 'user': 'barney',  'active': true },
                { 'user': 'fred',    'active': false },
                { 'user': 'pebbles', 'active': false }
              ];
            expect(_.dropRightWhile(arr, o => !o.active )).to.eql([{ 'user': 'barney',  'active': true }]);
        });
    });

    describe('fill', () => {
        it('should return fileed array', () => {
            const arr = [1, 2, 3];

            _.fill(arr, 'a');
            expect(arr).to.eql(['a', 'a', 'a']);
        });
        it('should return fileed array', () => {
            expect(_.fill(Array(3), 2)).to.eql([2, 2, 2]);
        });
        it('should return fileed array', () => {
            expect(_.fill([4, 6, 8, 10], '*', 1, 3)).to.eql([4, '*', '*', 10]);
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

    describe('findLastIndex', () => {
        it('should return right index', () => {
            const arr = [1, 2, 3, 4];
            const fn = (val) => (val % 2 === 0);
            expect(_.findLastIndex(arr, fn)).to.eql(3);
        });
        it('should return right index, starting from the middle of array', () => {
            const arr = [1, 2, 3, 4, 5, 6];
            const fn = (val) => (val % 2 === 0);
            expect(_.findLastIndex(arr, fn, 4)).to.eql(3);
        });
        it('should return -1 index', () => {
            const arr = [1, 3, 5, 7];
            const fn = (val) => (val % 2 === 0);
            expect(_.findLastIndex(arr, fn)).to.eql(-1);
        });
    });

    describe('head', () => {
        it('should return first element', () => {
            const arr = [1, 2, 3, 4];
            expect(_.head(arr)).to.eql(1);
        });
        it('should return undefined', () => {
            const arr = [];
            expect(_.head(arr)).to.eql(undefined);
        });
    });
});