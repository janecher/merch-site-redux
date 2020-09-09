import React from "react";
import ReusableForm from "./ReusableForm";
import { v4 } from 'uuid';

function EditTicketForm (props) {

  return (
    <React.Fragment>
      <ReusableForm 
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

export default EditTicketForm;