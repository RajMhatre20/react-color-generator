import React, { useState, useEffect } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#f15025").all(10));
  const [alert, setAlert] = useState(false);
  const [copyColor, setCopyColer] = useState("");
  const [timer, setTimer] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setError(false);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  const onCopy = (hexValue) => {
      setAlert(hexValue);
      setCopyColer(hexValue);
      navigator.clipboard.writeText(hexValue);
  }
  useEffect(() => {
    // prevent initial render setting timeout
    if (!alert) return;

    // set timeout
    const timeout = setTimeout(() => {
        setAlert(false);
        setTimer(null);
    }, 3000);

    // keep timeout reference and cancel previous
    setTimer((prevValue) => {
      if (!isNaN(prevValue)) clearTimeout(prevValue);
      return timeout;
    });

    return () => clearTimeout(timeout);
  }, [alert]);
  return (
    <>
      <section className="container">
        <h3>color generator</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#f15025"
            className={`${error ? "error" : null}`}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <section className="container">
          {alert && <p className="alert">#{copyColor} Copied to clipboard</p>}
        </section>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
              onCopy={() => onCopy(color.hex)}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
