import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment, { updateLocale } from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='mr-2'>
          <button className='btn btn-outline-primary mt-2 mb-2 card-btn-1'>
            <i class='fa fa-eye' aria-hidden='true'></i> View Product
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added')
    // addItem(product, setRedirect(true))
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mt-2 mb-2 card-btn-1  '
        >
          <i class='fa fa-shopping-cart' aria-hidden='true'></i> Add to cart
        </button>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className='btn btn-outline-danger mt-2 mb-2 card-btn-1  '
        >
          <i class='fa fa-trash' aria-hidden='true'></i> Remove Product
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-danger badge-pill'>Out of Stock</span>
    );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepand'>
              <span className='input-group-text'>Adjust quantity</span>
            </div>
            <input
              type='number'
              className='form-control '
              value={count}
              onChange={handleChange(product._id)}
            ></input>
          </div>
        </div>
      )
    );
  };

  return (
    <div className='card border-primary'>
      <ShowImage item={product} url='product' />

      <div className='card-body bg-light'>
        {shouldRedirect(redirect)}

        <p className='text-dark font-weight-bold productname'>{product.name}</p>
        <p className='text-dark font-weight-bold productprice'>
          Rs {product.price}
        </p>
        <p className='productdes'>{product.description.substring(0, 40)}...</p>

        <p className='text-muted'>
          <small>Posted {moment(product.createdAt).fromNow()}</small>
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
