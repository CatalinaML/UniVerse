import React from "react";
import "./UserLayout.scss";

import { Footer, Header } from "../../components";

export function UserLayout(props) {
  const { children } = props;
  return (
    <div className="user-layout">
      <div className="user-layout__header">
        <Header />
      </div>
      {children}
      <div className="user-layout__footer">
        <Footer />
      </div>
    </div>
  );
}
