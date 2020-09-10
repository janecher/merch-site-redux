import React from "react";
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import ReusableForm from "./ReusableForm";

function NewBookForm(props){

  function handleNewBookFormSubmission(event) {
    event.preventDefault();
    props.onNewBookCreation({title: event.target.title.value, author: event.target.author.value, quantity: event.target.quantity.value, id: v4()});
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleNewBookFormSubmission}
        buttonText="Add new book" />
    </React.Fragment>
  );
}

NewBookForm.propTypes = {
  onNewBookCreation: PropTypes.func
};

export default NewBookForm;