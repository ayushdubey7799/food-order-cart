import { cartCtxType, mealType } from '../../store/cart-context';
import classes from './CartItem.module.css';
import React, { MouseEventHandler } from 'react';

type cartItemProps = {
  onRemove: MouseEventHandler<HTMLButtonElement> ;
  onAdd: MouseEventHandler<HTMLButtonElement>;
  name: string,
  price: number,
  amount: number,
}

const CartItem = (props: cartItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
