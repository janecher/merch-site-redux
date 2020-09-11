import React from 'react';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import EditBookForm from './EditBookForm';

class MerchControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      bookList: [],
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
    const newBookList = this.state.bookList.concat(newBook);
    this.setState({bookList: newBookList,
                  formVisibleOnPage: false });
  }

  handleChangingSelectedBook = (id) => {
    const selectedBookInList = this.state.bookList.filter(book => book.id === id)[0];
    this.setState({selectedBook: selectedBookInList});
  }

  handleDeletingBook = (id) => {
    const newBookList = this.state.bookList.filter(book => book.id !== id);
    this.setState({
      bookList: newBookList,
      selectedBook: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingBookInList = (bookToEdit) => {
    const editedBookList = this.state.bookList
      .filter(book => book.id !== this.state.selectedBook.id)
      .concat(bookToEdit);
    this.setState({
        bookList: editedBookList,
        editing: false,
        selectedBook: null
      });
  }

  handleBookBuyClick = (id) => {
    const boughtBook = this.state.bookList.filter(book => book.id === id)[0]; 
    if(boughtBook.quantity > 0) {
      boughtBook.quantity--;
    }
    const editedBookList = this.state.bookList
      .filter(book => book.id !== id)
      .concat(boughtBook);
    this.setState({
        bookList: editedBookList,
        editing: false,
        selectedBook: null
      });
  }

  handleBookRestockClick = (id) => {
    const boughtBook = this.state.bookList.filter(book => book.id === id)[0];
    boughtBook.quantity++;    
    const editedBookList = this.state.bookList
      .filter(book => book.id !== id)
      .concat(boughtBook);
    this.setState({
        bookList: editedBookList,
        editing: false,
        selectedBook: null
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
      currentlyVisibleState = <BookList bookList={this.state.bookList} onBookSelection={this.handleChangingSelectedBook} />;
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

export default MerchControl;