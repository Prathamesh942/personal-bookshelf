import React from "react";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

const Bookshelf = ({ bookshelf, removeFromShelf }) => {
  console.log(bookshelf);
  return (
    <div>
      <Link to={"/"}>
        <span className="logo">
          <img className=" logo-img" src="./logo.png" alt="" />
          EpicReads
        </span>
      </Link>
      <h2 className="bookshelf-head">My Bookshelf</h2>
      {bookshelf.length == 0 && (
        <div className="illustration">
          <img src="https://i.pinimg.com/564x/c5/bf/56/c5bf564bdadb9a0d72b5957aabbadcc5.jpg"></img>
        </div>
      )}
      <div className="bookshelf">
        {bookshelf.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            bookshelf={bookshelf}
            removeFromShelf={removeFromShelf}
          />
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
