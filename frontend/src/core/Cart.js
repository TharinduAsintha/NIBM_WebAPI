import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div className='cartitemsstyle'>
        <h2 className="text-muted">Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
          
        ))}
        <hr />
      </div>
    );
  };

  const noItemsMessage = () => (
    <h3 className="text-muted">
      Your cart is empty. <br /> <Link to='/shop'>Continue shopping</Link>
    </h3>
  );

  return (
    <Layout
      titel='Proteins Plus+'
      description='Shopping Cart'
      className='container'
    >
      <div className='row justify-content-md-center'>
        <div className='col-5'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className='col-6'>
          <h2 className='mb-4 text-muted'>Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
