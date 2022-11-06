const todo = [
  "useHttp.js de 9.satır için useAuth.js yapalım",
  "useHttp için contextApi geliştirelim",
  "alert yapalım hataları bassın",
  "Login olunca PhonePin e ordan Home a yönlendir",
];

const InfoPage = () => {
  return (
    <span>
      {" "}
      {todo.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </span>
  );
};

export default InfoPage;
