// Is just there to be pretty

import React from 'react';
import './NavBar.css';
import tynico from '../assets/Tynico_100x.svg';

function NavBar() {
  return (
    <nav className='NavBar'>
        <h2 className="nav--title">Nico Shop</h2>
        <img src={tynico} alt="Ty Nico" className="nav--tynico"/>  
        <h3 className="nav--subtitle">Preuve de concept - eShop Catalogue</h3>
    </nav>
  );
}

export default NavBar;