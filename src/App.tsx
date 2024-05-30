import "./App.css";

import imageBooks from "./assets/book.jpg";
import { useState } from "react";
import Books from "./components/books";

function App() {
  //const [count, setCount] = useState(0);

  const [books, setBooks] = useState(null);

  const reqApi = async () => {
    const api = await fetch(
      "https://jelou-prueba-tecnica1-frontend.rsbmk.workers.dev"
    );
    const booksApi = await api.json();
    setBooks(booksApi.default.library);
  };

  return (
    // <Provider store={store}>
    <div className="App w-full">
      <header className="App-header items-center flex-col flex">
        <h1 className="title">Library Books Readme </h1>
        {books ? (
          <Books books={books} />
        ) : (
          <>
            <img src={imageBooks} alt="Books" className="img-home" />
            <button onClick={reqApi} className="btn-search">
              Buscar libros
            </button>
          </>
        )}
      </header>
    </div>
    // </Provider>
  );
}

export default App;
