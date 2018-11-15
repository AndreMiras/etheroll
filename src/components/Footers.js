import React, { Component } from 'react';
import './css/Footers.css';

class Footers extends Component {
  render() {
    return (
      <footer className="Footers d-none d-md-block">
        <div className="container">
          <span className="text-muted">Copyright (c) 2018 Andre Miras</span>
        </div>
      </footer>
    );
  }
}

export default Footers;
