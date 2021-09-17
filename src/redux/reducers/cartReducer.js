import { CartActionTypes } from "../constants/cartaction-types";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      //Get Item data from cart

      const inCart = state.cart.find((item) =>
        item.id === action.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.id ? { ...item, qty: item.qty + 1 } : item
            )
          : [
              ...state.cart,
              {
                id: action.id,
                name: action.name,
                image: action.image,
                price: action.price,
                qty: 1,
              },
            ],
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    case CartActionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id ? { ...item, qty: action.qty } : item
        ),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
