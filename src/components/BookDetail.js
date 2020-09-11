import React from "react";
import PropTypes from "prop-types";

function BookDetail(props){
  const { book, onClickingDelete, onClickingEdit, onClickingBuy, onClickingRestock} = props;

  return (
    <React.Fragment>
      <h1>Book Detail</h1>
      <h3>{book.title} - {book.author}</h3>
      <p><em>{book.quantity}</em></p>
      <button onClick={() => onClickingBuy(book.id)}>Buy This Book</button>
      <button onClick={() => onClickingRestock(book.id)}>Restock</button>
      <button onClick={() => onClickingEdit()}>Update Book</button>
      <button onClick={() => onClickingDelete(book.id) }>Delete Book</button>
      <hr/>
    </React.Fragment>
  );
}

BookDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingBuy: PropTypes.func
};

export default BookDetail;

//why update and delete onclick functions are different
