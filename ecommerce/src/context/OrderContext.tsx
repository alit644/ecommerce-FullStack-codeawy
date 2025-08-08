import { createContext, useContext, useState } from "react";
import type { IOrder } from "../interfaces";

interface IOrderContext {
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>;
}
const OrderContext = createContext<IOrderContext | null>(null);

const OrderProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [order, setOrder] = useState<IOrder>({} as IOrder);
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderContext must be used within an OrderProvider");
    }
    return context;
};
