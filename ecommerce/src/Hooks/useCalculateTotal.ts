import { useMemo } from "react";
import type { ICartProduct } from "../interfaces";

export const useCalculateTotal = (cartItems: ICartProduct[]) => {
  return useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);
};
