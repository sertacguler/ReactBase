import React from "react";

const LoginInput = ({ value, change }) => {
  return (
    <input
      id="number1"
      type="text"
      value={value}
      onChange={(e) =>
        change(
          e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
        )
      }
      maxLength="1"
      className="phoneNumberInput"
    />
  );
};

export default LoginInput;
