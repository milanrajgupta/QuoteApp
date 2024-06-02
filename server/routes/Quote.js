const express=require('express')
const router=express.Router()
const {auth}=require("../middlewares/auth")

const {getAllQuotes,createQuote,deleteQuote,getAllUserQuote}=require("../controllers/Quote")


router.get("/getAll",getAllQuotes);
router.post("/create-quote",createQuote);
router.delete("/delete-quote",deleteQuote)
router.post("/all-user-quote",getAllUserQuote)


module.exports=router