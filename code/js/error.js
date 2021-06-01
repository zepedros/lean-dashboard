module.exports = {
    ARGUMENT_ERROR : 400,
    UNAUTHORIZED : 401,
    FORBIDDEN : 403,
    NOT_FOUND : 404,
    CONFLICT: 409,
    DATABASE_ERROR : 502,

    makeErrorResponse : function (code, message) {
        return {
        statusCode: code,
        message:message
        }
    }
};
