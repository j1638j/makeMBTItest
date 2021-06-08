const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Test = require('./test')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    tests: [
        {
            type: Schema.Types.ObjectId,
            ref: "Test"
        }
    ]

})