import React, { useState } from "react";
// import "../assets/"
import "../../src/App.css";

const DisplayCounterUseState = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <h1>Count is:{count}</h1> */}
      <h1 className="counter-card">Count is: {count}</h1>

      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} disabled={count === 0}>
        Decrement
      </button>
      <button onClick={() => setCount(count + 2)}> Increment by 2</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

export default DisplayCounterUseState;
