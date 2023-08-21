const express = require('express');
const router = express.Router();
const user_detail_controller = require('../controller/user.controller');
const user_detail_Controller = new user_detail_controller();

router.post('/',(req, res) => user_detail_Controller.user_Register(req, res));

router.post("/login", (req, res) => user_detail_Controller.user_login(req, res));

module.exports = router;