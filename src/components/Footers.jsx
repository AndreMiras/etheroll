import React from 'react';
import './css/Footers.css';
import { version } from '../../package.json';

function Footers() {
  return (
    <footer className="Footers d-none d-md-block">
      <div className="container">
        <span className="text-muted">
          Copyright (c) 2018 Andre Miras - Etheroll v
          {version}
        </span>
      </div>
    </footer>
  );
}

export default Footers;
