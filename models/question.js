const Option = require('option')

const QuestionSchema = new Schema({
    question: { //질문: 예) 친구와 약속을 했다. 그런데 친구가 약속 장소에 내가 모르는 다른 친구를 데리고 나왔다.
        type: String,
        required: true
    },
    options: [Option]
})



const question = mongoose.model('Question', QuestionSchema);
