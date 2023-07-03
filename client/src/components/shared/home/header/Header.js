import React,{useState} from 'react'
import {Container, Button, Image, Menu} from "semantic-ui-react"
import "./Header.scss"
import { useAuth } from '../../../../hooks' 
import { useNavigate, NavLink } from 'react-router-dom';
import { image } from '../../../../assets';

export function Header() {
  const [activeItem, setActiveItem] = useState("home");
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleItemClick = (name) => {
    setActiveItem(name);
  }

  const onLogout = () => {
    logout();
    navigate("/")
  }

  return (

    <div className='header'>

      <div className='header__left'>
        <div className='header__left-menu'>
            {!user ? (
              <NavLink to="/" className="link" activeClassName="active"> Home </NavLink>
            ) : (
              <>
                <NavLink to="/" className="link" activeClassName="active"> Home </NavLink>
                <NavLink to="/blogger/profile" className="link" activeClassName="active"> Perfil </NavLink>
              </>
            )}
        </div>
      </div>

      <div className='header__left-logo'>
          <Image size="medium"src={image.logo} as="a" href='/'/>
        </div>


      <div className='header__right'>
        <div className='header__right-buttons'>
            {!user ? (
                <Button
                    basic color='black'
                    as="a"
                    href="/blogger">
                    Login
                </Button>
              ) : (
                <Button basic color='orange' onClick={onLogout}>
                  Logout
                </Button>
              )}
        </div>
      </div>
    </div>

  )
}
