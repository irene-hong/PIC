const jwt = require('jsonwebtoken');
const config = require('config');

// auth中间件的作用：获取req.header中的token，转换为用户的id并保存在req.user变量中

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.userid = decoded.user.id; 
        // store user id in req.userid
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid!' });
    }
}