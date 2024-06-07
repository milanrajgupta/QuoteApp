const mongoose = require('mongoose');


const quoteSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true }
},
{timestamps:true}

);


const Quote=mongoose.model("Quote",quoteSchema);

module.exports=Quote