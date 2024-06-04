const Quote = require("../models/Quote");
const User = require("../models/User");

// Fetch all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes", error });
  }
};

// fetch all user quote
exports.getAllUserQuote = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(userId);
    const user = await User.findById(userId).populate("quotes").exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      data: user.quotes,
    });
  } catch (err) {
    res.status(400).json({ message: "Error creating quote", err });
  }
};

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const { q,name, userId } = req.body;

    const newQuote = await Quote.create({
      a: name,
      q: q,
    });
   
    console.log(name)
    const userDetails = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          quotes: newQuote._id,
        },
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "quote created succussfully",
      createdQuote: newQuote,
      user: userDetails,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating quote", error });
  }
};

// Delete a quote
exports.deleteQuote = async (req, res) => {
  try {
    const {quoteId,userId} = req.body;
    const deletedQuote = await Quote.findByIdAndDelete({ _id: quoteId });

    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    await User.findByIdAndUpdate(
      userId,
      { $pull: { quotes: quoteId } },
      { new: true }
    );

    res.json({ message: "Quote deleted", deletedQuote });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quote", error });
  }
};
