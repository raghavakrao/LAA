
async function auth(req, res, next){
    //Validate user token
    return next();
}

module.exports = {
    auth
}