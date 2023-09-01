import { createSlice } from "@reduxjs/toolkit";

const cartSection = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    vat: 13,
    shipping: 100,
    notification: false,
  },
  reducers: {
    addToCart(state, action) {
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, action.payload])
      );
      return { ...state, cart: [...state.cart, action.payload] };
    },
    removeCartItem(state, action) {
      let filteredProduct = state.cart.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(filteredProduct));
      return { ...state, cart: [...filteredProduct] };
    },
    reassignToCart(state, action) {
      localStorage.setItem("cart", JSON.stringify(action.payload));

      return { ...state, cart: action.payload };
    },
    addColor(state, action) {
      const { ind, newColor } = action.payload;
      state.cart[ind].selectedColors = newColor;
      localStorage.setItem('cart', JSON.stringify(state.cart))
      return state;
    },
    increaseQuantity(state, action) {
      const { ind, quantity } = action.payload;
      state.cart[ind].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;
    },
    decreaseQuantity(state, action) {
      const { ind, quantity } = action.payload;
      state.cart[ind].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;
    },
    addSizes(state, action) {
      const { ind, newSizes } = action.payload;
      state.cart[ind].selectedSizes = newSizes;
      localStorage.setItem('cart', JSON.stringify(state.cart))
      return state;
    },
    setNotification(state) {
      state.notification = true;
      return state;
    },
    removeNotification(state) {
      state.notification = false;
      return state;
    },
  },
});
export default cartSection.reducer;
export const {
  addToCart,
  removeCartItem,
  reassignToCart,
  addColor,
  increaseQuantity,
  decreaseQuantity,
  addSizes,
  setNotification,
  removeNotification,
} = cartSection.actions;
