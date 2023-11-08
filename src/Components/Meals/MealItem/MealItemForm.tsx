import React,{ useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props: { onAddToCart: (arg0: number) => void; }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement | null>(null);;

  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let enteredAmount
    if(amountInputRef.current){
       enteredAmount = amountInputRef.current.value;
    }
    let enteredAmountNumber;
    if(enteredAmount){
       enteredAmountNumber= +enteredAmount;
       if (
        enteredAmount.trim().length === 0 ||
        enteredAmountNumber < 1 ||
        enteredAmountNumber > 5
      ) {
        setAmountIsValid(false);
        return;
      }
  
    }

   
    if(enteredAmountNumber)props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
