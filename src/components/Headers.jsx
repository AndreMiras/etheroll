import React from 'react';

function Headers() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/">
          <i className="fas fa-dice-d20" />
          &nbsp;Etheroll
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <i className="fas fa-home" />
                &nbsp;Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/AndreMiras/etheroll">
                <i className="fab fa-github-alt" />
                &nbsp;About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Headers;
