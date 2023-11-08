import React,{createContext} from 'react';
export type mealType = {
  id: string | number,
  name: string,
  amount?: string | number,
  description: string,
  price:  number
  
}

export type cartCtxType = {
  items: any[];
  totalAmount: number;
  addItem: (item: Partial<mealType>) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
}

const CartContext = createContext<cartCtxType>({
  items: [],
  totalAmount: 0,
  addItem: (item: any) => {},
  removeItem: (id : any) => {},
  clearCart: () => {}
});

export default CartContext;