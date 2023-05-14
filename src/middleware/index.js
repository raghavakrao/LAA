const jwt = require('jsonwebtoken');
const config = require('../config/index');
async function auth(req, res, next){
    let jwtData = extractJWTToken(req);
    if(!jwtData){
        return res.status(401).send({message:"Invalide user.", success:false});
    }
    req.mobile = jwtData.mobile;
    return next();
}

function extractJWTToken(req) {
    let token;
    if(req.url.split("/")[1] == "create-consent-request"){
        console.log("Hello");
        token = req.url.split("/")[2]
    }else{
        token = /Bearer (.+)/.exec(req.header('authorization'));
        if(!token) {
            return false
        }
        token = token[1];
    }
    
    return jwt.verify(token, config.jwt.secretKey, function(err, decoded) {
        if(err){
            console.error(err);
        }
        return decoded;
    });

}

module.exports = {
    auth
}