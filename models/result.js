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


module.exports = mongoose.model('Result', ResultSchema);
