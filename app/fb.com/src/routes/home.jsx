import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    fontSize: '1rem',
  },
});

export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button className={stylex(styles.root)} onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};
