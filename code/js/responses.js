module.exports = {
    OK : 200,
    CREATED : 201,

    URI_MSG: "http://localhost:8000/api/lean/projects/",

    create : function (code, uri) {
        return {
            statusCode: code,
            status_message:this.URI_MSG.concat(uri)
        }
    },

    createPostMsg: function(code,msg){
        return {
            status:code,
            status_message: msg
        }
    }
};
