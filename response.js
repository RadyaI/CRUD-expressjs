const response = (Status, data, msg, res) => {
    res.json(Status, [
        {
            payload: {
                status: Status,
                Message: msg,
                Response: "Tolong Lah ya",
                data: data,
            },
            Pagination: {
                Next: '',
                Prevent: '',
                CurrentPage: ''
            }
        }
    ])
}

module.exports = response



