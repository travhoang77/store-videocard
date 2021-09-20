import { CartActionTypes } from "../constants/cartaction-types";

export const addToCart = (itemId, name, image, price, qty) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    id: itemId,
    name: name,
    image: image,
    price: price,
    qty: qty,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: CartActionTypes.REMOVE_FROM_CART,
    id: itemId,
  };
};

export const adjustQty = (itemId, qty) => {
  return {
    type: CartActionTypes.ADJUST_QTY,
    id: itemId,
    qty: qty,
  };
};

export const resetCart = () => {
  return {
    type: CartActionTypes.CLEAR_CART,
  };
};
