import { Button, Image } from "semantic-ui-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./Header.scss";

import { useAuth } from "../../../../hooks";
import { image } from "../../../../assets";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__left-menu">
          {!user ? (
            <Link
              to="/"
              className={`link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          ) : (
            <>
              <Link
                to="/"
                className={`link ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                to="/blogger/profile"
                className={`link ${
                  location.pathname === "/blogger/profile" ? "active" : ""
                }`}
              >
                Perfil
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="header__left-logo">
        <Image size="medium" src={image.logo} as="a" href="/" />
      </div>

      <div className="header__right">
        <div className="header__right-buttons">
          {!user ? (
            <Button basic color="black" as="a" href="/blogger">
              Login
            </Button>
          ) : (
            <Button basic color="orange" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
