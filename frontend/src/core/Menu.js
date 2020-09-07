import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#0275d8' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className='nav navbar-dark bg-dark menustyle'>
      <li className='nav-item'>
        <Link className='nav-link' style={isActive(history, '/')} to='/'>
          <img src='../img/logoNew.png' alt='logo' className='menulogo' />
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' style={isActive(history, '/')} to='/'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          className='nav-link'
          style={isActive(history, '/shop')}
          to='/shop'
        >
          Shop
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/user/dashboard')}
            to='/user/dashboard'
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className='nav-item '>
          <Link
            className='nav-link'
            style={isActive(history, '/admin/dashboard')}
            to='/admin/dashboard'
          >
            Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className='nav-item ml-auto mt-2 mt-lg-0'>
            <Link
              className='nav-link'
              style={isActive(history, '/Signin')}
              to='/Signin'
            >
              <i class='fa fa-sign-in' aria-hidden='true'></i> Signin
            </Link>
          </li>
          {/* <li className='nav-item '>
            <Link
              className='nav-link'
              style={isActive(history, '/Signup')}
              to='/Signup'
            >
              Signup
            </Link>
          </li> */}
        </Fragment>
      )}
      <li className='nav-item'>
        <Link
          className='nav-link'
          style={isActive(history, '/cart')}
          to='/cart'
        >
          <i class='fa fa-shopping-cart' aria-hidden='true'></i>{' '}
          <sup>
            <small className='cart-badge'>{itemTotal()}</small>
          </sup>
        </Link>
      </li>

      {isAuthenticated() && (
        <li className='nav-item dropdown ml-auto mt-2 mt-lg-0'>
          <span
            className='nav-link'
            style={{ cursor: 'pointer', color: '#ffffff' }}
            onClick={() =>
              signout(() => {
                history.push('/');
              })
            }
          >
            <i class='fa fa-sign-out' aria-hidden='true'></i> Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
