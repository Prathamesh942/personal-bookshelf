import axios from "axios";
import React, { useState } from "react";
import BookCard from "./BookCard";

const BookSearch = ({ addToBookshelf }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${e.target.value}&limit=10&page=1`
        );
        setLoading(false);
        setResults(response.data.docs);
        setError("");
      } catch (err) {
        setLoading(false);
        setError("An error occurred while fetching data. Please try again.");
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };
  console.log(results);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for books..."
      />
      {error && <p className="error">{error}</p>}
      {loading && (
        <img src="https://i.pinimg.com/originals/22/ca/c0/22cac0191a9db1b9e55b81fb1afab6b4.gif"></img>
      )}
      {!loading && !error && (
        <div className="results">
          {results.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              addToBookshelf={addToBookshelf}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
