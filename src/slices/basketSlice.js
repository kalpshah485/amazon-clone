import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      localStorage.setItem("basket", JSON.stringify([...state.items, action.payload]));
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let basketClone = [...state.items];
      if (index >= 0) {
        basketClone.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id} as its not in the basket)`
        );
      }
      basketClone.length == 0 ? localStorage.removeItem('basket') : localStorage.setItem('basket', JSON.stringify(basketClone));
      state.items = basketClone;
    },
    setDataToBasket: (state, action) => {
      state.items = action.payload
    }
  },
});

export const { addToBasket, removeFromBasket, setDataToBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
