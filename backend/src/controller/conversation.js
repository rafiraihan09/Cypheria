module.exports = {
    start: async(req, res) => {
        return res.json({
            message: 'success',
            data: {}
        }, 200);
    }
}