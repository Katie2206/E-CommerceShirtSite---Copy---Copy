const mongoose = require(`mongoose`)

let usersModel = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        accessLevel: {type: Number, default:parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)},
        profilePictureFile: {type: String, default:""}

    },
    {
        collection: `users`
    })

module.exports = mongoose.model(`users`, usersModel)