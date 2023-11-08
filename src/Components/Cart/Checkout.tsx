import React,{ useRef, useState } from 'react';

import classes from './Checkout.module.css';
type validity = {
  name: boolean | undefined,
  street: boolean | undefined,
  city: boolean | undefined,
  postalCode: boolean | undefined
}
const isEmpty = (value: string) => value.trim() === '';
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout = (props: { onConfirm: (arg0: { name: string | undefined; street: string | undefined; city: string | undefined; postalCode: string | undefined; }) => void; onCancel: React.MouseEventHandler<HTMLButtonElement> | undefined; }) => {
  const [formInputsValidity, setFormInputsValidity] = useState<validity>({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef<HTMLInputElement | null>(null);;
  const streetInputRef = useRef<HTMLInputElement | null>(null);;
  const postalCodeInputRef = useRef<HTMLInputElement | null>(null);;
  const cityInputRef = useRef<HTMLInputElement | null>(null);;

  const confirmHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let enteredName, enteredStreet, enteredPostalCode, enteredCity;
  if(nameInputRef.current && streetInputRef.current && postalCodeInputRef.current && cityInputRef.current){
     enteredName = nameInputRef.current.value;
     enteredStreet = streetInputRef.current.value;
     enteredPostalCode = postalCodeInputRef.current.value;
     enteredCity = cityInputRef.current.value;
  }
    
   let enteredNameIsValid, enteredStreetIsValid, enteredCityIsValid, enteredPostalCodeIsValid;
     if(enteredName && enteredCity && enteredStreet && enteredPostalCode){
      enteredNameIsValid = !isEmpty(enteredName);
     enteredStreetIsValid = !isEmpty(enteredStreet);
     enteredCityIsValid = !isEmpty(enteredCity);
     enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);}

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
