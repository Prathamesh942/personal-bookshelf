import React from "react";

const BookCard = ({ book, addToBookshelf }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150";
  return (
    <div className="book-card">
      <img src={coverUrl} alt={`${book.title} cover`} />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>
          <strong>Author(s):</strong> {book.author_name?.join(", ")}
        </p>
        <p>
          <strong>First Published:</strong> {book.first_publish_year}
        </p>
        <p>
          <strong>Publisher:</strong> {book.publisher?.[0]}
        </p>
        <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
      </div>
    </div>
  );
};

export default BookCard;
