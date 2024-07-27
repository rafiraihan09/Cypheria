const userRepository = require('../repository/user')
const TAG = 'TOPIC_SERVICE';
const fs = require('fs');
const path = require('path');

const readFileAsBase64 = (file) => {
    let bitmap = fs.readFileSync(path.join(__dirname, '../..', file));

    return bitmap.toString('base64');
}

module.exports = {
    getMatchedTopics: async(driverID, passengerID) => {
        let driverTopics
        let passengerTopics
        try {
            driverTopics = await userRepository.getUserTopicsByUserID(driverID)
        } catch (err) {
            console.log(`${TAG} getMatchedTopics:getDriverTopics [${err.message}]`)
            throw err;
        }

        try {
            passengerTopics = await userRepository.getUserTopicsByUserID(passengerID)
        } catch(err) {
            console.log(`${TAG} getMatchedTopics:getPassengerTopics [${err.message}]`)
            throw err;
        }

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
    },
    getDriverProfile: async(driverID) => {
        let driverProfile
        try {
            driverProfile = await userRepository.getUserByID(driverID)
        } catch (err) {
            console.log(`${TAG} getDriverProfile:getUserByID [${err.message}]`)
            throw err;
        }

        let driverImage64 = readFileAsBase64(driverProfile.image)

        return {
            driverName: driverProfile.name,
            driverImage: driverImage64
        }
    }
}