const express = require('express');
const router = express.Router();
const {createConsentRequest, consentRequestHandler} = require('../controller/v1/consent');
const {auth} = require('../middleware')
// router.get('/notification/:id', extractJwtToken, require('../alerts/getNotification'));
router.post('/create-consent-request', auth, createConsentRequest);
// router.get('/create-consent-handler', auth, consentRequestHandler);

module.exports = router;