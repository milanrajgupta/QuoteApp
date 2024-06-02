const jwt =require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
       console.log(req.body.token);
    //    console.log(req.cookies.token)
       const token=req.body.token
    //    const token =
    //    req.cookies.token || // From cookies
    //    req.body.token || // From request body
    //    (req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')); // From headers
 
        console.log("AFTER ToKEN EXTRACTION");

       
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

     
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
          
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',error,
        });
    }
}