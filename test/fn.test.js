const _ = require('../out');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Function fns', () => {
    describe('after', () => {
        it('should call function after array args executed', () => {
            const saves = ['profile', 'settings'];
            const callback = sinon.spy();
            const done = _.after(saves.length, callback);
            const asyncSave = (data) => {
                data.complete()
            };
    
            saves.forEach(type => {
                asyncSave({ 'type': type, 'complete': () => done(type) });
            });

            expect(callback.withArgs('settings').calledOnce).to.eql(true);
        });
    });
});