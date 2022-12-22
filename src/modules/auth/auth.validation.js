import Joi from "joi";

export const signUpValidation={body:Joi.object().required().keys({
     
        userName:Joi.string().required().min(2).max(20),
        email:Joi.string().email(),
        password:Joi.string().pattern(new RegExp(/^[A-Z][a-z0-9]{3,8}$/)),
        cPassword:Joi.string().valid(Joi.ref("password")).required(),})

    }

    export const updateRole={body:Joi.object().required().keys({
     
        userId:Joi.string().required().min(24).max(24),})

    }
