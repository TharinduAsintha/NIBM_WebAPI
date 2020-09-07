import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      titel='Proteins Plus+'
      description='Manage Products'
      className='container'
    >
      <div className='row'>
        <div className='col-12'>
          <h4 className='text-left'>Total {products.length} products</h4>
          <hr />
          <ul className='list-group'>
            {products.map((p, i) => (
              <li
                key={i}
                className='list-group-item align-items-center'
              >
                <strong>{p.name}</strong>
                <div class='d-flex flex-row-reverse align-items-center'>
                <span
                  onClick={() => destroy(p._id)}
                  className='badge badge-danger badge-pill '
                >
                  Delete
                </span>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className='badge badge-warning badge-pill updatebtnstyle'>Update</span>
                </Link>
                
                </div>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
