//JOI validation
const Joi = require('joi')

module.exports.validateTest = (req, res, next) => {

    const testSchema = Joi.object({
        test: Joi.object({
            title: Joi.string().trim().required(),
            description: Joi.string().trim(),
            questions: Joi.array().items({
                question: Joi.string().trim().required(),
                options: Joi.array().items({
                    option: Joi.string().trim().required(),
                    criterion: Joi.string().trim().required(),
                    score: Joi.number().min(0).required()
                })
            }),
            criteria: Joi.array().items({
                name: Joi.string().trim().required(),
                standardScore: Joi.number().min(0).required(),
                belowStandardIs: Joi.string().trim().required(),
                standardAndAboveIs: Joi.string().trim().required()
            }),
            results: Joi.array().items({
                resultType: Joi.array().items(Joi.string().trim().required()),
                resultName: Joi.string().trim().required(),
                description: Joi.string().trim().required(),
                perfectMatch: Joi.object({
                    resultName: Joi.string().trim(),
                    description: Joi.string().trim()
                }),
                worstMatch: {
                    resultName: Joi.string().trim(),
                    description: Joi.string().trim()
                }
            }),
            public: Joi.boolean()
        })
    })

    const { error } = testSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}


module.exports.validateUser = (req, res, next) => {
    const userSchema = Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
        checkPassword: Joi.ref('password'),
        nickname: Joi.string().trim().required()
    })

    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }

}
