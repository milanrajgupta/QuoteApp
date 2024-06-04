const express=require('express')
const router=express.Router()
const {auth}=require("../middlewares/auth")

const {getAllQuotes,createQuote,deleteQuote,getAllUserQuote}=require("../controllers/Quote")


router.post("/getall",auth ,getAllQuotes);
router.post("/create-quote",auth,createQuote);
router.delete("/delete-quote",auth,deleteQuote)
router.post("/all-user-quote",getAllUserQuote)


module.exports=router