import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICartProduct, IUserInfo } from "../../interfaces";
import { toaster } from "../../components/ui/toaster";
import cookieManager from "../../utils/cookieManager";

export interface wishlistSliceState {
  wishlistData: ICartProduct[];
  isInWishlist : boolean;
}

const initialState: wishlistSliceState = {
  wishlistData: [],
  isInWishlist : false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, actions: PayloadAction<ICartProduct>) => {
     const product = state.wishlistData.find(
      (item) => item.id === actions.payload.id
    );
    if (product) {
      state.wishlistData = state.wishlistData.filter(
        (item) => item.id !== actions.payload.id
      );
       toaster.success({
        title: "Product removed from wishlist",
        description: "Product removed from wishlist successfully",
        duration: 2000,
        type: "success",
      });
    } else {
      state.wishlistData.push({
        ...actions.payload,
        userId: cookieManager.get<IUserInfo>("user")?.id,
      });
      toaster.success({
        title: "Product added to wishlist",
        description: "Product added to wishlist successfully",
        duration: 2000,
        type: "success",
      });
    }
    },
    removeItemWishlist: (state, actions: PayloadAction<number>) => {
      state.wishlistData = state.wishlistData.filter(
        (item) => item.id !== actions.payload
      );
      toaster.success({
        title: "Product removed from wishlist",
        description: "Product removed from wishlist successfully",
        duration: 2000,
        type: "success",
      });
    },

  },
});

export const { addToWishlist, removeItemWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
