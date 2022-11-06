import React, { useState } from "react";
import "../../assets/error.css";
import "./index.css";
import Login from "./Login";
import Create from "./Create";
import PhonePin from "./PhonePinController/";

const LoginPage = () => {
  const [haveAnAccount, setHaveAnAccount] = useState(true);
  const [success, setSuccess] = useState(false); // are create or login process success

  return (
    <div className="login">
      {!success ? (
        haveAnAccount ? (
          <Login setCreate={setHaveAnAccount} setSuccess={setSuccess} />
        ) : (
          <Create setCreate={setHaveAnAccount} setSuccess={setSuccess} />
        )
      ) : (
        <PhonePin setSuccess={setSuccess} />
      )}
    </div>
  );
};

export default LoginPage;
