module.exports = {
    getAzureProjectObject: function (refObject) {
        return {
            "id": refObject.id,
            "name": refObject.name,
            "description": typeof refObject.description == `undefined` ? `` : refObject.description,
            "state": refObject.state,
            "visibility": refObject.visibility,
            "source": "Azure"
        }
    },

    getAzureTeamObject: function (refObject) {
        return {
            "id": refObject.id,
            "name": refObject.name,
            "description": refObject.description,
            "members": refObject.identity.members,
            "source": "Azure"
        }
    }
}