import React, { useState, useEffect, useRef } from "react";
import dolarLogo from "../../../assets/image/dolar.png";
import { SqlInjectionCheck } from "../../../constant";
import MD5 from "crypto-js/md5";
import useHttp from "../../../hooks/useHttp";

const Create = ({ setCreate, setSuccess }) => {
  const { sendRequest } = useHttp();
  const [error, setError] = useState("");
  const userRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const submitForCreateAccount = (name, email, phone, password) => {
    if (!name || !email || !phone || !password) {
      setError("Boş olamaz");
      return;
    }

    const data = {
      name: name,
      email: email,
      phone: phone,
      password: MD5(password).toString(),
    };

    sendRequest({
      url: "http://localhost:5000/createAccount",
      method: "POST",
      body: data,
      allowCredentials: true,
    })
      .then((response) => {
        // console.log(response.data);
        if (!response.data.status) {
          setError("Bilgilerinizi tekrar kontrol ediniz!");
        }
        setSuccess(response.data.status);
      })
      .catch((error) => {
        // console.log(error);
        setError("Bilgilerinizi tekrar kontrol ediniz!");
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
            id="fName1"
            type="text"
            name="name"
            value={name}
            className="nameInput"
            onChange={(e) =>
              setName(e.target.value.replace(SqlInjectionCheck, ""))
            }
            ref={userRef}
            autoComplete="off"
            required
          />
          <label htmlFor="fName1">Name</label>
        </div>
      </div>
      <div className="col-12">
        <div className="iBox i1">
          <input
            id="fEmail1"
            type="text"
            name="email"
            value={email}
            className="emailInput"
            onChange={(e) =>
              setEmail(e.target.value.replace(SqlInjectionCheck, ""))
            }
            autoComplete="off"
            required
          />
          <label htmlFor="fEmail1">Email</label>
        </div>
      </div>
      <div className="col-12">
        <div className="iBox i1">
          <input
            id="fPhone1"
            type="text"
            name="phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(SqlInjectionCheck, ""))
            }
            autoComplete="off"
            required
          />
          <label htmlFor="fPhone1">Phone Number</label>
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
          <label htmlFor="fPassword1">Password</label>
        </div>
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="button"
          onClick={submitForCreateAccount}
        >
          Create Account
        </button>
      </div>
      <div className="col-12 create" style={{ marginTop: "20px" }}>
        <button className="createLink" onClick={() => setCreate(true)}>
          I have an account
        </button>
      </div>
    </div>
  );
};

export default Create;
