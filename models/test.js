const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Criteria = require('criteria')
const Question = require('question')
const Result = requier('result')



const TestSchema = new Schema({
    title: String,
    questions: [Question], //질문 모음
    criteria: [Criteria], //채점 기준 모음: 예) 에너지 방향, 인식 기능, 판단 기능, 생활 양식
    results: [Result] //결과 경우의 수 모음
})




module.exports = mongoose.model('Test', TestSchema);

