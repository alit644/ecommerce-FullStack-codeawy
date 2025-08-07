import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICartProduct, IUserInfo } from "../../interfaces";
import { toaster } from "../../components/ui/toaster";
import cookieManager from "../../utils/cookieManager";
export interface cartSlice {
  cartData: ICartProduct[];
}

const initialState: cartSlice = {
  cartData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<ICartProduct>) => {
      // check if the product is already in the cart
      const product = state.cartData.find(
        (item) => item.id === actions.payload.id
      );
      if (product) {
        product.quantity += 1;
        toaster.success({
          title: "Product added to cart",
          description: "Product quantity updated successfully",
          duration: 2000,
          type: "success",
        });
        
      } else {
        state.cartData.push({ ...actions.payload, quantity: 1 , userId: cookieManager.get<IUserInfo>("user")?.id});
        toaster.success({
          title: "Product added to cart",
          description: "Product added to cart successfully",
          duration: 2000,
          type: "success",
        });
      }
    },

    addQuantity: (state, actions: PayloadAction<number>) => {
      const product = state.cartData.find(
        (item) => item.id === actions.payload
      );
      if (product && product.quantity < 20) {
        product.quantity += 1;
      }
    },
    removeQuantity: (state, actions: PayloadAction<number>) => {
      const product = state.cartData.find(
        (item) => item.id === actions.payload
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        
      }
    },
    removeItem: (state, actions: PayloadAction<number>) => {
      //! cartData البحث عن العنصر داخل
      const product = state.cartData.find(
        (item: { id: number }) => item.id === actions.payload
      );
      //! (نقوم بعمل فلتر على منتجات المصفوفة) إذا كان العنصر موجودًا في المخزون

      if (product) {
        state.cartData = state.cartData.filter(
          (item: { id: number }) => item.id !== actions.payload
        );
        toaster.success({
          title: "Product removed from cart",
          description: "Product removed from cart successfully",
          duration: 2000,
          type: "success",
        });
      }
    },
  },
});

export const { addToCart, addQuantity, removeQuantity, removeItem } =
  cartSlice.actions;
export const cartSelector = (state: { cart: cartSlice }) => state.cart;
export default cartSlice.reducer;
