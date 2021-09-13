'use strict';
////
const { expect } = require('chai');
const mockUser = require('./mock.user.test');
const db = require('../db/db.test.spec');
const { creatingUser, findingUser, loggingUser } = require('./user.service.test');
jest.setTimeout(30000);
////
beforeAll(async () => await db.connect());

describe('User created when', () => {
    it('register user', async () => {
        const { userId } = await creatingUser(mockUser.email, mockUser.password);
        const { email, password } = await findingUser(userId);

        expect(password).equal('123456');
        expect(email).equal('__frank@gmail.com');

    });

    it('login user', async () => {
        const { email, password } = await loggingUser(mockUser.email, mockUser.password);
        expect(email).equal('__frank@gmail.com');
        expect(password).equal('123456');
    });
});

afterAll(async () => await db.closeDatabase());