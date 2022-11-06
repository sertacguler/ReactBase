import React, { useState } from "react";
import LoginInput from "../../../component/InputForPin";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";

const PhonePin = ({ setSuccess }) => {
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");
  const [number4, setNumber4] = useState("");
  const [number5, setNumber5] = useState("");
  const [number6, setNumber6] = useState("");

  const submit = () => {
    if (!number1 || !number2 || !number3 || !number4 || !number5 || !number6) {
      setError("Boş olamaz");
      return;
    }

    const data = (number1, number2, number3, number4, number5, number6);

    sendRequest({
      url: "http://localhost:5000/phonePinCheck",
      method: "POST",
      body: data,
      allowCredentials: true,
    })
      .then((response) => {
        // console.log(response.data);
        if (!response.data.status) {
          setError("Giriş bilgilerini tekrar kontrol ediniz!");
        }
        setSuccess(response.data.status); // telefona mesajı gitti bu noktada yönlendirme yapılacak
      })
      .catch((error) => {
        // console.log(error);
        setError("Giriş bilgilerini tekrar kontrol ediniz!");
        setSuccess(false);
      });
  };

  return (
    <div className="phoneNumberPage">
      <div className="phone">
        <div className="phoneCodeHeader">
          <span>Phone Code</span>
        </div>
        <div className="phoneCodeMessage">
          <span>
            Login sayfasında girmiş olduğunuz numaraya bir kısa mesaj gönderdik.
            Mesajdaki 6 haneli pin kodunu alttaki kutucuklara giriniz.
          </span>
        </div>
        <div className="phoneNumberInputDiv">
          <LoginInput value={number1} change={setNumber1} />
          <LoginInput value={number2} change={setNumber2} />
          <LoginInput value={number3} change={setNumber3} />
          <LoginInput value={number4} change={setNumber4} />
          <LoginInput value={number5} change={setNumber5} />
          <LoginInput value={number6} change={setNumber6} />
        </div>
        <div className="phoneNumberButton">
          <button className="phoneNumberAcceptButton" onClick={submit}>
            Onaylıyorum
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhonePin;
