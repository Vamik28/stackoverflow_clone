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
    async question_updation(req, res) {
        try {
          
          const tokenData = req.userdata;
          const qid = req.query.qid;
        //   console.log(qid);
          const question_detail = {
              question: req.body.question,
              upvotes: 0,
              downvotes: 0
          };
          const questionk_datas  = await questions_schema.findOne({_id:qid}); 
          var questionn_datas;
          if(questionk_datas.user_id == tokenData.id){
          const questionn_data  = await questions_schema.updateOne({_id:qid},question_detail);
        //   console.log(questionn_data); 
           questionn_datas  = await questions_schema.findOne({_id:qid});
        }
        else{
             questionn_datas = "you are not allowed to";
        }
           
          return this.sendJSONResponse(
            res,
            "Question Updated",
            {
              length: 1,
            },
            questionn_datas
          );
        } catch (error) {
          if (error instanceof NotFound) {
            throw error;
          }
          return this.sendErrorResponse(req, res, error);
        }
      }
      async question_Deletion(req, res) {
        try {
          
          const tokenData = req.userdata;
          const qid = req.query.qid;
        //   console.log(qid);
        const questionk_datas  = await questions_schema.findOneAndDelete({_id:qid}); 
          return this.sendJSONResponse(
            res,
            "Question Deleted",
            {
              length: 1,
            },
            
          );
        } catch (error) {
          if (error instanceof NotFound) {
            throw error;
          }
          return this.sendErrorResponse(req, res, error);
        }
      }
    

}