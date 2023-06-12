const response = (Status, data, msg, res) => {
    res.json(Status, [
        {
            PayLoad: {
                Status: Status,
                data: data,
                msg: msg
            },
            Pagination: {
                next: "",
                prev: "",
                current: ""
            }
        }
    ])
}

module.exports = response