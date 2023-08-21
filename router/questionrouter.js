const express = require('express');
const router = express.Router();
const question_controller = require('../controller/question_controller');
const question_Controller = new question_controller();
const UserAuth = require("../middleware/auth");

router.post('/',UserAuth,(req, res) => question_Controller.question_creation(req,res));
router.put('/',UserAuth,(req, res) => question_Controller.question_updation(req,res));
router.delete('/',UserAuth,(req, res) => question_Controller.question_Deletion(req,res));
router.get('/',UserAuth,(req, res) => question_Controller.list_all_question(req,res));
router.get('/id',UserAuth,(req, res) => question_Controller.list_specific_question(req,res));

// router.post("/login", (req, res) => question_Controller.user_login(req, res));

module.exports = router;