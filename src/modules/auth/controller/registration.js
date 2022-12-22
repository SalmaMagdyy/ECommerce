import userModel from "../../../../DB/model/User.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/email.js"
import { asyncHandler } from "../../../services/asyncHandler.js";
import { findById, findByIdAndUpdate, findOne, findOneAndUpdate } from "../../../../DB/DBMethods.js";


export const signup = asyncHandler(async (req, res, next) => {
    const { userName, email, password } = req.body;
    // const user = await userModel.findOne({ email }).select("email")
    const user = await findOne({model:userModel, condition:{ email },select: "email"})

    if (user) {
        //res.status(409).json({ message: "this email is already register" })
        next(new Error("this email is already register", { cause: 409 }))
    } else {
        let hashedPassword = bcryptjs.hashSync(password, parseInt(process.env.SALTROUND))
        let addUser = new userModel({ userName, email, password: hashedPassword })
        let token = jwt.sign({ id: addUser._id, isLoggedIn: true }, process.env.emailToken, { expiresIn: '1hr' })
        let refreshToken = jwt.sign({ id: addUser._id, isLoggedIn: true }, process.env.emailToken, { expiresIn: 60 * 60 * 24 })

        let link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        let refreshLink = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refreshToken/${refreshToken}`
        let message = `please verify your email <a href="${link}"> here </a>
        <br/> 
        To refresh token <a href="${refreshLink}"> here </a>`;
        let result = await sendEmail(email, "confirm to register", message)
        if (result.accepted.length) {
            let savedUser = await addUser.save()
            res.status(201).json({ message: "added successfully", savedUser })

        } else {
            // res.status(404).json("invalid email")
            next(new Error("invalid email", { cause: 404 }))

        }
    }

})

export const confirmEmail = asyncHandler(async (req, res, next) => {

    let { token } = req.params;
    let decoded = jwt.verify(token, process.env.emailToken)
    if (!decoded && !decoded.id) {
        //res.status(400).json({ message: "invalid token data" })
        next(new Error("invalid token data", { cause: 400 }))

    } else {
        //let updatedUser = await userModel.findOneAndUpdate({ _id: decoded.id, confirmEmail: false }, { confirmEmail: true }, { new: true })
        let updatedUser = await findOneAndUpdate({model:userModel,condition:{ _id: decoded.id, confirmEmail: false },data: { confirmEmail: true },options: { new: true }})

        if (updatedUser) {
            res.status(200).json({ message: "confirmed" })
            // res.redirect("")
        } else {
            //res.status(400).json({ message: "invalid token data" })
            next(new Error("invalid token data", { cause: 400 }))

        }

    }
})

export const refreshToken = asyncHandler(async (req, res, next) => {
    let { token } = req.params;
    let decoded = jwt.verify(token, process.env.emailToken)
    if (!decoded && !decoded.id) {
        //res.status(400).json({ message: "invalid token data" })
        next(new Error("invalid token data", { cause: 400 }))
    } else {
        let updatedUser = await findOneAndUpdate({model:userModel,condition:{ _id: decoded.id, confirmEmail: false }, data:{ confirmEmail: true }, options:{ new: true }})
        if (updatedUser) {
            res.status(200).json({ message: "confirmed" })


            //res.redirect("")
        } else {
            //res.status(400).json({ message: "invalid token data" })
            next(new Error("invalid token data", { cause: 400 }))
        }
    }
})

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    // const user = await userModel.findOne({ email })
    const user = await findOne({model:userModel,condition: { email }})
    if (!user) {
        //res.status(404).json({ message: "you have to register first" })
        next(new Error("you have to register first", { cause: 404 }))
    } else {
        let matched = bcryptjs.compareSync(password, user.password, parseInt(process.env.SALTROUND))
        if (matched) {
            if (!user.confirmEmail) {
                //res.status(400).json({ message: "you have to confirm first" })
                next(new Error("you have to confirm first", { cause: 400 }))
            } else {
                let token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.Token, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({ message: "welcome", token })
            }

        } else {
            //res.status(400).json({ message: "invalid password" })
            next(new Error("invalid password", { cause: 400 }))
        }
    }
})

export const updateRole = asyncHandler(async (req, res, next) => {
    let { userId } = req.body;
    let user = await findById({model:userModel,id: userId})
    if (!user) {
        next(new Error("invalid user id", { cause: 404 }))
    } else {
        if (!user.confirmEmail) {
            next(new Error("please confirm email first", { cause: 400 }))
        } else {
            let updatedUser = await findByIdAndUpdate({model:userModel,condition: { _id: user._id },data: { role: 'Admin' }, options:{ new: true }})
            res.status(200).json({ message: "updated", updatedUser })
        }
    }
})

