import {
  ADD_PRODUCT,
  CHANGE_COUNT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "./types";
import categories from "../categories.json";
import products from "../items.json";

export interface CartProductsType {
  id: number;
  title: string;
  quantity: number;
  category_id: number;
  price: number;
  count: number;
}

export type CategoriesType = typeof categories;

const initialState = {
  categories: [...categories],
  products: [...products],
  cartProducts: [] as CartProductsType[],
};

type appReducerTypes = typeof initialState;

export const appReducer = (
  state = initialState,
  action: any
): appReducerTypes => {
  switch (action.type) {
    case ADD_PRODUCT: {
      let newCartElements = [] as CartProductsType[];
      if (state.cartProducts.find((e) => e.id === action.payload.id)) {
        const newCountProduct = action.payload.count;
        const newCountCartElements = state.cartProducts.map((e) => {
          if (e.id === action.payload.id) {
            const sumCount = newCountProduct + e.count;
            e.count = sumCount <= e.quantity ? sumCount : e.quantity;
          }
          return e;
        });
        newCartElements = [...newCountCartElements];
      } else {
        newCartElements = [...state.cartProducts, action.payload];
      }
      return {
        ...state,
        cartProducts: newCartElements,
      };
    }
    case CHANGE_COUNT_TO_CART: {
      const newCartElements = state.cartProducts.map((e) => {
        if (e.id === action.payload.id) {
          e.count = action.payload.count;
        }
        return e;
      });
      return { ...state, cartProducts: newCartElements };
    }
    case REMOVE_PRODUCT_FROM_CART: {
      return {
        ...state,
        cartProducts: [
          ...state.cartProducts.filter((item) => item.id !== action.payload),
        ],
      };
    }
    default:
      return state;
  }
};
