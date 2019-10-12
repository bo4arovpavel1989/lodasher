const _ = require('../out');
const { expect } = require('chai');

describe('Array fns', () => {
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