import React from 'react';

import './Cell.scss';

const Cell = ({ content, onClick }) => (
  <div
    className="Cell"
    onClick={onClick}
  >
    {content}
  </div>
)
 
export default Cell;
