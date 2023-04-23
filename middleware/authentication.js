require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { CustomAPIError, UnauthenticatedError, NotFoundError, BadRequestError } = require('../errors/index');

const auth = async (req, res, next) => {
    //console.log('valll ', req.headers.authorization)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Athentication Invalid : No token Provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to the job route
        req.user = { userId: payload.userId, name: payload.name };
        //console.log('user ====' + JSON.stringify(User.findById(payload.Id).select('-password')));
        next();
    } catch (error) {
        throw new UnauthenticatedError('Athentication Invalid : Invalid Token');
    }
}
module.exports = auth;