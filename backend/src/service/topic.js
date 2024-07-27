const userRepository = require('../repository/user')
const TAG = 'TOPIC_SERVICE';

module.exports = {
    getMatchedTopics: async(driverID, passengerID) => {
        try {
            let driverTopics = await userRepository.getUserTopicsByUserID(driverID)
            let passengerTopics = await userRepository.getUserTopicsByUserID(passengerID)

            let result = {
                driverTopics,
                passengerTopics
            }

            return result
        } catch (err) {
            console.log(`${TAG} getMatchedTopics [${err.message}]`)
            throw new Error(err)
        }
    }
}