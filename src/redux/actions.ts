import { ADD_PRODUCT, CHANGE_COUNT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "./types";
import { CartProductsType } from "./appReducer";

type AddProductToCartAction = {
  type: typeof ADD_PRODUCT;
  payload: CartProductsType;
};

type ChangeCountProductToCartAction = {
  type: typeof CHANGE_COUNT_TO_CART;
  payload: CartProductsType;
};

type RemoveProductFromCart = {
  type: typeof REMOVE_PRODUCT_FROM_CART
  payload: number
}

export function addProductToCart(payload: CartProductsType): AddProductToCartAction {
  return {
    type: ADD_PRODUCT,
    payload,
  };
}

export function changeCountProductToCart(payload: CartProductsType): ChangeCountProductToCartAction {
  return {
    type: CHANGE_COUNT_TO_CART,
    payload: { ...payload },
  };
}

export function removeProductFromCart(payload: number): RemoveProductFromCart {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload
  }
}
