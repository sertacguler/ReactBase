import React from "react";
import "./index.css";
import { pageLinks } from "../../route/Links";
import LinkButton from "./LinkButton";

const ContextMenu = ({ isMenuOpened, setIsMenuOpened }) => {
  return (
    <>
      {isMenuOpened && (
        <ul className="menu">
          {pageLinks.map((link, index) => (
            <LinkButton
              link={link.to}
              name={link.name}
              key={index}
              hidden={!link.isLink}
            />
          ))}
        </ul>
      )}
      <div
        className="contextMenu"
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      />
    </>
  );
};

export default ContextMenu;
