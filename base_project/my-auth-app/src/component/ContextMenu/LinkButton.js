import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const LinkButton = ({ link, name, hidden }) => {
  const [triggerUseEffect, setTriggerUseEffect] = useState("");

  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        hidden={hidden}
        to={link}
        onClick={() => setTriggerUseEffect(link)}
      >
        <div className="menu_a">{name}</div>
      </Link>
    </>
  );
};

export default LinkButton;
