'use strict';

const path = require('path');
const functions = require('firebase-functions-test');
const pathJsonKey = './strv-addressbook-gonzale-25cc5-firebase-adminsdk-k8ckl-a0daf03226.json';

const projectConfig = {
    projectId: "strv-addressbook-gonzale-25cc5",
    databaseURL: "https://strv-addressbook-gonzale-25cc5-default-rtdb.firebaseio.com/",
    storageBucket: "https://console.firebase.google.com/project/strv-addressbook-gonzale-25cc5/storage/strv-addressbook-gonzale-25cc5.appspot.com/files",
};

const testEnv = functions(projectConfig, path.resolve(pathJsonKey));
module.exports = testEnv;