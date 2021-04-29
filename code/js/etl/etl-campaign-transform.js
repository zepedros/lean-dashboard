module.exports = {
    getSquashCampaignObject: function (expandedCampaign){
        return {
            "id": expandedCampaign.id,
            "name": expandedCampaign.name,
            "reference": expandedCampaign.reference,
            "description": expandedCampaign.description,
            "status": expandedCampaign.status,
            "creation_date": expandedCampaign.created_on,
            "start_date": expandedCampaign.actual_start_date,
            "end_date": expandedCampaign.actual_end_date,
            "test_plan": expandedCampaign.test_plan
        }
    }
}