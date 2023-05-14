const Joi = require('@hapi/joi');
const {getToken, requestConsent, consentStatus, checkFIStatus, FIRequest, fetchFI} = require('../../services/finvu/api');
const { User } = require('../../db/models');

async function createConsentRequest(req, res){
    let outputText = "<h1>ERROR</h1>";
    const [user, created] = await User.findOrCreate({
        where: { mobile: req.mobile },
        });
    if(user.encryptedRequest && user.requestDate && user.encryptedFiuId){
        outputText = await loadFinvuPopup(user);
    }else{
        let token = await getToken();
        let finvuConsentData = await requestConsent({ mobile: req.mobile }, token);
        if(finvuConsentData && finvuConsentData.body){
            user.token = token;
            user.custId = req.mobile+"@finvu";
            user.encryptedRequest = finvuConsentData.body.encryptedRequest;
            user.requestDate = finvuConsentData.body.requestDate;
            user.encryptedFiuId = finvuConsentData.body.encryptedFiuId;
            user.consentHandleId = finvuConsentData.body.ConsentHandle;
            if(await user.save()){
                outputText = await loadFinvuPopup(user);
            }
        }
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

async function checkConsentStatus(req, res){
    const user = await User.findOne({
        where: { mobile: req.mobile },
      });
    if (user) {
        let consentData = await consentStatus(user);
        if(consentData && consentData.body && consentData.body.consentStatus === "ACCEPTED"){
            user.consentId = consentData.body.consentId;
            if(await user.save()){
                return res.send({data:{status:"success"},success:true});
            }
        }else{
            return res.send({data:{status:"pending"},success:true});
        }
    }else{
        return res.status(404).send({message:"User not found.", success:false});
    }
}


async function triggerDataRequest(req, res){
    const user = await User.findOne({
        where: { mobile: req.mobile },
      });
    if (user) {
        let consentData = await FIRequest(user);
        if(consentData && consentData.body && consentData.body.sessionId){
            user.sessionId = consentData.body.sessionId;
            if(await user.save()){
                return res.send({data:{status:"success"},success:true});
            }
        }else{
            return res.send({data:{status:"pending"},success:true});
        }
    }else{
        return res.status(404).send({message:"User not found.", success:false});
    }
}

async function checkDataRequestStatus(req, res){
    const user = await User.findOne({
        where: { mobile: req.mobile },
      });
    if (user) {
        let consentData = await checkFIStatus(user);
        if(consentData && consentData.body && consentData.body.fiRequestStatus === "READY"){
            return res.send({data:{status:"success"},message:"Data is ready now.",success:true});
        }else{
            return res.send({data:{status:"pending"},success:true});
        }
    }else{
        return res.status(404).send({message:"User not found.", success:false});
    }
}

async function fetchData(req, res){
    const user = await User.findOne({
        where: { mobile: req.mobile },
      });
    if (user) {
        let consentData = await fetchFI(user);
        if(consentData && consentData.body){
            user.data = JSON.stringify(consentData.body);
            if(await user.save()){
                return res.send({data:{status:"success"},success:true});
            }
        }else{
            return res.send({data:{status:"pending"},success:true});
        }
    }else{
        return res.status(404).send({message:"User not found.", success:false});
    }
}

module.exports = {
    createConsentRequest,
    checkConsentStatus,
    triggerDataRequest,
    checkDataRequestStatus,
    fetchData
}