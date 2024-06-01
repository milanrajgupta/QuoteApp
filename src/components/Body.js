import React from 'react'

import { useState, useEffect } from 'react';

const Body = () => {


const [quotes, setQuotes] = useState([]);



useEffect(() => {
  const fetchQuotes = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/quotes');

     
      const data = await response.json();
      console.log(data)
      setQuotes(data);
    } catch (error) {
     console.log("Error from fetching quotes",error)
    } 
  };

  fetchQuotes();
}, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Quotes</h1>
      <div className="space-y-6">
        {quotes.map((quote, index) => (
          <div key={index} className="max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg italic mb-4">"{quote.q}"</p>
            <p className="text-right text-sm">— {quote.a}</p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Body