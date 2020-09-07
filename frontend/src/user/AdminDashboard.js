import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>
          <i class='fa fa-tachometer' aria-hidden='true'></i> Admin Access
        </h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link text-dark' to='/create/category'>
              <i class='fa fa-sitemap' aria-hidden='true'></i> Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link text-dark' to='/create/product'>
              <i class='fa fa-plus-square' aria-hidden='true'></i> Create
              Product
            </Link>
          </li>

          <li className='list-group-item'>
            <Link className='nav-link text-dark' to='/admin/orders'>
              <i class='fa fa-cart-arrow-down' aria-hidden='true'></i> View
              Orders
            </Link>
          </li>

          <li className='list-group-item'>
            <Link className='nav-link text-dark' to='/admin/products'>
              <i class='fa fa-list-ul' aria-hidden='true'></i> Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>
          <i class='fa fa-users' aria-hidden='true'></i> User Information
        </h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            <i class='fa fa-user-o' aria-hidden='true'></i> {name}
          </li>
          <li className='list-group-item'>
            <i class='fa fa-envelope-o' aria-hidden='true'></i> {email}
          </li>
          <li className='list-group-item'>
            <i class='fa fa-user-secret' aria-hidden='true'></i>{' '}
            {role == 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      titel='Proteins Plus+'
      description={`Dashboard`}
      className='container'
    >
      <div className='row'>
        <div className='col-3'>{adminLinks()}</div>
        <div className='col-9'>{adminInfo()}</div>
      </div>
    </Layout>
  );
};
export default AdminDashboard;
