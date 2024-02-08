import React from 'react';

const Word = ({ value, current, onRemove }) => {
  return (
    <span className={current ? 'current-word' : 'word'} onClick={onRemove}>
      {value}{' '}
    </span>
  );
};

export default Word;
