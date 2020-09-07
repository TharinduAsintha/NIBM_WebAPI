import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Layout from '../core/Layout';
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const SignUpForm = () => (
    <form>
      <div className='from-group'>
        <label htmlFor='text' className='sr-only'>
          name
        </label>
        <input
          onChange={handleChange("name")}
          type='text'
          className='form-control'
          value={name}
          placeholder='Name'
        />
      </div>
      <div className='from-group'>
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
      <div className='from-group'>
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
        Sign-Up
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

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? "" : "none" }}
    >
      New account is create. Please <Link to='/signin'> SignIn </Link>
    </div>
  );

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
                <p className='login-card-description'>Join Us</p>
                <form action='#!'>
                  {showSuccess()}
                  {showError()}
                  {SignUpForm()}
                </form>

                <p className='login-card-footer-text'>
                  Already a member?{" "}
                  <a href='/Signin' className='text-reset'>
                    Login
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

export default Signup;
