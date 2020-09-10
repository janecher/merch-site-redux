import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

function BookList(props){

  return (
    <React.Fragment>
      <hr/>
      {props.bookList.map((book) =>
        <Book
          whenBookClicked = { props.onBookSelection }
          title={book.title}
          author={book.author}
          quantity={book.quantity}
          id={book.id}
          key={book.id}/>
      )}
    </React.Fragment>
  );
}

BookList.propTypes = {
  bookList: PropTypes.array,
  onBookSelection: PropTypes.func
};

export default BookList;