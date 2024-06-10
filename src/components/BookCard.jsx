import React from "react";
import "../App.css";

const BookCard = ({ book, addToBookshelf, bookshelf, removeFromShelf }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150";
  let inShelf = false;
  for (const myBook of bookshelf) {
    console.log(book.key, myBook.key);
    if (book.key == myBook.key) {
      inShelf = true;
    }
  }
  return (
    <div className="book-card">
      <img className="cover" src={coverUrl} alt={`${book.title} cover`} />
      <div className="book-info">
        <div className="book-heading">
          <h3 className="title">{book.title}</h3>
          <span className=" rating">
            <img src="./star.png" alt="" className="star" />
            {book.ratings_average?.toFixed(1)}
          </span>
        </div>
        <p> {book.author_name?.join(", ")}</p>
        {inShelf ? (
          <button
            className=" addtoshelf red-bg"
            onClick={() => removeFromShelf(book.key)}
          >
            Remove from my shelf
          </button>
        ) : (
          <button className=" addtoshelf" onClick={() => addToBookshelf(book)}>
            Want to read
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
