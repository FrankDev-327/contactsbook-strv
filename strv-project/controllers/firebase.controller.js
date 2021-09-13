'use strict';

const logger = require('../configurations/winston');
const admin = require('../firebase-config/firebase.setup');
//
module.exports = {
    storeIntoFirebase: async (req, res) => {
        try {
            logger.info('storing into firebase');
            const userId = req.user._id;
            const contactInfo = { ...req.body };
            const docRef = await admin.database().ref(`address/${userId}/`);
            docRef.push(contactInfo);
            
            return res.status(200).json({
                message: "Address was inserted successfully!"
            });
        } catch (error) {
            logger.error(error.message);
            return res.status(400).json({
                message: 'Something unexpected happened.'
            });
        }
    }
};