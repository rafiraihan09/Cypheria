const knex = require('../config/database');
const TAG = 'USER_REPOSITORY';

module.exports = {
    getUserTopicsByUserID: async (userID) => {
        try {
            let userTopicsRaw = await knex.select('topics', 'user_id').from('users').where({
                user_id: userID
            }).first();

            let userTopics = userTopicsRaw.topics.split(';');

            return userTopics;
        } catch (err) {
            console.log(`${TAG} getUserTopicsByUserID ${err.message}`)
            throw err;
        }
    },
    getUserByID: async (userID) => {
        return await knex.select('*').from('users').where({
            user_id: userID
        }).first();
    }
}