import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);

  const { user, token } = useSelector((store) => store.auth);

  const [newQuote, setNewQuote] = useState({
    q: "",
  });

  useEffect(() => {
    getAllUserQuotes();
  }, []);

  const getAllUserQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://techplement-2.onrender.com/quote/all-user-quote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user._id, token: token }),
        }
      );
      const data = await response.json();
      console.log(data.data);
      setQuotes(data.data);

      setLoading(false);
      console.log(quotes);
    } catch (error) {
      console.error("Error fetching user quotes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuote((prevQuote) => ({
      ...prevQuote,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("https://techplement-2.onrender.com/quote/create-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          q: newQuote.q,

          userId: user._id,
          name: user.firstName + user.lastName,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (!data.success) {
        toast.error(`${data.message}`, {
          position: "top-center",
        });

        return;
      }

      getAllUserQuotes();
      setLoading(false);
      toast.success("Quote Created", {
        position: "top-center",
      });

      setNewQuote({
        q: "",
      });
    } catch (error) {
      console.error("Error creating quote:", error);
    }
  };

  const handleDelete = async (quoteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quote?"
    );
    if (confirmDelete) {
      try {
        await fetch("https://techplement-2.onrender.com/quote/delete-quote", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quoteId: quoteId, userId: user._id }),
        });
        getAllUserQuotes();
        toast.success("Quote Deleted", {
          position: "top-center",
        });
      } catch (err) {}
    }
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className=" min-h-screen  flex items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[1000px] bg-[#13515c] justify-center mx-auto  text-white mt-[100px] gap-4 p-4">
        <div className="bg-[#1d7a8a] p-4  rounded-lg">
          <h2 className="text-lg font-bold mb-4">My Quotes</h2>
          <ul>
            {
              <div className="space-y-6 overflow-y-auto max-h-[500px] scrollbar-container mt-3">
                {quotes
                  .slice()
                  .reverse()
                  .map((quote, index) => (
                    <div
                      key={index}
                      className="relative max-w-full bg-[#0a4853] p-6 rounded-lg shadow-lg text-center mb-4"
                    >
                      <button
                        onClick={() => handleDelete(quote._id)}
                        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 p-1 rounded-full"
                      >
                        <MdDelete />
                      </button>
                      <p className="text-lg italic mb-4">"{quote.q}"</p>
                      <p className="text-right text-sm">— {quote.a}</p>
                    </div>
                  ))}
              </div>
            }
          </ul>
        </div>
        <div className="bg-[#1d7a8a] p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Create New Quote</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <input
              type="text"
              name="q"
              placeholder="Quote"
              value={newQuote.q}
              onChange={handleChange}
              required
              className="border bg-[#1d7a8a] rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {/* <input
          type="text"
          name="a"
          placeholder="Author"
          value={newQuote.a}
          onChange={handleChange}
          required
          className="border bg-[#1d7a8a]  rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        /> */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
