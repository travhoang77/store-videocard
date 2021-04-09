export const initialState = {
  basket: [],
  loggedinuser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "SET_LOGIN":
      // console.log("action-->", action.loggedinuser);
      return {
        ...state,
        loggedinuser: action.loggedinuser,
      };
    case "REMOVE_FROM_CART":
      let newcart = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newcart.splice(index, 1);
      } else {
        console.log("There were errors while removing product from cart");
      }
      return { ...state, basket: newcart };
  }
};

export default reducer;
