import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)

      if (index >= 0) {
        state.items[index].quantity++;
      } else {
        state.items = [...state.items, action.payload]
      }

      localStorage.setItem('items', JSON.stringify(state.items))
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)

      let newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Item with id: ${action.payload.id} does not exist, Can't Delete`);
      }

      state.items = newBasket
      localStorage.setItem('items', JSON.stringify(state.items))
    },
    decrementQuantity: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)

      if (index >= 0) {
        state.items[index].quantity--;
      } else {
        console.warn(`Item with id: ${action.payload.id} does not exist, Can't Decrement`);
      }
      localStorage.setItem('items', JSON.stringify(state.items))
    },
    incrementQuantity: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)

      if (index >= 0) {
        state.items[index].quantity++;
      } else {
        console.warn(`Item with id: ${action.payload.id} does not exist, Can't Decrement`);
      }
      localStorage.setItem('items', JSON.stringify(state.items))
    },
    fetchFromLocalStorage: (state, action) => {
      state.items = action.payload
    }
  },
});

export const { addToBasket, removeFromBasket, decrementQuantity, incrementQuantity, fetchFromLocalStorage } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + (item.price * item.quantity), 0)

export default basketSlice.reducer;
