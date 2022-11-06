const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const app = express();

dotenv.config();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

var corsOptions = {
  origin: "*", //['http://localhost:3000','http://localhost:3001'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", cors(corsOptions), (req, res) => {
  console.log(req.body);
  const { phone, password } = req.body;
  // db den kontrol edelim phone ve password
  // kullanıcının teline pin gönderelim
  // bu oluşan pin'i session tablosuna atalım

  // db den emaili çekelim ondan token oluşturalım şimdilik phone oluşturuluyor token
  const payLoad = {
    phone,
  };

  if (phone !== "admin") {
    res.status(401).send("hmm!");
    return;
  }

  const token = jwt.sign(
    payLoad,
    process.env.JWT_SECRET_KEY || "turkeysecretkey",
    { expiresIn: 120 }
  );

  res.json({
    status: true,
    token,
  });

  res.send();
});

app.post("/createAccount", cors(corsOptions), (req, res) => {
  console.log(req.body);
  const { name, email, phone, password } = req.body;

  // db ye yeni kayıt atalım
  // kullanıcının teline pin gönderelim
  // bu oluşan pin'i session tablosuna atalım

  const payLoad = {
    email,
  };

  if (email !== "admin") {
    res.status(401).send("hmm!");
    return;
  }

  const token = jwt.sign(
    payLoad,
    process.env.JWT_SECRET_KEY || "turkeysecretkey",
    { expiresIn: 120 }
  );

  res.json({
    status: true,
    token,
  });

  res.send();
});

app.post("/phonePinCheck", cors(corsOptions), (req, res) => {
  console.log(req.body);
  const { pin } = req.body;

  // session tablosundaki pin ile check edelim

  res.json({
    status: true,
  });

  res.send();
});
