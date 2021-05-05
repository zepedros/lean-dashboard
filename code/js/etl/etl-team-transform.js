module.exports = {
    getAzureTeams : function (refObject) {
        let jsonData = {
            teams: []
        };
        jsonData.total = refObject.count
        jsonData.teams = refObject.value.map(item => {
            return this.getAzureTeamObject(item)
        })
        return jsonData
    },

    getAzureTeamObject : function (refObject) {
        return {
            "id": refObject.id,
            "name": refObject.name,
            "description" : refObject.description,
            "members": refObject.identity.members,
            "source": "Azure"
        }
    }
}