import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

function BookList(props){

  return (
    <React.Fragment>
      <hr/>
      {Object.values(props.bookList).map((book) => {
        return <Book
          whenBookClicked = { props.onBookSelection }
          title={book.title}
          author={book.author}
          quantity={parseInt(book.quantity)}
          id={book.id}
          key={book.id}/>
      })}
    </React.Fragment>
  );
}

BookList.propTypes = {
  bookList: PropTypes.object,
  onBookSelection: PropTypes.func
};

export default BookList;