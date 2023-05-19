
const {callAPI} = require("../request");
const config = require('../../config/index');

async function getToken() {
    let params = {
        url: `${config.finvu.baseUrl}/User/Login`,
        method: "POST",
        data: {
            userId: process.env.LOGIN,
            password: process.env.PASS
        }
    }

    let response = await callAPI(params);
    return (response && response.body)?response.body.token:response;
}

async function requestConsent(consentsData, token) {
    let params = {
        url:  `${config.finvu.baseUrl}/ConsentRequestEncrypt`,
        method: "POST",
        headers: {
            'Authorization': 'Bearer: ' + token
        },
        data: {
            custId: consentsData.mobile + "@finvu",
            consentDescription: "For one time statement",
            templateName: "BANK_STATEMENT_ONETIME",
            // templateName: "FINVUDEMO_TESTING",
            userSessionId: 'userSessionId123'
        },
    };

    let response = await callAPI(params);
    return (response)?response:response;

}

async function consentStatus(user) {
    let params = {
        url:  `${config.finvu.baseUrl}/ConsentStatus/${user.consentHandleId}/${user.custId}`,
        method: "GET",
        headers: {
            'Authorization': 'Bearer: ' + user.token
        }
    };

    let response = await callAPI(params);
    return (response)?response:response;

}


async function FIRequest(user) {

    let params = {
        url:  `${config.finvu.baseUrl}/FIRequest`,
        method: "POST",
        headers: {
            'Authorization': 'Bearer: ' + user.token
        },
        data: {
            custId: user.custId,
            consentId: user.consentId,
            consentHandleId: user.consentHandleId,
            dateTimeRangeFrom: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
            dateTimeRangeTo: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
        },
    };
    let response = await callAPI(params);
    return (response)?response:response;
}

async function checkFIStatus(user) {
    let params = {
        url:  `${config.finvu.baseUrl}/FIStatus/${user.consentId}/${user.sessionId}/${user.consentHandleId}/${user.custId}`,
        method: "GET",
        headers: {
            'Authorization': 'Bearer: ' + user.token
        }
    };
    let response = await callAPI(params);
    return (response)?response:response;
}

async function fetchFI(user) {
    let params = {
        url:  `${config.finvu.baseUrl}/FIFetch/${user.custId}/${user.consentId}/${user.sessionId}`,
        method: "GET",
        headers: {
            'Authorization': 'Bearer: ' + user.token
        }
    };
    let response = await callAPI(params);
    return (response)?response:response;
}

module.exports = {
    getToken,
    requestConsent,
    consentStatus,
    FIRequest,
    checkFIStatus,
    fetchFI
}