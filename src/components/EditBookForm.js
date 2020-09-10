import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from 'prop-types';

function EditBookForm (props) {
  const { book } = props;

  function handleEditBookFormSubmission(event) {
    event.preventDefault();
    props.onEditBook({title: event.target.title.value, author: event.target.author.value, quantity: event.target.quantity.value, id: book.id});
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditBookFormSubmission}
        buttonText="Update Book" />
    </React.Fragment>
  );
}

EditBookForm.propTypes = {
  onEditBook: PropTypes.func
};

export default EditBookForm;