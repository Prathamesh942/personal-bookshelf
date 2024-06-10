import { useEffect, useState } from "react";
import BookSearch from "./components/BookSearch";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bookshelf from "./components/BookShelf";
import "./App.css";

function App() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const newBookshelf = [...bookshelf, book];
    setBookshelf(newBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(newBookshelf));
    alert("Book added to shelf");
  };

  const removeFromShelf = (key) => {
    const newBookshelf = bookshelf.filter((book) => {
      return book.key != key;
    });
    setBookshelf(newBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(newBookshelf));
    console.log(newBookshelf);
    alert("Book removed from shelf");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <BookSearch
          addToBookshelf={addToBookshelf}
          removeFromShelf={removeFromShelf}
          bookshelf={bookshelf}
        />
      ),
    },
    {
      path: "/bookshelf",
      element: (
        <Bookshelf bookshelf={bookshelf} removeFromShelf={removeFromShelf} />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
