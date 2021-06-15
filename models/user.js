const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const Test = require('./test')

const UserSchema = new Schema({
    nickname: {
        type: String, 
        required: true, 
    },
    tests: [
        {
            type: Schema.Types.ObjectId,
            ref: "Test"
        }
    ]

})

UserSchema.plugin(passportLocalMongoose);
//username(email) and password is included in the plugin.


module.exports = mongoose.model('User', UserSchema)