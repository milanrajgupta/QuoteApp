
const Quote = require('../models/Quote');
const User = require('../models/User');

// Fetch all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error });
  }
};

exports.getAllUserQuote=async(req,res)=>{
  try{
    const {userId} = req.body 
    // console.log(userId);
    const user = await User.findById(userId).populate("quotes").exec()
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      data:user.quotes
    })

  }catch(err){
    res.status(400).json({ message: 'Error creating quote', err });
  }
}

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const {a,q,userId}=req.body;

    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: 'Invalid user ID' });
    // }
    const newQuote = await Quote.create({
      a:a,
      q:q,

    })



   const userDetails= await User.findByIdAndUpdate(
    userId,
      {
        $push:{
          quotes:newQuote._id
        }
      },
      {new:true}
    )
    res.status(201).json({
      success:true,
      message:"quote created succussfully",
      createdQuote:newQuote,
      user:userDetails
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating quote', error });
  }
};

// Update an existing quote
exports.updateQuote = async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(updatedQuote);
  } catch (error) {
    res.status(400).json({ message: 'Error updating quote', error });
  }
};

// Delete a quote
exports.deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted', deletedQuote });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quote', error });
  }
};




