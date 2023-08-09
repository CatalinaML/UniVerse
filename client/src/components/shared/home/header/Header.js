import { Button, Dropdown, Icon, Image } from "semantic-ui-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./Header.scss";

import { useAuth } from "../../../../hooks";
import { image } from "../../../../assets";

export function Header() {
  const { user, logout } = useAuth();

  const location = useLocation();

  const onLogout = () => {
    logout();
  };

  return (
    <div className="header-page">
      <div className="header-page__left">
        <div className="header-page__left-menu">
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

      <div className="header-page__left-logo">
        <Image src={image.logo} as="a" href="/" />
      </div>

      <div className="header-page__right">
        <div className="header-page__right-buttons">
          {!user ? (
            <Button basic color="black" as="a" target="_blank" href="/blogger">
              Login
            </Button>
          ) : (
            <Button basic color="orange" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>

        <div className="responsive-menu">
          <Dropdown icon="bars" floating direction="left">
            <Dropdown.Menu>
              {!user ? (
                <Dropdown.Item>
                  <Link
                    to="/"
                    className={`link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Home
                  </Link>
                </Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item>
                    <Link
                      to="/"
                      className={`link ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to="/blogger/profile"
                      className={`link ${
                        location.pathname === "/blogger/profile" ? "active" : ""
                      }`}
                    >
                      Perfil
                    </Link>
                  </Dropdown.Item>
                </>
              )}
              {!user ? (
                <Dropdown.Item>
                  <a target="_blank" href="/blogger">
                    Login
                  </a>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item>
                  <a onClick={onLogout} href="/">
                    Logout
                  </a>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
