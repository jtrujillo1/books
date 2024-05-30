import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

export default function AreaCard(props: any) {
  const { book } = props;
  const [addBook, setAddBook] = useState(book);

  const addBooks = () => {
    setAddBook(book);
    localStorage.setItem(book.title, JSON.stringify({ ...addBook }));
  };

  const deleteBooks = () => {
    setAddBook(book);
    localStorage.removeItem(book.title);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="flex justify-between flex-col">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={book.cover}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.synopsis}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="">
        {book.list ? (
          <Tooltip title="Eliminar de mi lista">
            <Fab
              size="small"
              color="error"
              aria-label="add"
              onClick={deleteBooks}
            >
              <DeleteIcon />
            </Fab>
          </Tooltip>
        ) : (
          <Tooltip title="Agregar a mi lista">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={addBooks}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
