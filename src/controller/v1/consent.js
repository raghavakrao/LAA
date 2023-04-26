const {requestConsent} = require('../../services/finvu/api')

async function createConsentRequest(req, res){
    let resp = await requestConsent({ mobile: req.mobile });
    console.log("resp", resp);
    return res.send({
        message:"success",
        data: resp
    });
}

async function consentRequestHandler(req, res){
    try {
        let finvuConsentData = await requestConsent({ mobile: req.query.mobile });
        if (finvuConsentData) {
            let outputText = `
                <script src="https://webvwlive.finvu.in/sdk/bridge/finvu-aa.js"></script>
                <script>
                    var ecreq = "${finvuConsentData.body.encryptedRequest}"; 
                    var reqdate = "${finvuConsentData.body.requestDate}";
                    var fi = "${finvuConsentData.body.encryptedFiuId}";
                    function launchAA(event){
                        let aa = new FinvuAA();
                        aa.open(ecreq, reqdate, fi, function (response){
                        console.log(JSON.stringify(response.data));
                        });  
                    }
                    window.onload = (event) => {
                    launchAA();
                    };
                </script>
                <div style="margin:auto;width: 100vw;text-align: center;height: 100vh;vertical-align: middle;display: table-cell;">
                    Thank you for responding to the consent request.
                </div>
            `;
            console.log("Consent request raised successfully");
            return res.send(outputText);
        } else {
          console.log("Consent request failed");
          return res.send("<h1>ERROR</h1>");
    
        }
    } catch (error) {
        console.log("Error");
        console.log(JSON.stringify(error));
        return res.send("<h1>" + "error" + "</h1>");
    }
}


module.exports = {
    createConsentRequest,
    consentRequestHandler
}