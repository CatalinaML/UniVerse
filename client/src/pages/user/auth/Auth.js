import React, { useState } from "react";
import { Tab, Image } from "semantic-ui-react";
import { RegisterForm, LoginForm } from "../../../components";
import { image } from "../../../assets";
import "./Auth.scss";

export function Auth() {
  //estados indice activo
  const [activeIndex, setActiveIndex] = useState(0);
  const openLogin = () => setActiveIndex(0);

  const panes = [
    {
      //LOGIN
      menuItem: "Ingresar",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      ),
    },
    {
      //REGISTER
      menuItem: "Registrarse",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container-image">
          <Image size="medium" src={image.UniverseLogo} as="a" href="/" />
        </div>

        <Tab
          panes={panes}
          menu={{ attached: false, tabular: false }}
          className="auth__forms"
          activeIndex={activeIndex}
          onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
        />
      </div>
    </div>
  );
}
