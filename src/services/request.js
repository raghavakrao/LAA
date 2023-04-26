var axios = require('axios');
const uuid = require('uuid');

async function callAPI({url, method, data, header = {}, headers = {}}) {
    try {
        const head = {
            rid: uuid.v4(),
            ts: new Date().toISOString(),
            channelId: "finsense",
            ...header
        };
        const bodyData = {
            header: {...head,...header},
            body: data,
        }
    
        let config = {
            url: url,
            method: method,
            headers: {
                'Accept': 'application/json',
                ...headers
            },
            data: bodyData,
            json: true,
            timeout: 10000
        }
        const response = await axios(config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    return false;
}

module.exports = {
    callAPI
}