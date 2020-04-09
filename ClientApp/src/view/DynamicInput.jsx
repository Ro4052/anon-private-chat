import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input } from "semantic-ui-react";

export default function DynamicInput({
  usernameSelector,
  defaultValue,
  labelClass,
  formClass,
  inputSubmit,
  labelIcon
}) {
  const username = useSelector(usernameSelector) ?? defaultValue;
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

  const onSubmit = e => {
    e.preventDefault();
    if (inputValue.length > 0) {
      inputSubmit(inputValue);
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
        <form ref={inputRef} className={formClass} onSubmit={onSubmit}>
          <Input
            placeholder="Username..."
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      ) : (
        <>
          <span className={labelClass} onClick={handleClick}>
            {username}
          </span>
          {labelIcon}
        </>
      )}
    </>
  );
}
