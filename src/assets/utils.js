import { addToBasket, removeFromBasket } from '../slices/basketSlice';

export const useAddItemToBasket = (dispatch, product) => {
  dispatch(addToBasket(product));
}

export const useRemoveItemFromBasket = (dispatch, { id }) => {
  dispatch(removeFromBasket({ id }))
}