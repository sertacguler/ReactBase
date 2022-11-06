import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import * as AllPagesLinks from "../src/route/AllPagesLinks";
import { pageLinks } from "./route/Links";
import ContextMenu from "./component/ContextMenu";

const App = () => {
  const isLoggedIn = false; // TODO: useAuth kullanarak kullanıcı " is logged in? " bakacak

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const RouteList = (
    <>
      <Route
        path={AllPagesLinks.PATH_INDEX}
        element={
          isLoggedIn ? (
            <Navigate to={AllPagesLinks.PATH_HOME} />
          ) : (
            <Navigate to={AllPagesLinks.PATH_LOGIN} />
          )
        }
      />
      <Route
        path={AllPagesLinks.PATH_LOGIN}
        element={
          isLoggedIn ? (
            <Navigate to={AllPagesLinks.PATH_HOME} />
          ) : (
            AllPagesLinks.TAG_LOGIN
          )
        }
      />
      {pageLinks?.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={isLoggedIn ? route.element : AllPagesLinks.TAG_LOGIN}
        />
      ))}
    </>
  );

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && (
          <div className="floating">
            <ContextMenu
              isMenuOpened={isMenuOpened}
              setIsMenuOpened={setIsMenuOpened}
            />
          </div>
        )}
        <div className="fullPageContent">
          <Routes>{RouteList}</Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
