import React from "react";

export default function Navbar() {
  return (
    <nav>
      <h1 className='logo-text'>FlockFysh</h1>
      <div className='links-container'>
        <ul>
          <li>
            <a className='navbar-link' href='/'>
              About Us
            </a>
          </li>
          <li>
            <a className='navbar-link' href='/'>
              Contact
            </a>
          </li>
        </ul>
        <div className='get-started-btn'>Get Started</div>
      </div>
    </nav>
  );
}
