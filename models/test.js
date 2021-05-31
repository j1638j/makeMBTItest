const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: [{
            option: {
                type: String,
                required: true
            },
            criterion: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            }
        }]
    }],
    criteria: [{
        name: {
            type: String,
            required: true
        },
        standardScore: {
            type: Number,
            required: true
        },
        belowStandardIs: {
            type: String,
            required: true
        },
        standardAndAboveIs: {
            type: String,
            required: true
        }
    }],
    results: [{
        resultType: {
            type: [String],
            required: true
        },
        resultName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        perfectMatch: {
            resultName: String,
            description: String
        },
        worstMatch: {
            resultName: String,
            description: String
        }
    }]
})

module.exports = mongoose.model('Test', TestSchema);

