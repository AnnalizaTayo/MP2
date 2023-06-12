import React, { useState } from 'react';

const OrderForm = ({ onOrderSubmit }) => {
  const [orderName, setOrderName] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onOrderSubmit({ name: orderName, quantity: orderQuantity });
    setOrderName('');
    setOrderQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order Name:
        <input
          type="text"
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Order Quantity:
        <input
          type="number"
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;
