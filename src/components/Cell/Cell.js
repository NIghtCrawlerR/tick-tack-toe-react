import React from 'react';

import './Cell.scss';

const Cell = ({ content, onClick }) => (
  <div
    className={`Cell ${!!content ? 'Cell__filled' : ''}`}
    onClick={onClick}
  >
    {content}
  </div>
)
 
export default Cell;
