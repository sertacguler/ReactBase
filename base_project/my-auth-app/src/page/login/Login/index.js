import React, { useState, useEffect, useRef } from "react";
import dolarLogo from "../../../assets/image/dolar.png";
import { SqlInjectionCheck } from "../../../constant";
import MD5 from "crypto-js/md5";
import useHttp from "../../../hooks/useHttp";

const Login = ({ setCreate, setSuccess }) => {
  const { sendRequest } = useHttp();
  const [error, setError] = useState("");
  const userRef = useRef();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = () => {
    if (!phone || !password) {
      setError("Boş olamaz");
      //return;
    }

    console.log(phone, password);
    const data = {
      phone: phone,
      password: MD5(password).toString(),
    };
    console.log(data);
    sendRequest({
      url: "http://localhost:5000/login",
      method: "POST",
      body: data,
      allowCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        if (!response.data.status) {
          setError("Giriş bilgilerini tekrar kontrol ediniz!");
        }
        setSuccess(response.data.status); // telefona mesajı gitti bu noktada yönlendirme yapılacak
      })
      .catch((error) => {
        console.log(error);
        setError("Giriş bilgilerini tekrar kontrol ediniz!");
        setSuccess(false);
      });
  };

  return (
    <div className="row" style={{ width: "275px" }}>
      <div className="col-12 d-flex justify-content-center mb-5">
        <img src={dolarLogo} width="128" height="128" />
      </div>
      <div className="col-12">
        <div className="iBox i1">
          <input
            id="fPhone1"
            type="text"
            name="phone"
            value={phone}
            className="nameInput"
            onChange={(e) =>
              setPhone(e.target.value.replace(SqlInjectionCheck, ""))
            }
            ref={userRef}
            autoComplete="off"
            required
          />
          <label htmlFor="fPhone1">Name</label>
        </div>
      </div>
      <div className="col-12">
        <div className="iBox i1">
          <input
            id="fPassword1"
            type="text"
            name="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value.replace(SqlInjectionCheck, ""))
            }
            autoComplete="off"
            required
          />
          <label htmlFor="fPassword1">Phone Number</label>
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="button" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <div className="col-12 create" style={{ marginTop: "20px" }}>
        <button className="createLink" onClick={() => setCreate(false)}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
