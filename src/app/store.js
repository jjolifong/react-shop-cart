import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// cart 상태가 바뀔 때마다 LocalStorage에 저장 (로그아웃/새로고침해도 유지)
store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
});