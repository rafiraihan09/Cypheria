const { responseBuilder } = require('../helper/response')
const topicService = require('../service/topic')

module.exports = {
    getMatchedTopics: async (req, res) => {
        try {
            let driverID = req.params.driver_id
            let passengerID = req.params.passenger_id

            let data = await topicService.getMatchedTopics(driverID, passengerID)

            let response = responseBuilder('success', data)

            return res.status(200).json(response)
        } catch (err) {
            console.log(err);
            let response = responseBuilder('error', {}, err);
            return res.status(500).json(response);
        }

    }
}