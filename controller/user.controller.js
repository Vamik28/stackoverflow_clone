const BaseController = require("./BaseController");
const NotFound = require('../errors/NotFound');
// const user_detail_schema = require('../model/user_detail_schema');
const Forbidden = require("../errors/Forbidden");
const jwt = require('jsonwebtoken');
const user_detail_schema = require("../model/user.Schema");

module.exports = class usercontroller extends BaseController {
    async user_Register(req, res) {
      try {
        
        const user_detail = {
          first_name: req.body.first_name,
          contact_no: req.body.contact_no,
          last_name: req.body.last_name,
          email_id: req.body.email_id
      };
            const schemaData = await user_detail_schema.find({
                contact_no: user_detail.contact_no
              });
              if (schemaData.length !== 0) {
                throw new Forbidden("Data is Already Registered");
              } 
  
        const insertuser_detail = new user_detail_schema(user_detail);
        const user_data = await insertuser_detail.save();
        console.log(user_data);

        // var userData = await user_detail_schema.find(user_detail.contact_no);
        const requireData = {
            contact_no:user_data.contact_no,
            id: user_data._id
         }
         console.log(requireData.id);
         
         const token = jwt.sign(requireData,"asd",{ expiresIn:'365d'});
         // console.log(token)
         const result = {
            user_data:user_data,
             token: token
         }
         
        return this.sendJSONResponse(
          res,
          "data added",
          {
            length: 1,
          },
          result
        );
      } catch (error) {
        if (error instanceof NotFound) {
          throw error;
        }
        return this.sendErrorResponse(req, res, error);
      }
    }

    async user_login(req,res){
        try {
            // console.log("123");
            const data = {
                contact_no: req.body.contact_no
                };
                
                // var userData;
                 var userData = await user_detail_schema.find(data);
                //   console.log(userData);
                  if(userData.length === 0){
                    throw new Forbidden("your mobile number is not register")
                    // console.log(user);
                    // userData = [ user ]
                  }
                  

              const requireData = {
               contact_no:userData[0].contact_no,
               id: userData[0]._id
            }
            console.log(requireData._id);
            
            const token = jwt.sign(requireData,"asd",{ expiresIn:'365d'});
            // console.log(token)
            const result = {
                token: token
            }
            console.log(result);
            return this.sendJSONResponse(
                res,
                "successfully login",
                {
                    length:1
                },
                result
            );
        } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      }
      return this.sendErrorResponse(req, res, error);
    }
  }

}