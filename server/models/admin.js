const mongoose = require(`mongoose`)

let adminModel = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        accessLevel: {type: Number, default:parseInt(process.env.ACCESS_LEVEL_ADMIN)}

    },
    {
        collection: `admin`
    })

module.exports = mongoose.model(`admin`, adminModel)