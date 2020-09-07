import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from "../auth";
import "../login.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "helaka@gmail.com",
    password: "Pass@123",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const SignUpForm = () => (
    <form>
      <div className='form-group'>
        <label htmlFor='email' className='sr-only'>
          Email
        </label>
        <input
          onChange={handleChange("email")}
          type='email'
          className='form-control'
          value={email}
          placeholder='Email address'
        />
      </div>
      <div className='form-group mb-4'>
        <label htmlFor='password' className='sr-only'>
          Password
        </label>
        <input
          onChange={handleChange("password")}
          type='password'
          className='form-control'
          value={password}
          placeholder='***********'
        />
      </div>

      <button onClick={clickSubmit} className='btn btn-block login-btn mb-4'>
        Login
      </button>
      <a href='/' className='text-reset alink'>
                    SignIn as Guest
      </a>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h6>Loading...</h6>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role == 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  return (
    <main className='d-flex align-items-center min-vh-100 py-3 py-md-0'>
      <div className='container'>
        <div className='card login-card'>
          <div className='row no-gutters'>
            <div className='col-md-5'>
              <img
                src='../img/login.jpg'
                alt='login'
                className='login-card-img'
              />
            </div>
            <div className='col-md-7'>
              <div className='card-body'>
                <div className='brand-wrapper'>
                  <img src='../img/logoNew.png' alt='logo' className='logo' />
                </div>
                <p className='login-card-description'>Sign into your account</p>
                <form action='#!'>
                  {showLoading()}
                  {showError()}
                  {SignUpForm()}
                  {redirectUser()}
                </form>
                <a href='#!' className='forgot-password-link'>
                  Forgot password?
                </a>
                <p className='login-card-footer-text'>
                  Don't have an account?{" "}
                  <a href='/Signup' className='text-reset'>
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signin;
