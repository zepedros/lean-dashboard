module.exports = {
    getSquashTestObject : function (expandedTest) {
        return {
            "id": expandedTest.id,
            "name": expandedTest.name,
            "reference": expandedTest.reference,
            "status": expandedTest.status,
            "importance": expandedTest.importance,
            "creation_date": expandedTest.created_on,
            "project-id": expandedTest.project.id,
            "project-name": expandedTest.project.name
        }
    }
}