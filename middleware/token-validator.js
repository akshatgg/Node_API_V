const ApiError = require('../errors/ApiError')
const { User} = require('../models');
module.exports = (req, res, next) => {
    try {
        var token = req.header('authorization');
        if (token) {
            var payload = decodeToken(token);
          const user=  User.findOne({
                where: {
                    id: payload.id
                }
            });
            if(!user)
            {
                return next(ApiError.unauthorized("unauthorized"));
            }
            
        }else
        {
            return next(ApiError.unauthorized("unauthorized"));
        }

        next();
    } catch (error) {
        return next(ApiError.internalServerError())
    }
};