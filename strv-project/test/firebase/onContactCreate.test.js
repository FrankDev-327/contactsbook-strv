'use strict';

const admin = require('firebase-admin');
const userId = "5f00e1cd0ed78d3af3ffe7a0";
const mockContact = require('./mock.contact.test.test');
const functions = require('firebase-functions');

const onContactCreate = functions.auth.user().onCreate(conatct => {
    admin.database().ref(`/address/${userId}`).set(mockContact);
});

module.exports = {
    onContactCreate
};