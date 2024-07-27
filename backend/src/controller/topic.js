const topicService = require('../service/topic')

module.exports = {
    getMatchedTopics: async (req, res) => {
        try {
            let driverID = req.params.driver_id
            let passengerID = req.params.passenger_id

            let data = await topicService.getMatchedTopics(driverID, passengerID)

            return res.json({
                data
            })
        } catch (err) {
            console.log(err);
            throw new Error(err)
        }

    }
}