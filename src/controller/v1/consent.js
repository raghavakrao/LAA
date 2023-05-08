const Joi = require('@hapi/joi');
const {requestConsent} = require('../../services/finvu/api');
const { User } = require('../../db/models');

function validateRequest(request) {
    const schema = Joi.object().keys({
        request: Joi.object({
            body: Joi.object({
                mobile: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
            }).required().messages({
                'any.required': 'Invalid request, missing body'
            })
        })
    });

    return schema.validate({ request }, { allowUnknown: true });
}

async function createConsentRequest(req, res){
    let outputText = "<h1>ERROR</h1>";
    let { error, value} = validateRequest(req);
    if (!error) {
        const [user, created] = await User.findOrCreate({
            where: { mobile: req.body.mobile },
          });
        if(user.encryptedRequest && user.requestDate && user.encryptedFiuId){
            outputText = await loadFinvuPopup(user);
        }else{
            let finvuConsentData = await requestConsent({ mobile: req.body.mobile });
            if(finvuConsentData && finvuConsentData.body){
                user.encryptedRequest = finvuConsentData.body.encryptedRequest;
                user.requestDate = finvuConsentData.body.requestDate;
                user.encryptedFiuId = finvuConsentData.body.encryptedFiuId;
                if(await user.save()){
                    outputText = await loadFinvuPopup(user);
                }
            }
        }
    }else{
        outputText = `<h1>${error.details[0].message}</h1>`;
    }
    
    return res.send(outputText);
}

async function loadFinvuPopup(user){
    let outputText = `
        <script src="https://webvwlive.finvu.in/sdk/bridge/finvu-aa.js"></script>
        <script>
            var ecreq = "${user.encryptedRequest}"; 
            var reqdate = "${user.requestDate}";
            var fi = "${user.encryptedFiuId}";
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
    return outputText;
}

module.exports = {
    createConsentRequest,
    consentRequestHandler
}