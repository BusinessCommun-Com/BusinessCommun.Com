import React from 'react'
import './Home.css'

export default function Home() {
  return (
    <nav class="navbar navbar-expand-lg navbar-style">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active navText" aria-current="page" href="#">
              Home
            </a>
            <a class="nav-link navText" href="#">
              Features
            </a>
            <a class="nav-link navText" href="#">
              Pricing
            </a>
            <a class="nav-link disabled navText" aria-disabled="">
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
