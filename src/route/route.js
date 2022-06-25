const express = require("express")
const router = express.Router()

const userController = require("../controller/userController")


const middleware = require("../middleware/auth")



// user Apis
router.post("/register", userController.register)

router.post("/login", userController.loginUser)

router.get("/getuser/:id", middleware.authentication, userController.getUser)


module.exports = router