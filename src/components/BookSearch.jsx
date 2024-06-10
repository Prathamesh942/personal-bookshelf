import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useDebounce } from "use-debounce";
import "../App.css";
import { Link } from "react-router-dom";

const BookSearch = ({ addToBookshelf, bookshelf, removeFromShelf }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncSearchQuery] = useDebounce(query, 500);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncSearchQuery.trim() === "") {
      setResults([]);
      return;
    }
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${debouncSearchQuery}&limit=10&page=1`
        );
        setLoading(false);
        setResults(response.data.docs);
      } catch (err) {
        setLoading(false);
        setError("An error occurred while fetching data. Please try again.");
        setResults([]);
      }
    };
    fetchBooks();
  }, [debouncSearchQuery]);

  return (
    <div>
      <Link to={"/"}>
        <span className="logo">
          <img className=" logo-img" src="./logo.png" alt="" />
          EpicReads
        </span>
      </Link>

      <Link to={"/bookshelf"}>
        <span className="saved">
          <svg
            className="saved-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="save"
          >
            <path d="M23 5H9C7.346 5 6 6.346 6 8v19a1 1 0 0 0 1.614.789L16 21.267l8.386 6.522a.996.996 0 0 0 1.053.109A1 1 0 0 0 26 27V8c0-1.654-1.346-3-3-3zm1 19.956-7.386-5.745a.999.999 0 0 0-1.228-.001L8 24.956V8c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v16.956z"></path>
          </svg>
          Saved Books
        </span>
      </Link>

      <div className="search-box">
        <input
          className="search"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for books..."
        />
      </div>

      {error && <p className="error">{error}</p>}
      {loading && (
        <div className="illustration">
          <img src="https://i.pinimg.com/originals/22/ca/c0/22cac0191a9db1b9e55b81fb1afab6b4.gif"></img>
        </div>
      )}

      {results.length == 0 && !loading && !error && (
        <div className="illustration">
          <img src="https://i.pinimg.com/564x/04/5a/10/045a10d611806b87a32ffe15e3d256d5.jpg"></img>
        </div>
      )}
      {error && (
        <div className="illustration">
          <img src="https://i.pinimg.com/564x/b0/de/75/b0de755d2943b5f201c3702fd59f20f8.jpg"></img>
        </div>
      )}
      {!loading && !error && (
        <div className="results">
          {results.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              bookshelf={bookshelf}
              addToBookshelf={addToBookshelf}
              removeFromShelf={removeFromShelf}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
