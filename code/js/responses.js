module.exports = {
    OK : 200,
    CREATED : 201,

    URI_MSG: "http://localhost:8000/api/lean/projects/",

    makePostResponse : function (code, uri) {
        return {
            statusCode: code,
            message:this.URI_MSG.concat(uri)
        }
    },

    makeResponse: function(code,msg){
        return {
            statusCode:code,
            message: msg
        }
    }
};
