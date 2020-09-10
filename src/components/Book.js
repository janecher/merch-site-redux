import React from "react";
import PropTypes from "prop-types";

function Book(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenBookClicked(props.id)}>
        { /* We add a div with an onClick function. Don't forget to close out the div below! */}
        <h3>{props.title} - {props.author}</h3>
        <p><em>{props.quantity}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  quantity: PropTypes.string,
  id: PropTypes.string, // new PropType
  whenBookClicked: PropTypes.func // new PropType
};

export default Book;