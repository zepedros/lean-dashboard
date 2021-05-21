module.exports = {
    OK : 200,
    CREATED : 201,

    URI_MSG: "http://localhost:8000/",

    create : function (code, index,id) {
        return {
            statusCode: code,
            status_message:this.URI_MSG.concat(index).concat(id)
        }
    }
};
