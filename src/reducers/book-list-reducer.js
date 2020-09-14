export default (state = {}, action) => {
  const { title, author, quantity, id } = action;
  switch (action.type) {
    case 'ADD_BOOK':
      return Object.assign({}, state, {
        [id]: {
          title: title,
          author: author,
          quantity: parseInt(quantity),
          id: id 
        }
      });
    case 'DELETE_BOOK':
      const newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};