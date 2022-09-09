import { addToBasket, removeFromBasket, setDataToBasket } from '../slices/basketSlice';

export const useAddItemToBasket = (dispatch, product) => {
  dispatch(addToBasket(product));
}

export const useRemoveItemFromBasket = (dispatch, { id }) => {
  dispatch(removeFromBasket({ id }));
}

export const useSetDataToBasket = (dispatch, items) => {
  dispatch(setDataToBasket(items));
}
