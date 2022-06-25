const jwt = require("jsonwebtoken")
const model = require("../model/model")


//****  Creating User */


const register = async (req, res) => {

    try {

        let data = req.body
        const { name, phone, email, password } = data
        if (!name) {
            return res.status(400).send({ status: false, message: "name is required" })
        }
        if (!phone) {
            return res.status(400).send({ status: false, message: "phone is required" })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "email is required" })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }

        const userData = {
            name: name, phone: phone, email: email, password: password
        }


        const createdUser = await model.create(userData)

        res.status(201).send({ status: true, data: createdUser })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//******* LOgin User */

const loginUser = async function (req, res) {

    try {

        const { name, password } = req.body
        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, message: "Please enter some data" })
        }

        if (!name) {
            return res.status(400).send({ status: false, message: "username is required" })
        }


        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }

        const user = await model.findOne({ name: name, password: password })
        if (!user) {
            return res.status(401).send({ status: false, message: "incorrect credentials" })
        }


        /******************************create token***********************************/

        const token = jwt.sign({

            userId: user._id,

        }, "project", { expiresIn: "1h" });

        return res.status(200).send({ status: true, message: "User login successfully", data: { userId: user._id, token } })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }
}




//*********  Get User Data With The help of Params */
const getUser = async function (req, res) {
    try {
        let id = req.params.id
        const userFound = await model.findOne({ _id: id })
        if (!userFound) {
            return res.status(401).send({ status: false, message: "incorrect credentials" })
        }
        return res.status(200).send({ status: true, data: userFound })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }
}

module.exports = { loginUser, register, getUser }