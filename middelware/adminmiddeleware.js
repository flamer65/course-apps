const jwt = require('jsonwebtoken');
const { JWT_ADMIN_SECRET} =  require('../config.js')
function adminmiddle(req, res, next){
    const token = req.headers.token;
    const verify = jwt.verify(token, JWT_ADMIN_SECRET);
    if(verify){
        req.userId = verify.id;
        next();
    }else{
        res.status(403).json({
            message: 'bad auth'
        })
    }
}

module.exports = {
    adminmiddle
}