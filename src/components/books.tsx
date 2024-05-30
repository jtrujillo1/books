import { useEffect, useState } from "react";
import { Books as typeBook } from "../types/book";
import AreaCard from "./card";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function Books(props: any) {
  const { books } = props;

  const [storageBooks, setStorageBooks] = useState([]);

  //   se persiste la lista del usuario
  useEffect(() => {
    const list = books.filter((book: any) => {
      if (localStorage.getItem(book.book.title)) {
        book.book["list"] = true;
        return JSON.parse(localStorage.getItem(book.book.title) || "");
      }
    });
    if (list) {
      setStorageBooks(list);
    }
  }, []);

  //   busqueda por titulo
  const [filter, setFilter] = useState("");
  //   Busqueda por genero
  const [gender, setGender] = useState("");

  //   lista filtrada
  const filteredBooks = books.filter((book: any) => {
    let response= false;

    if (filter == "" && gender == "") return book.book;

    if (filter != "" && gender != "") {
      response =
        book.book.title.toLowerCase().includes(filter.toLowerCase()) &&
        book.book.genre.toLowerCase().includes(gender.toLowerCase());
    } else {
      if (filter != "") {
        response = book.book.title.toLowerCase().includes(filter.toLowerCase());
      } else {
        if (gender != "") {
          response = book.book.genre
            .toLowerCase()
            .includes(gender.toLowerCase());
        }
      }
    }

    return response ? book.book : "";
  });

  let genders: string[] = [];

  //   unique genders
  books.map((book: any) => {
    if (genders.length == 0) {
      genders.push(book.book.genre);
      return;
    } else {
      if (!genders.find((gender: string) => gender == book.book.genre)) {
        genders.push(book.book.genre);
        return;
      }
    }
  });

  //   renders
  return (
    <>
      {/* filtereds */}
      <div className="flex justify-between w-full content-center">
        {/* campo de busqueda */}
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="outlined-basic"
          value={filter}
          label="Busqueda"
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
          className="bg-white"
        />
        {/* select para campo genero */}
        <FormControl
          variant="filled"
          className="bg-white"
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel id="demo-simple-select-filled-label">Generos</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {genders.map((gender: any) => (
              <MenuItem value={gender}>
                <em>{gender}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* my list */}
      <div>
        <Divider className="text-2xl text-white">Mi lista</Divider>
        {storageBooks.length ? (
          <div className="flex flex-row mt-6 mb-6 gap-4 container-books flex-wrap flex-auto container">
            {storageBooks.map((book: typeBook, index: number) => (
              <div key={index} className="break-normal  min-w-60  flex ">
                <AreaCard book={book?.book}></AreaCard>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-white font-bold">No tienes libros en tu lista</h1>
        )}

        {/* books */}

        <Divider className="text-2xl text-white">Todos los libros</Divider>

        <div className="container flex flex-row flex-wrap gap-8 flex-auto justify-center box-content container-books mt-6">
          {filteredBooks
            ? filteredBooks.map((book: typeBook, index: number) => (
                <div
                  key={index}
                  className="break-normal  min-w-60 flex-1 flex "
                >
                  <AreaCard book={book.book}></AreaCard>
                </div>
              ))
            : books.map((book: typeBook, index: number) => (
                <div
                  key={index}
                  className="break-normal  min-w-60 flex-1 flex "
                >
                  <AreaCard book={book.book}></AreaCard>
                </div>
              ))}
        </div>
        <span className="back-home"> volver a la home</span>
      </div>
    </>
  );
}
