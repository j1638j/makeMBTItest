const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Criteria = require('./criteria')
// const Question = require('./question')
// const Result = require('./result')



// const TestSchema = new Schema({
//     title: String,
//     questions: [Question], //질문 모음
//     criteria: [Criteria], //채점 기준 모음: 예) 에너지 방향, 인식 기능, 판단 기능, 생활 양식
//     results: [Result] //결과 경우의 수 모음
// })


const TestSchema = new Schema({
    title: {
        type: String,
        required: true
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

