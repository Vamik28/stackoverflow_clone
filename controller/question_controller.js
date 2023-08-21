const BaseController = require("./BaseController");
const NotFound = require('../errors/NotFound');
// const user_detail_schema = require('../model/user_detail_schema');
const Forbidden = require("../errors/Forbidden");
const jwt = require('jsonwebtoken');
const questions_schema = require("../model/Question_Schema");
const mongoose = require('mongoose');

module.exports = class questioncontroller extends BaseController {
    async question_creation(req, res) {
      try {
        
        const tokenData = req.userdata;
        
        const question_detail = {
            question: req.body.question,
            user_id: mongoose.Types.ObjectId(tokenData.id),
            upvotes: 0,
            downvotes: 0
        };
        const insertquestion_detail = new questions_schema(question_detail);
        const question_data = await insertquestion_detail.save();
        return this.sendJSONResponse(
          res,
          "Question Posted",
          {
            length: 1,
          },
          question_data
        );
      } catch (error) {
        if (error instanceof NotFound) {
          throw error;
        }
        return this.sendErrorResponse(req, res, error);
      }
    }

    

}