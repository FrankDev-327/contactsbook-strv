'use strict';
//
const {
    PROJECT_ID,
    CLIENT_EMAIL,
    PRIVATE_KEY,
    FIRE_BASE_DATABASE_URL
} = require('../configurations/config');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: PROJECT_ID,
        privateKey: PRIVATE_KEY,
        clientEmail: CLIENT_EMAIL,
    }),
    databaseURL: FIRE_BASE_DATABASE_URL
});

module.exports = admin;