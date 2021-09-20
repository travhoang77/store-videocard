import React, { useState } from "react";
import "../css/Counter.css";

function Counter(props) {
  const max = props.limit ? props.limit : 1;
  const [count, setCount] = useState(props.value);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      props.onUpdate(count - 1);
    }
  };

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
      props.onUpdate(count + 1);
    }
  };

  return (
    <div className="counter">
      <button
        className="btn btn-outline-primary m-1"
        style={{ minWidth: "2.5rem" }}
        onClick={decrement}
      >
        -
      </button>
      <span style={{ fontSize: "1.2rem" }}>{count}</span>
      <button
        className="btn btn-outline-primary m-1"
        style={{ minWidth: "2.5rem" }}
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
