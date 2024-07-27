module.exports = {
    responseBuilder: function(message, data, error = {}) {
        if(message == 'success') {
            return {
                message,
                data
            }
        } else {
            return {
                message,
                error
            }
        }
    }
}