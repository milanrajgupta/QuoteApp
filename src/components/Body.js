import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { IoSearch } from "react-icons/io5";

const Body = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(3);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://localhost:8000/");
        const data = await response.json();
        setQuotes(data);
        setSearchResults(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        console.log("Error from fetching quotes", error);
      }
    };

    fetchQuotes();
  }, []);

  const handleSearch = () => {
    const results = quotes.filter((quote) =>
      quote.a.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1); 
  };

  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = searchResults.slice(indexOfFirstQuote, indexOfLastQuote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(searchResults.length / quotesPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 3;
    let startPage, endPage;

    if (totalPages <= maxPageNumbers) {
      startPage = 1;
      endPage = totalPages;
    } 
    else {
      if (currentPage <= Math.ceil(maxPageNumbers / 2)) {
        startPage = 1;
        endPage = maxPageNumbers;
      } else if (currentPage + Math.floor(maxPageNumbers / 2) >= totalPages) {
        startPage = totalPages - maxPageNumbers + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxPageNumbers / 2);
        endPage = currentPage + Math.floor(maxPageNumbers / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center  min-h-screen  text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Quotes</h1>
      <div className="flex  border-[#157788] gap-2">
        <input
          type="text"
          placeholder="Search by author name"
          value={searchTerm}
          className="bg-[#157788] px-2 rounded-lg h-10"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="text-[#0e191b] text-[30px] " onClick={handleSearch}><IoSearch/></button>
      </div>

      {/* quote block */}
      <div className="space-y-6 mt-3">
        {currentQuotes.map((quote, index) => (
          <div
            key={index}
            className="max-w-xl bg-[#157788] p-6 rounded-lg shadow-lg text-center"
          >
            <p className="text-lg italic mb-4">"{quote.q}"</p>
            <p className="text-right text-sm">— {quote.a}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
       <div>
       <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg bg-[#157788] text-white mr-2"
        >
          Prev
        </button>
       </div>
        <div className="gap-2 flex">
        {generatePageNumbers().map(page => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-[#154851] text-white' : 'bg-[#45a1b1] text-gray-900'}`}
          >
            {page}
          </button>
        ))}
        </div>
        <div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg bg-[#157788] text-white ml-2"
        >
          Next
        </button>
        </div>
       
      </div>
    </div>
  );
};

export default Body;
