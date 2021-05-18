module.exports = {
    OK : 200,
    CREATED : 201,

    create : function (code, message) {
        return {
            statusCode: code,
            status_message:message
        }
    }
};
