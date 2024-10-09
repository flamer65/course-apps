const jwt = require('jsonwebtoken');
const { JWT_USER_SECRET } =  require('../config')
function usermiddle(req, res, next){
    const token = req.headers.token;
    const verify = jwt.verify(token, JWT_USER_SECRET);
    if(verify){
        next();
    }else{
        res.status(403).json({
            message: 'bad auth'
        })
    }
}

module.exports = {
    usermiddle
}