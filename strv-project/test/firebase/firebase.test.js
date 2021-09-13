
'use strict';

const { expect } = require('chai');
const api = require('./onContactCreate.test');
const userId = "5f00e1cd0ed78d3af3ffe7a0"
const mockContact = require('./mock.contact.test.test')
const admin = require('firebase-admin');
const testEnv = require('./online.test');

if (admin.apps.length === 0) {
    admin.initializeApp();
}

describe('firebase testing', () => {
    let adminStub;
    beforeAll(() => {
        adminStub = jest.spyOn(admin, "initializeApp");
    });

    afterAll(() => {
        adminStub.mockRestore();
        testEnv.cleanup();
        admin.database().ref("address").remove();
    });

    it('inserting contact into firebase', async () => {
        const wrapped = testEnv.wrap(api.onContactCreate);
        await wrapped({ ...mockContact });

        await admin.database().ref(`address/${userId}`).once('value', (dataSnapshot) => {
            expect(dataSnapshot).to.not.be.null;
        });
    });
});