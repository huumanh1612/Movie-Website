const express =require("express");
const authController = require('../controllers/auth');
const router = express.Router();
const adminController = require('../controllers/createAdmin');


router.post("/register", authController.register)
router.post("/login", authController.login)
// router.post("/homepage", authController.homepage)
// router.post("/admin", authController.admin)
module.exports = router;
