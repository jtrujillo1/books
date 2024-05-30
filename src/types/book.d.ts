export interface Books {
  book: detailsBooks;
}

export interface detailsBooks {
  ISBN: string;
  author: author;
  cover: string;
  genre: string;
  pages: number;
  synopsis: string;
  title: string;
  year: number;
}

export interface author {
  name: string;
  otherBooks: string[];
}
