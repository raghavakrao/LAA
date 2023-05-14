const express = require('express');
const router = express.Router();
const {
    createConsentRequest,
    checkConsentStatus,
    triggerDataRequest,
    checkDataRequestStatus,
    fetchData
} = require('../controller/v1/consent');
const {
    generateJwtToken
} = require('../controller/v1/user');
const {auth} = require('../middleware')
// router.get('/notification/:id', extractJwtToken, require('../alerts/getNotification'));
router.post('/get-token', generateJwtToken);
router.get('/create-consent-request/:token', auth, createConsentRequest);
router.get('/check-consent-status', auth, checkConsentStatus);
router.get('/trigger-request-data', auth, triggerDataRequest);
router.get('/check-data-status', auth, checkDataRequestStatus);
router.get('/fetch-data', auth, fetchData);

module.exports = router;