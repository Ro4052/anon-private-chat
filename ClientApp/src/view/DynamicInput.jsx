import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input } from "semantic-ui-react";

export default function DynamicInput({
  usernameSelector,
  labelClass,
  formClass
}) {
  const username = useSelector(usernameSelector) || "Unnamed user";
  const inputRef = useRef();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(username);

  const handleClick = () => {
    setInputValue(username);
    setShowInput(true);
  };

  const handleChange = e => {
    if (e.target.value.length <= 20) {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.length > 0) {
      console.log(inputValue);
      setShowInput(false);
    }
  };

  useEffect(() => {
    const clickHandler = e => {
      if (!e.path.includes(inputRef.current)) {
        setShowInput(false);
      }
    };

    if (showInput) {
      document.addEventListener("click", clickHandler);
    }

    return () => document.removeEventListener("click", clickHandler);
  }, [inputRef, showInput]);

  return (
    <>
      {showInput ? (
        <form ref={inputRef} className={formClass} onSubmit={handleSubmit}>
          <Input
            placeholder="Username..."
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      ) : (
        <span className={labelClass} onClick={handleClick}>
          {username}
        </span>
      )}
    </>
  );
}
