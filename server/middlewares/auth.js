const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    console.log("BEFORE ToKEN EXTRACTION");
    
       const {token} =req.body
     
    // const token =
    //   req.cookies.token ||
    //   req.body.token ||
    //   req.header("Authorization")?.replace("Bearer ", "");
    console.log("AFTER ToKEN EXTRACTION");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "TOken is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);   
      console.log("decoded token ",decode)
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
      error,
    });
  }
};
