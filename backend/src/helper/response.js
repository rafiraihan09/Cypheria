module.exports = {
    responseBuilder: function(message, data, error = {}) {
        if(error == {}) {
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