const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type : String
    }
},
    {
        timestamps: true,
    },
)

const Contact = mongoose.model('users', contactSchema)
module.exports = Contact
