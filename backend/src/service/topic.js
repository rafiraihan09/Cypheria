const userRepository = require('../repository/user')
const TAG = 'TOPIC_SERVICE';

module.exports = {
    getMatchedTopics: async(driverID, passengerID) => {
        try {
            let driverTopics = await userRepository.getUserTopicsByUserID(driverID)
            let passengerTopics = await userRepository.getUserTopicsByUserID(passengerID)

            let anyMatched = false
            let result = []

            for(const topic of driverTopics) {
                let match = passengerTopics.includes(topic)

                if (match) {
                    anyMatched = match
                }

                result.push({
                    topic,
                    match
                })
            }

            return {
                anyMatched,
                topics: result
            }
        } catch (err) {
            console.log(`${TAG} getMatchedTopics [${err.message}]`)
            throw err;
        }
    }
}