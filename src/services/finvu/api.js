
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

async function requestConsent(consentsData) {
    let token = await getToken();
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
            userSessionId: 'userSessionId123'
        },
    };

    let response = await callAPI(params);
    return (response)?response:response;

}

module.exports = {
    getToken,
    requestConsent
}