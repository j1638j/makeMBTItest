const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const OptionSchema = new Schema({
    option: { //경우의 수: 예) 함께 잘 놀다 집에 간다. 
        type: String,
        required: true
    }, 
    criterion: { //채점 기준: 점수를 추가할 항목. 예) 에너지 방향
        type: String,
        required: true
    }, 
    score: { //채점 기준에 추가할 점수: 예) 1점
        type: Number, 
        required: true
    } 
})



const QuestionSchema = new Schema({
    question: { //질문: 예) 친구와 약속을 했다. 그런데 친구가 약속 장소에 내가 모르는 다른 친구를 데리고 나왔다.
        type: String,
        required: true
    }, 
    options: [OptionSchema]
})

const ResultSchema = new Schema({ //개별 결과
    resultType: String, //결과: 예) ENTJ
    resultName: { //결과의 별명: 예) 수선화, 우주 부부젤라...
        type: String,
        required: true
    }, 
    description: { //결과의 설명: 예) 당신은 우주 어디에서도 살아남을 수 있는 친화력 만렙.....
        type: String,
        required: true
    },
    perfectMatch: { //최고의 궁합
        resultName: String,
        description: String
    },
    worstMatch: { //최악의 궁합
        resultName: String,
        description: String
    }
})



const CriteriaSchema = new Schema({ //채점 기준
    name: String, //채점 기준의 이름: 예) 에너지 방향
    standardScore: Number, //채점 기준 점수: 예) 3
    belowStandardIs: String, //채점기준 미만인 경우: 예) I
    standardAndAboveIs: String //채점기준 이상인 경우: 예) E
})



const TestSchema = new Schema({
    questions: [QuestionSchema], //질문 모음
    criteria: [CriteriaSchema], //채점 기준 모음: 예) 에너지 방향, 인식 기능, 판단 기능, 생활 양식
    results: [ResultSchema] //결과 경우의 수 모음
})




module.exports = mongoose.model('Test', TestSchema);
