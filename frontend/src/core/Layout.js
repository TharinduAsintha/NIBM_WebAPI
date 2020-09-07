import React from 'react';
import Menu from './Menu';
// import "../styles.css";

const Layout = ({
  titel = 'Titel',
  description = 'Description',
  className,
  children
}) => (
  <div>
    <Menu />
    <div className='jumbotron jumbotronstyle'>
      <h1> {titel} </h1>
      <h4 className='lead'> {description} </h4>
    </div>
    <div className={className}> {children} </div>
  </div>
);

export default Layout;
