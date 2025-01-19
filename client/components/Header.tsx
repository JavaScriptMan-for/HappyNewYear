import "../css/App.css";
import React from "react";
import { FC, ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


interface HeaderProps {
  children: ReactNode;
}
React.version
const Header: FC<HeaderProps> = ({ children }) => {
  const location = useLocation();


  const getLinkStyle = (path: string) => {
    return location.pathname === path ? { borderBottom: '2px solid rgb(53, 185, 255)' } : {};
  };
  useEffect(() => {
    switch (location.pathname) {
       case '/': document.body.style.cssText = `background-image: url(${import.meta.env.BASE_URL}/img/happy.png)`; break;
      case '/send-gift': document.body.style.cssText = `background-image: url(${import.meta.env.BASE_URL}/img/background.jpg)`; break;
      case '/send-to-SantaClaus': document.body.style.cssText = `background-image: url(${import.meta.env.BASE_URL}/img/back.jpg)`; break;
      default: document.body.style.cssText = `background-image: url(${import.meta.env.BASE_URL}/img/happy.png)`;
     }
 }, [location]);

  return (
    <>
      <div id="header">
        <nav>
          <Link style={getLinkStyle("/")} to="/">
            Время до Нового года
          </Link>
          <Link style={getLinkStyle("/send-gift")} to="/send-gift">
            Поздравление
          </Link>
          <Link style={getLinkStyle("/send-to-SantaClaus")} to="/send-to-SantaClaus">
            Письмо Деду Морозу
          </Link>
        </nav>
        <h1>{children}</h1>
      </div>
    </>
  );
};

export default Header;