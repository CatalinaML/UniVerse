import React, {useState} from 'react'
import {Tab} from "semantic-ui-react"
import {RegisterForm, LoginForm} from "../../../components"
import "./Auth.scss"

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
                    <LoginForm/>
                </Tab.Pane>
            )
        },
        {
            //REGISTER
            menuItem: "Registrarse",
            render: () => (
                <Tab.Pane>
                    <RegisterForm openLogin={openLogin}/>
                </Tab.Pane>
            )
        }
    ]
  return (
    <div className='auth'>
      <Tab 
      panes={panes} 
      menu={{ pointing: true }}
      className="auth__forms"
      activeIndex={activeIndex} 
      onTabChange={(_, data) => setActiveIndex(data.activeIndex)}/>
    </div>
  )
}
