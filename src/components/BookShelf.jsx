import React from "react";
import BookCard from "./BookCard";

const Bookshelf = ({ bookshelf }) => {
  return (
    <div>
      <h2>My Bookshelf</h2>
      <div className="bookshelf">
        {bookshelf.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
