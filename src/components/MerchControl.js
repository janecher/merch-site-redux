import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from './EditBookForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class MerchControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedBook: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedBook != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedBook: null, 
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewBookToList = (newBook) => {
    const { dispatch } = this.props;
    const { title, author, quantity, id } = newBook;
    const action = {
      type: 'ADD_BOOK',
      title: title,
      author: author,
      quantity: quantity,
      id: id 
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false });
  }

  handleChangingSelectedBook = (id) => {
    const selectedBookInList = this.props.bookList[id];
    this.setState({selectedBook: selectedBookInList});
  }

  handleDeletingBook = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_BOOK',
      id: id
    }
    dispatch(action);
    this.setState({
      selectedBook: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingBookInList = (bookToEdit) => {
    const { dispatch } = this.props;
    const { title, author, quantity, id } = bookToEdit;
    const action = {
      type: 'ADD_BOOK',
      title: title,
      author: author,
      quantity: quantity,
      id: id 
    }
    dispatch(action);
    this.setState({
        editing: false,
        selectedBook: null
      });
  }

  handleBookBuyClick = (idToBuy) => {
    const boughtBook = this.props.bookList[idToBuy]; 
    console.log(boughtBook);
    const { dispatch } = this.props;
    const { title, author, quantity, id } = boughtBook;
    if(boughtBook.quantity > 0) {
      boughtBook.quantity = boughtBook.quantity - 1;
      const action = {
        type: 'ADD_BOOK',
        title: title,
        author: author,
        quantity: quantity,
        id: id 
      }
      dispatch(action);
    }
    console.log(boughtBook);
    this.setState({
        editing: false
      });
  }

  handleBookRestockClick = (idToRestock) => {
    const boughtBook = this.props.bookList[idToRestock]; 
    const { dispatch } = this.props;
    const { title, author, quantity, id } = boughtBook;
    boughtBook.quantity++;
    const action = {
      type: 'ADD_BOOK',
      title: title,
      author: author,
      quantity: quantity,
      id: id 
    }
    dispatch(action);
    this.setState({
        editing: false
      });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 

    if (this.state.editing ) {      
      currentlyVisibleState = <EditBookForm book = {this.state.selectedBook} onEditBook = {this.handleEditingBookInList}/>
      buttonText = "Return to Book List";
    } else if (this.state.selectedBook != null) {
      currentlyVisibleState = <BookDetail book = {this.state.selectedBook} onClickingDelete = {this.handleDeletingBook} onClickingEdit = {this.handleEditClick} onClickingBuy = {this.handleBookBuyClick} onClickingRestock = {this.handleBookRestockClick}/>
      buttonText = "Return to Book List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if (this.state.formVisibleOnPage) {
      // This conditional needs to be updated to "else if."
      currentlyVisibleState = <NewBookForm onNewBookCreation={this.handleAddingNewBookToList}  />;
      buttonText = "Return to Book List";
    } else {
      currentlyVisibleState = <BookList bookList={this.props.bookList} onBookSelection={this.handleChangingSelectedBook} />;
      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
      buttonText = "Add Book";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }

}

MerchControl.propTypes = {
  bookList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    bookList: state
  }
}

MerchControl = connect(mapStateToProps)(MerchControl);

export default MerchControl;